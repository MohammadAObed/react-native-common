import * as FileSystem from "expo-file-system";
import { deleteDatabaseAsync, SQLiteDatabase, SQLiteVariadicBindParams } from "expo-sqlite";
import { DATABASE_FULL_NAME, DB_ERROR_MESSAGE, ErrorCode, NEW_ID_FACTOR, NewIdsTracker } from "../constants";
import { getNewestId, GetPropertyMetaData, GetPropertyMetaDataFkClassName } from "../helpers";
import { Common, ErrorCustom } from "../models";
import { PropertyMetaData } from "../types/constants";
import { GetSqlFile, HandleDbVersion, NestedIds, SqliteForeignKey, SqliteMaster, SqliteTableColumnInfo, Transaction } from "../types/models";
import { getEntries, getKeys, isPrimitive } from "../utils";

export class SQLiteDatabaseCustom<ClassNames extends string = string> {
  private _db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this._db = db;
  }
  static async migrateDbIfNeeded(db: SQLiteDatabase, DatabaseVersion: number, handleDbVersion: HandleDbVersion) {
    const customDb = new SQLiteDatabaseCustom(db);
    // await customDb._deleteDb();
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

  async handleGetAsync<T>(cb: () => T, source: string) {
    console.log("=============2============");
    const match = source.match(/FROM\s+(\w+)/i);
    console.log("🚀 ~ SQLiteDatabaseCustom<ClassNamesValues ~ match:", match);
    if (!source.toLowerCase().includes("sqlite_master") && match && match.length > 1) {
      console.log("=============3============");
      const tableName = match[1] as ClassNames;
      console.log("=============4============tableName", tableName);
      const [booleans, result] = await Promise.all([this.getBooleanTableConstraintsAsync(tableName), cb()]);
      console.log("=============5============booleans", booleans, result);
      this._handleValueFromDb(result as any, booleans);
      console.log("=============6============");
      return result;
    }
    console.log("=============7============", cb);
    const res = await cb();
    console.log("=============8============");
    return res;
  }
  handleGetSync<T>(cb: () => T, source: string) {
    const match = source.match(/FROM\s+(\w+)/i);
    if (!source.toLowerCase().includes("sqlite_master") && match && match.length > 1) {
      const tableName = match[1] as ClassNames;
      const [booleans, result] = [this.getBooleanTableConstraintsSync(tableName), cb()];
      console.log("🚀 ~ SQLiteDatabaseCustom<ClassNamesValues ~ handleGetSync ~ booleans:", booleans);
      this._handleValueFromDb(result as any, booleans);
      return result;
    }
    return cb();
  }

  getFirstAsync = async <T>(source: string, ...params: SQLiteVariadicBindParams): Promise<Awaited<T> | null> => {
    const result = await this.handleGetAsync(async () => await this._db.getFirstAsync<T>(source, ...params), source);
    return result;
  };
  getFirstSync = <T>(source: string, ...params: SQLiteVariadicBindParams) => {
    const result = this.handleGetSync(() => this._db.getFirstSync<T>(source, ...params), source);
    return result;
  };
  getAllAsync = async <T>(source: string, ...params: SQLiteVariadicBindParams): Promise<T[]> => {
    console.log("=============1============");
    const result = await this.handleGetAsync(async () => await this._db.getAllAsync<T>(source, ...params), source);
    return result;
  };
  getAllSync = <T>(source: string, ...params: SQLiteVariadicBindParams): T[] => {
    const result = this.handleGetSync(() => this._db.getAllSync<T>(source, ...params), source);
    return result;
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
    console.log("===========4.1===========tableName", tableName);
    const result = await this._db.getFirstAsync<SqliteMaster>(
      `SELECT sql FROM sqlite_master WHERE type='table' AND name COLLATE NOCASE = '${tableName}'`
    );
    if (!result) throw new ErrorCustom(`no constraints found for table: ${tableName}`);
    if (!result.sql) throw new ErrorCustom(`no sql constraint found for table: ${tableName}`);
    console.log("===========4.2===========result", result);
    return this._extractCheckConstraints(result.sql);
  }
  getTableConstraintsSync(tableName: ClassNames) {
    console.log("🚀 ~ SQLiteDatabaseCustom<ClassNamesValues ~ getTableConstraintsSync ~ tableName:", tableName);
    const result = this._db.getFirstSync<SqliteMaster>(
      `SELECT sql FROM sqlite_master WHERE type='table' AND name COLLATE NOCASE = '${tableName}'`
    );
    if (!result) throw new ErrorCustom(`no constraints found for table: ${tableName}`);
    if (!result.sql) throw new ErrorCustom(`no sql constraint found for table: ${tableName}`);
    console.log("🚀 ~ SQLiteDatabaseCustom<ClassNamesValues ~ getTableConstraintsSync ~ result:", result);
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
    const test = getEntries(constraints);
    console.log("🚀 ~ SQLiteDatabaseCustom<ClassNamesValues ~ getBooleanTableConstraintsSync ~ constraints:", constraints);
    return getEntries(constraints)
      .filter((x) => x[1].includes(" IN (0, 1))"))
      .map((x) => x[0]);
  }
  async add(tableName: ClassNames, record: Common, nestedIds: NestedIds<ClassNames>) {
    console.log("============6.11.2.1============", tableName, record);
    await this.validateAsync();
    const { columns, props } = await this._handleAddOrUpdateData(tableName, record);
    console.log("============6.11.2.2============columns: ", columns);
    const FKs = (await this._handleFKs(tableName, columns)).filter((fk) => nestedIds[fk.table as ClassNames]);
    console.log("============6.11.2.3============");
    let keys = [...columns.map((x) => x[0]), ...FKs.map((fk) => fk.from)].join(", ");
    let values = [...columns.map((x) => this._handleValueToDb(x[1])), ...FKs.map((fk) => nestedIds[fk.table as ClassNames])].join(", ");
    console.log("============6.11.2.5============: ", `INSERT INTO ${tableName} (${keys}) VALUES (${values})`);
    const result = await this.runAsync(`INSERT INTO ${tableName} (${keys}) VALUES (${values})`);
    console.log("============6.11.2.6============");
    await this._handleNested(tableName, record, props, nestedIds);
    console.log("============6.11.2.7============");
    return { ...result };
  }
  async update(tableName: ClassNames, record: Common, nestedIds: NestedIds<ClassNames>, deleteMissingNested = true) {
    // console.log("============1============");
    await this.validateAsync();
    const { columns, props } = await this._handleAddOrUpdateData(tableName, record);
    // console.log("============2============");
    // console.log("============3============");
    const FKs = (await this._handleFKs(tableName, columns)).filter((fk) => nestedIds[fk.table as ClassNames]);
    // console.log("============4============");
    let entries = [
      ...columns.map((x) => `${x[0]} = ${this._handleValueToDb(x[1])}`),
      ...FKs.map((fk) => `${fk.from} = ${nestedIds[fk.table as ClassNames]}`),
    ].join(", ");
    // console.log("============5============");
    const result = await this.runAsync(`UPDATE ${tableName} SET ${entries} WHERE Id = ?`, record.Id);
    console.log("============6============");
    await this._handleNested(tableName, record, props, nestedIds, deleteMissingNested);
    console.log("============7============");
    return { ...result };
  }
  async addOrUpdate(tableName: ClassNames, record: Common, nestedIds: NestedIds<ClassNames> = {}, deleteMissingNested = true) {
    console.log("============6.11.1============");
    await this.validateAsync();
    let dbRecord = await this.getByIdAsync(tableName, record.Id);
    console.log("============6.11.2============", dbRecord);
    const result = await (dbRecord ? this.update(tableName, record, nestedIds) : this.add(tableName, record, nestedIds));
    console.log("============6.11.3============");
    return { ...result, isAdd: !dbRecord };
  }
  async delete(tableName: ClassNames, Id: number) {
    await this.validateAsync();
    return await this.runAsync(`DELETE FROM ${tableName} WHERE Id = ?`, Id);
  }
  async deleteAll(tableName: ClassNames) {
    await this.validateAsync();
    return await this.runAsync(`DELETE FROM ${tableName}`);
  }
  protected _handleValueToDb(value: unknown) {
    if (typeof value === "string") return `'${value}'`;
    if (value === undefined || value === null) return `null`;
    if (value === true) return `1`;
    if (value === false) return `0`;
    return value;
  }
  protected _handleValueFromDb<T extends Common>(result: T | T[] | null, booleans: string[]) {
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
  private async _handleAddOrUpdateData(tableName: ClassNames, record: Common) {
    const props = getEntries(record).filter((x) => !GetPropertyMetaData(tableName, x[0])?.DbIgnore);
    console.log("============6.11.2.1.1============props: ", props);
    const columns = props.filter((x) => {
      const metaData = GetPropertyMetaData(tableName, x[0]);
      if ((x[0] as any) === "GameStyle") {
        console.log("================wwwwwwwwwww====================metaData", metaData);
      }
      return !metaData?.isFKObject && !metaData?.isFKArray;
    });
    return { props, columns };
  }
  private async _handleFKs(tableName: ClassNames, columns: [string, any][]) {
    const FKs = await this.getForeignKeysAsync(tableName);
    const wantedFKs = FKs.filter((fk) => !columns.some((x) => x[0] === fk.from));
    return wantedFKs;
  }
  private async _handleNested(
    tableName: ClassNames,
    record: Common,
    props: [string, any][],
    nestedIds: NestedIds<ClassNames>,
    deleteMissingNested = false
  ) {
    console.log("============6.1============");
    nestedIds[tableName] = record.Id;
    const fKObjects = props.filter((x) => GetPropertyMetaData(tableName, x[0])?.isFKObject);
    console.log("============6.2============");
    for (let fkObject of fKObjects) {
      const fKClassName = GetPropertyMetaDataFkClassName(tableName, fkObject[0]);
      if (!fKClassName) throw new ErrorCustom(`No fKClassName Found with class name: ${tableName}, property name: ${fkObject[0]}`);
      console.log("============6.3============");
      await this.deleteNestedMissing(fKClassName, [fkObject[1].Id], tableName, record.Id);
      await this.addOrUpdate(fKClassName, fkObject[1], nestedIds);
      console.log("============6.4============");
    }
    const fKArrays = props.filter((x) => GetPropertyMetaData(tableName, x[0])?.isFKArray);
    console.log("============6.5============");
    for (let fkArray of fKArrays) {
      console.log("============6.6============");
      const fKClassName = GetPropertyMetaDataFkClassName(tableName, fkArray[0]);
      if (deleteMissingNested && !fkArray[1].some((x: unknown) => isPrimitive(x))) {
        await this.deleteNestedMissing(
          fKClassName,
          fkArray[1].map((x: Common) => x.Id),
          tableName,
          record.Id
        );
      }
      console.log("============6.7============");
      for (let fkArrayItem of fkArray[1]) {
        console.log("============6.8============");
        if (isPrimitive(fkArrayItem)) {
          console.log("============6.9============");
          await this._handleFKPrimitiveArray(fkArrayItem, GetPropertyMetaData(tableName, fkArray[0], true), nestedIds);
          console.log("============6.10============");
        } else {
          console.log("============6.11============");
          await this.addOrUpdate(fKClassName, fkArrayItem, nestedIds);
          console.log("============6.12============");
        }
      }
    }
  }
  private async deleteNestedMissing(tableName: ClassNames, Ids: number[], ParentTableName: ClassNames, parentId: number) {
    if (!parentId || !Ids || Ids.length === 0) return;
    const propName = (await this.getForeignKeysAsync(tableName)).find((x) => x.table === ParentTableName)?.from;
    if (!propName) return;
    console.log(
      "============0.0.0============query:",
      ")}) AND ${propName} = ${parentId}`:",
      `DELETE FROM ${tableName} WHERE Id NOT IN (${Ids.join(",")}) AND ${propName} = ${parentId}`
    );
    await this.runAsync(`DELETE FROM ${tableName} WHERE Id NOT IN (${Ids.join(",")}) AND ${propName} = ${parentId}`);
  }
  private async _handleFKPrimitiveArray(value: unknown, metaData: PropertyMetaData, nestedIds: NestedIds<ClassNames>) {
    const DynamicClass = Common.createDynamicClass(metaData.fKClassName);
    const finalItem = new DynamicClass() as any;
    finalItem[metaData.columnNameInOtherTable!] = value;
    await this._deleteXTable(metaData, nestedIds); //TODO check this
    await this.addOrUpdate(metaData.fKClassName, finalItem, nestedIds);
  }
  private async _deleteXTable(metaData: PropertyMetaData, nestedIds: NestedIds<ClassNames>) {
    const FKs = (await this.getForeignKeysAsync(metaData.fKClassName)).filter((x) => x.from !== metaData.columnNameInOtherTable);
    const OldRecordWhereCondition = FKs.map((x) => `${x.from} = ${nestedIds[x.table as ClassNames]}`).join(" AND ");
    await this.runAsync(`DELETE FROM ${metaData.fKClassName} WHERE ${OldRecordWhereCondition}`);
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
    NewIdsTracker.push(...getEntries(result).map((e) => ({ className: e[0], lastNewId: getNewestId(e[1]) })));
  }
  private async _getDbVersion() {
    let result = await this.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
    if (!result) throw new ErrorCustom(DB_ERROR_MESSAGE, ErrorCode.GET_DB_VERSION);
    return result;
  }
  private async _setDbVersion(DatabaseVersion: number) {
    await this.execAsync(`PRAGMA user_version = ${DatabaseVersion}`);
  }
  private async _deleteDb() {
    await this._db.closeAsync();
    await deleteDatabaseAsync(DATABASE_FULL_NAME);
  }
}
export class TransactionCustom<ClassNamesValues extends string> extends SQLiteDatabaseCustom<ClassNamesValues> {
  constructor(tran: Transaction) {
    super(tran);
  }
}
