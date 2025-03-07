/*
? SQLiteDatabaseCustom.ts
async add(tableName: ClassNames, record: Common, nestedIds: NestedIds<ClassNames>) {
    await this.validateAsync();
    const { columns, props } = await this._handleAddOrUpdateData(tableName, record);
    const FKs = (await this._handleFKs(tableName, columns)).filter((fk) => nestedIds[fk.table as ClassNames]);
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
  async addOrUpdate(tableName: ClassNames, record: Common, nestedIds: NestedIds<ClassNames> = {}, _deleteMissingNested = true) {
    console.log("============6.11.1============");
    await this.validateAsync();
    let dbRecord = await this.getByIdAsync(tableName, record.Id);
    console.log("============6.11.2============", dbRecord);
    const result = await (dbRecord ? this.update(tableName, record, nestedIds) : this.add(tableName, record, nestedIds));
    console.log("============6.11.3============");
    return { ...result, isAdd: !dbRecord };
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
  */
