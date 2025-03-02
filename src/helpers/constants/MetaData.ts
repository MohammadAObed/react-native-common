import { PropertyMetaDataDictionary } from "../../constants";
import { ErrorCustom } from "../../models";
import { PropertyMetaData, SetPropertyMetaDataParam } from "../../types/constants";

export function SetPropertyMetaData(metaData: SetPropertyMetaDataParam) {
  return function (target: any, propertyKey: any) {
    const newMetaData: PropertyMetaData = {
      className: metaData.className ?? "",
      isFKObject: metaData.isFKObject ?? false,
      isFKArray: metaData.isFKArray ?? false,
      isFK: metaData.isFK ?? false,
      fKClassName: metaData.fKClassName ?? "",
      columnNameInOtherTable: metaData.columnNameInOtherTable ?? "",
      DbIgnore: metaData.DbIgnore ?? false,
    };

    if (!PropertyMetaDataDictionary[newMetaData.className]) PropertyMetaDataDictionary[newMetaData.className] = {};
    if (!PropertyMetaDataDictionary[newMetaData.className]![propertyKey])
      PropertyMetaDataDictionary[newMetaData.className]![propertyKey] = newMetaData;
    console.log("🚀 ~ PropertyMetaDataDictionary[newMetaData.className]:", PropertyMetaDataDictionary[newMetaData.className]);
  };
}

export function GetPropertyMetaData(className: string, propertyName: string, throwError: true): PropertyMetaData;
export function GetPropertyMetaData(className: string, propertyName: string, throwError?: false): PropertyMetaData | undefined;
export function GetPropertyMetaData(className: string, propertyName: string, throwError = false): PropertyMetaData | undefined {
  if (!PropertyMetaDataDictionary[className]) {
    if (throwError) throw new ErrorCustom(`Found no class in property meta data with name: ${className}`);
  }
  if (!PropertyMetaDataDictionary[className]?.[propertyName]) {
    if (throwError)
      throw new ErrorCustom(`Found no property in property meta data with class name: ${className}, property name: ${propertyName}`);
  }
  return PropertyMetaDataDictionary[className]?.[propertyName];
}

export function GetPropertyMetaDataFkClassName(className: string, propertyName: string, throwError = false) {
  const fkClassName = throwError
    ? GetPropertyMetaData(className, propertyName, false)?.fKClassName
    : GetPropertyMetaData(className, propertyName, true)?.fKClassName;
  if (!fkClassName) throw new ErrorCustom(`No fKClassName Found with class name: ${className}, property name: ${propertyName}`);
  return fkClassName;
}
