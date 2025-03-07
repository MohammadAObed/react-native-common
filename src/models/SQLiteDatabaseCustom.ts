import * as FileSystem from "expo-file-system";
import { deleteDatabaseAsync, SQLiteDatabase, type SQLiteVariadicBindParams } from "expo-sqlite";
import { DATABASE_FULL_NAME, DB_ERROR_MESSAGE, ErrorCode, NEW_ID_FACTOR, NewIdsTracker } from "../constants";
import { getNewestId, GetPropertiesMetaData } from "../helpers";
import { Common, ErrorCustom } from "../models";
import type {
  GetSqlFile,
  HandleDbVersion,
  NestedIds,
  SqliteForeignKey,
  SqliteMaster,
  SqliteTableColumnInfo,
  Transaction,
} from "../types/models";
import { getEntries, getKeys } from "../utils";

export class SQLiteDatabaseCustom<ClassNames extends string = string> {
  private _db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this._db = db;
  }
  static async migrateDbIfNeeded(db: SQLiteDatabase, DatabaseVersion: number, handleDbVersion: HandleDbVersion) {
    const customDb = new SQLiteDatabaseCustom(db);
    let { user_version: currentDbVersion } = await customDb._getDbVersion();
    await handleDbVersion(customDb, currentDbVersion);
    await customDb._setDbVersion(DatabaseVersion);
    await customDb._setIdTracker();
  }
  async handleDbVersionCommon(currentDbVersion: number, getSqlFile: GetSqlFile) {
    const [sqlFile] = await getSqlFile(currentDbVersion);
    if (!sqlFile) throw new ErrorCustom(DB_ERROR_MESSAGE, ErrorCode.LOAD_DB_ASSET);
    if (!sqlFile.localUri) throw new ErrorCustom(DB_ERROR_MESSAGE, ErrorCode.LOAD_DB_ASSET_LOCAL_URI);
    const sqlFileContent = await FileSystem.readAsStringAsync(sqlFile.localUri);
    await this.execAsync(`PRAGMA journal_mode = 'wal';`);
    // await this.execAsync("PRAGMA foreign_keys = ON");
    await this.execAsync(sqlFileContent);
  }
  getFirstAsync = async <T>(source: string, ...params: SQLiteVariadicBindParams): Promise<Awaited<T> | null> => {
    const result = await this._handleGetAsync(async () => await this._db.getFirstAsync<T>(source, ...params), source);
    return result;
  };
  getFirstSync = <T>(source: string, ...params: SQLiteVariadicBindParams) => {
    const result = this._handleGetSync(() => this._db.getFirstSync<T>(source, ...params), source);
    return result;
  };
  getAllAsync = async <T>(source: string, ...params: SQLiteVariadicBindParams): Promise<T[]> => {
    const result = await this._handleGetAsync(async () => await this._db.getAllAsync<T>(source, ...params), source);
    return result.vOrderByDescending((x: any) => x.Id);
  };
  getAllSync = <T>(source: string, ...params: SQLiteVariadicBindParams): T[] => {
    const result = this._handleGetSync(() => this._db.getAllSync<T>(source, ...params), source);
    return result.vOrderByDescending((x: any) => x.Id);
  };
  execAsync = async (source: string) => await this._db.execAsync(source);
  execSync = (source: string) => this._db.execSync(source);
  isInTransactionAsync = async () => await this._db.isInTransactionAsync();
  isInTransactionSync = () => this._db.isInTransactionSync();
  runAsync = async (source: string, ...params: SQLiteVariadicBindParams) => await this._db.runAsync(source, params);
  runSync = (source: string, ...params: SQLiteVariadicBindParams) => this._db.runSync(source, params);
  withExclusiveTransactionAsync = async (task: (txn: TransactionCustom<ClassNames>) => Promise<void>) =>
    await this._db.withExclusiveTransactionAsync(async (tran) => {
      const customTran = new TransactionCustom<ClassNames>(tran);
      await task(customTran);
    });
  async validateAsync() {
    if (!(await this.isInTransactionAsync())) throw new ErrorCustom("Failed to process resources", ErrorCode.NO_DB_TRANSACTION_FOUND);
  }
  validateSync() {
    if (!this.isInTransactionSync()) throw new ErrorCustom("Failed to process resources", ErrorCode.NO_DB_TRANSACTION_FOUND);
  }
  async getByIdAsync<T>(tableName: ClassNames, Id: number) {
    return await this.getFirstAsync<T>(`SELECT * FROM ${tableName} WHERE Id = ?`, Id);
  }
  getByIdSync<T>(tableName: ClassNames, Id: number) {
    return this.getFirstSync<T>(`SELECT * FROM ${tableName} WHERE Id = ?`, Id);
  }
  async getForeignKeysAsync(tableName: ClassNames) {
    return await this.getAllAsync<SqliteForeignKey>(`PRAGMA foreign_key_list(${tableName})`);
  }
  getForeignKeysSync(tableName: ClassNames) {
    return this.getAllSync<SqliteForeignKey>(`PRAGMA foreign_key_list(${tableName})`);
  }
  async getTableInfoAsync(tableName: ClassNames) {
    return await this.getAllAsync<SqliteTableColumnInfo>(`PRAGMA table_info(${tableName})`);
  }
  getTableInfoSync(tableName: ClassNames) {
    return this.getAllSync<SqliteTableColumnInfo>(`PRAGMA table_info(${tableName})`);
  }
  async getTableConstraintsAsync(tableName: ClassNames) {
    const result = await this._db.getFirstAsync<SqliteMaster>(
      `SELECT sql FROM sqlite_master WHERE type='table' AND name COLLATE NOCASE = '${tableName}'`
    );
    if (!result) throw new ErrorCustom(`no constraints found for table: ${tableName}`);
    if (!result.sql) throw new ErrorCustom(`no sql constraint found for table: ${tableName}`);
    return this._extractCheckConstraints(result.sql);
  }
  getTableConstraintsSync(tableName: ClassNames) {
    const result = this._db.getFirstSync<SqliteMaster>(
      `SELECT sql FROM sqlite_master WHERE type='table' AND name COLLATE NOCASE = '${tableName}'`
    );
    if (!result) throw new ErrorCustom(`no constraints found for table: ${tableName}`);
    if (!result.sql) throw new ErrorCustom(`no sql constraint found for table: ${tableName}`);
    return this._extractCheckConstraints(result.sql);
  }
  async getBooleanTableConstraintsAsync(tableName: ClassNames) {
    const constraints = await this.getTableConstraintsAsync(tableName);
    return getEntries(constraints)
      .filter((x) => x[1].includes(" IN (0, 1))"))
      .map((x) => x[0]);
  }
  getBooleanTableConstraintsSync(tableName: ClassNames) {
    const constraints = this.getTableConstraintsSync(tableName);
    return getEntries(constraints)
      .filter((x) => x[1].includes(" IN (0, 1))"))
      .map((x) => x[0]);
  }
  async getAddData<T extends object>(tableName: ClassNames, record: T) {
    const { columnsNames, columnsValues } = await this.getAddOrUpdateData<T>(tableName, record);
    return { columnsNames, columnsValues };
  }
  async getUpdateData<T extends object>(tableName: ClassNames, record: T) {
    const { columnEntries } = await this.getAddOrUpdateData<T>(tableName, record);
    return { columnEntries };
  }
  async getAddOrUpdateData<T extends object>(tableName: ClassNames, record: T) {
    const propsMetaData = GetPropertiesMetaData(tableName, true);
    const propsAsEntries = getEntries(record).filter((x) => !propsMetaData[x[0]]?.DbIgnore && !x[0].toString().startsWith("_"));
    const columnEntries = propsAsEntries
      .filter((x) => !propsMetaData[x[0]]?.isFKObject && !propsMetaData[x[0]]?.isFKArray)
      .map((x) => [x[0], this._handleValueToDb(x[1])]);
    const columnsNames = columnEntries.map((x) => x[0]);
    const columnsValues = columnEntries.map((x) => x[1]);
    const nestedAsEntries = propsAsEntries.filter((x) => propsMetaData[x[0]]?.isFKObject || propsMetaData[x[0]]?.isFKArray);
    return { nestedAsEntries, columnEntries: columnEntries.map((x) => `${x[0]} = ${x[1]}`), columnsNames, columnsValues };
  }
  async getAllNestedRecords<T extends Common>(tableName: ClassNames, records: T[], eachTableIds: Record<string, number[]> = {}) {
    if (!eachTableIds[tableName]) eachTableIds[tableName] = records.map((x) => x.Id);
    else eachTableIds[tableName].push(...records.map((x) => x.Id));
    const propsMetaData = GetPropertiesMetaData(tableName, true);
    for (const record of records) {
      const { nestedAsEntries } = await this.getAddOrUpdateData(tableName, record);
      for (const nestedEntry of nestedAsEntries) {
        const propName = nestedEntry[0];
        if (propsMetaData[propName].columnNameInOtherTable) continue;
        if (propsMetaData[propName].isFKArray && !Array.isArray(nestedEntry[1]))
          throw new ErrorCustom(
            `$nested property name: ${propName as string} with Id: ${record.Id} is not an array, but its meta data says it is`
          );
        const nestedTableName = propsMetaData[propName].fKClassName;
        const value = !Array.isArray(nestedEntry[1]) ? [nestedEntry[1]] : nestedEntry[1];
        await this.getAllNestedRecords(nestedTableName, value, eachTableIds);
      }
    }
    return getEntries(eachTableIds);
  }
  async addOrUpdate<T extends Common>(tableName: ClassNames, records: T[], currentNestedIds: NestedIds<ClassNames> = {}) {
    await this.validateAsync();
    const eachTableIds = await this.getAllNestedRecords(tableName, records);
    const dbEachTableIds: Record<string, number[]> = {};
    for (const tableIds of eachTableIds) {
      let dbRecords = await this.getAllAsync<T>(`SELECT Id FROM ${tableIds[0]} WHERE Id IN (${tableIds[1].join(", ")})`);
      dbEachTableIds[tableIds[0]] = dbRecords.map((x) => x.Id);
    }
    let query = await this._getAddOrUpdateQuery(tableName, records, dbEachTableIds, [], currentNestedIds);
    await this.execAsync(query.join(";\n"));
  }
  async delete(tableName: ClassNames, Id: number) {
    await this.validateAsync();
    return await this.runAsync(`DELETE FROM ${tableName} WHERE Id = ?`, Id);
  }
  async deleteAll(tableName: ClassNames) {
    await this.validateAsync();
    return await this.runAsync(`DELETE FROM ${tableName}`);
  }
  private async _handleGetAsync<T>(cb: () => T, source: string) {
    const match = source.match(/FROM\s+(\w+)/i);
    if (!source.toLowerCase().includes("sqlite_master") && match && match.length > 1) {
      const tableName = match[1] as ClassNames;
      const [booleans, result] = await Promise.all([this.getBooleanTableConstraintsAsync(tableName), cb()]);
      this._handleValueFromDb(result as any, booleans);
      return result;
    }
    const res = await cb();
    return res;
  }
  private _handleGetSync<T>(cb: () => T, source: string) {
    const match = source.match(/FROM\s+(\w+)/i);
    if (!source.toLowerCase().includes("sqlite_master") && match && match.length > 1) {
      const tableName = match[1] as ClassNames;
      const [booleans, result] = [this.getBooleanTableConstraintsSync(tableName), cb()];
      this._handleValueFromDb(result as any, booleans);
      return result;
    }
    return cb();
  }
  private _handleValueFromDb<T extends Common>(result: T | T[] | null, booleans: string[]) {
    if (!result || !booleans || booleans.length === 0) return;
    if (Array.isArray(result)) {
      for (let item of result) {
        this._handleValueFromDb<T>(item, booleans);
      }
      return;
    }
    if (result)
      getKeys(result).forEach((key) => {
        if (typeof key === "string" && booleans.includes(key)) {
          result[key] = (result[key] === 1 ? true : false) as any;
        }
      });
  }
  private _handleValueToDb(value: unknown) {
    if (typeof value === "string") return `'${value}'`;
    if (value === undefined || value === null) return `null`;
    if (value === true) return `1`;
    if (value === false) return `0`;
    return value;
  }
  private _extractCheckConstraints(sql: string): Record<string, string> {
    const checkRegex = /^.*CHECK\((.*?)\)(,|\)|$)/gm;
    const checkColumns: Record<string, string> = {};
    let match: string[] | null | undefined;
    while ((match = checkRegex.exec(sql)) !== null) {
      if (!match[0]) continue;
      let line = match[0].trim(); // The full line
      if (!line.endsWith(",")) line = line + ",";
      const columnName = line.split(" ")[0]; // The first word (column name)
      const checkCondition = line?.match(/CHECK\((.*?)\),/)?.[0]; // The condition inside the CHECK
      if (!columnName || !checkCondition) continue;
      checkColumns[columnName] = checkCondition.slice(0, checkCondition.length - 1); //remove last comma
    }
    return checkColumns;
  }
  private async _setIdTracker() {
    const tablesResult = await this.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
    );
    const minOrMax = NEW_ID_FACTOR < 0 ? "MIN" : "MAX";
    const tableNames = tablesResult.map((x) => `(SELECT ${minOrMax}(Id) FROM ${x.name}) AS ${x.name}`).join(", ");
    const query = `SELECT ${tableNames}`;
    const result = (await this.getFirstAsync<Record<string, number>>(query)) ?? {};
    NewIdsTracker.push(
      ...getEntries(result).map((e) => ({
        className: e[0],
        lastNewId: getNewestId(e[1]),
      }))
    );
  }
  private async _getDbVersion() {
    let result = await this.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
    if (!result) throw new ErrorCustom(DB_ERROR_MESSAGE, ErrorCode.GET_DB_VERSION);
    return result;
  }
  private async _setDbVersion(DatabaseVersion: number) {
    await this.execAsync(`PRAGMA user_version = ${DatabaseVersion}`);
  }
  private async _getHiddenFKColumns(tableName: ClassNames, currentNestedIds: NestedIds<ClassNames>, columnNameInOtherTable?: string) {
    let FKs = await this.getForeignKeysAsync(tableName);
    FKs = FKs.filter((x) => x.from !== columnNameInOtherTable && currentNestedIds[x.table as ClassNames]);
    const columnNames: string[] = [];
    const columnValues: number[] = [];
    for (const fk of FKs) {
      const columnValue = currentNestedIds[fk.table as ClassNames];
      if (!columnValue) continue;
      columnNames.push(fk.from);
      columnValues.push(columnValue);
    }
    return { columnNames, columnValues, FKs };
  }
  private async _getDeleteOthersQuery(tableName: ClassNames, nestedIds: NestedIds<ClassNames>, FKs: SqliteForeignKey[]) {
    if (FKs.length === 0) return;
    const OldRecordWhereCondition = FKs.map((x) => `${x.from} = ${nestedIds[x.table as ClassNames]}`).join(" AND ");
    return `DELETE FROM ${tableName} WHERE ${OldRecordWhereCondition}`;
  }
  private async _getDeleteAbscentQuery(
    tableName: ClassNames,
    nestedIds: NestedIds<ClassNames>,
    FKs: SqliteForeignKey[],
    dbEachTableIds: Record<string, number[]>
  ) {
    if (FKs.length === 0) return;
    const abscentIds = dbEachTableIds[tableName as string]?.join(", ");
    if (!abscentIds) return;
    let query = `DELETE FROM ${tableName} WHERE Id NOT IN (${abscentIds})`;
    const OldRecordWhereCondition = FKs.map((x) => `${x.from} = ${nestedIds[x.table as ClassNames]}`).join(" AND ");
    if (OldRecordWhereCondition) query += ` AND ${OldRecordWhereCondition}`;
    return query;
  }
  private async _handleNested<T extends Common>(
    tableName: ClassNames,
    nestedAsEntries: [keyof T, T[keyof T]][],
    dbEachTableIds: Record<string, number[]> = {},
    query: string[] = [],
    currentNestedIds: NestedIds<ClassNames> = {}
  ) {
    const propsMetaData = GetPropertiesMetaData(tableName, true);
    for (const nestedEntry of nestedAsEntries) {
      const propName = nestedEntry[0];
      if (propsMetaData[propName].isFKArray && !Array.isArray(nestedEntry[1]))
        throw new ErrorCustom(`$nested property name: ${propName as string} is not an array, but its meta data says it is`);
      const nestedTableName = propsMetaData[propName].fKClassName;
      const propValue = Array.isArray(nestedEntry[1]) ? nestedEntry[1] : [nestedEntry[1]];
      const columnNameInOtherTable = propsMetaData[propName].columnNameInOtherTable;
      const { columnNames, columnValues, FKs } = await this._getHiddenFKColumns(nestedTableName, currentNestedIds, columnNameInOtherTable);
      if (columnNameInOtherTable) {
        const del = await this._getDeleteOthersQuery(nestedTableName, currentNestedIds, FKs);
        if (del) query.push(del);
        for (const _propValue of propValue) {
          const columnNamesString = [...columnNames, columnNameInOtherTable].join(", ");
          const columnValuesString = [...columnValues, _propValue].join(", ");
          query.push(`INSERT INTO ${nestedTableName} (${columnNamesString}) VALUES (${columnValuesString})`);
        }
        continue;
      }
      const deleteQuery = await this._getDeleteAbscentQuery(nestedTableName, currentNestedIds, FKs, dbEachTableIds);
      if (deleteQuery) query.push(deleteQuery);
      await this._getAddOrUpdateQuery(nestedTableName as ClassNames, propValue, dbEachTableIds, query, currentNestedIds);
    }
  }
  private async _getAddOrUpdateQuery<T extends Common>(
    tableName: ClassNames,
    records: T[],
    dbEachTableIds: Record<string, number[]> = {},
    query: string[] = [],
    currentNestedIds: NestedIds<ClassNames> = {}
  ) {
    for (const record of records) {
      currentNestedIds[tableName] = record.Id;
      const { columnsNames, columnsValues, columnEntries, nestedAsEntries } = await this.getAddOrUpdateData(tableName, record);
      if (!dbEachTableIds[tableName as string]?.includes(record.Id)) {
        const { columnNames: columnNamesFK, columnValues: columnValuesFK } = await this._getHiddenFKColumns(tableName, currentNestedIds);
        columnsNames.push(...columnNamesFK);
        columnsValues.push(...columnValuesFK);
        query.push(`INSERT INTO ${tableName} (${columnsNames.join(", ")}) VALUES (${columnsValues.join(", ")})`);
      } else {
        query.push(`UPDATE ${tableName} SET ${columnEntries.join(", ")} WHERE Id = ${record.Id}`);
      }
      await this._handleNested(tableName, nestedAsEntries, dbEachTableIds, query, currentNestedIds);
      // for (const nestedEntry of nestedAsEntries) {
      //   const propName = nestedEntry[0];
      //   if (propsMetaData[propName].isFKArray && !Array.isArray(nestedEntry[1]))
      //     throw new ErrorCustom(
      //       `$nested property name: ${propName as string} with Id: ${record.Id} is not an array, but its meta data says it is`
      //     );
      //   const nestedTableName = propsMetaData[propName].fKClassName;
      //   const propValue = Array.isArray(nestedEntry[1]) ? nestedEntry[1] : [nestedEntry[1]];
      //   const columnNameInOtherTable = propsMetaData[propName].columnNameInOtherTable;
      //   const { columnNames, columnValues, FKs } = await this._getHiddenFKColumns(nestedTableName, currentNestedIds, columnNameInOtherTable);
      //   if (columnNameInOtherTable) {
      //     const del = await this._getDeleteOthersQuery(nestedTableName, currentNestedIds, FKs);
      //     if (del) query.push(del);
      //     for (const _propValue of propValue) {
      //       const columnNamesString = [...columnNames, columnNameInOtherTable].join(", ");
      //       const columnValuesString = [...columnValues, _propValue].join(", ");
      //       columnValues.push(_propValue);
      //       query.push(`INSERT INTO ${nestedTableName} (${columnNamesString}) VALUES (${columnValuesString})`);
      //     }
      //     continue;
      //   }
      //   const deleteQuery = await this._getDeleteAbscentQuery(nestedTableName, currentNestedIds, FKs, dbEachTableIds);
      //   if (deleteQuery) query.push(deleteQuery);
      //   await this._getAddOrUpdateQuery(nestedTableName as ClassNames, propValue, dbEachTableIds, query, currentNestedIds);
      // }
    }
    return query;
  }
  async _deleteDb() {
    await this._db.closeAsync();
    await deleteDatabaseAsync(DATABASE_FULL_NAME);
  }
}
export class TransactionCustom<ClassNamesValues extends string> extends SQLiteDatabaseCustom<ClassNamesValues> {
  constructor(tran: Transaction) {
    super(tran);
  }
}
