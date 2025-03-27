import { PropertyMetaDataDictionary } from "../../constants";
import { ErrorCommon } from "../../models";
import type { PropertyMetaData, SetClassMetaDataParam, SetPropertyMetaDataParam } from "../../types/constants";

export function SetClassMetaData(metaData: SetClassMetaDataParam) {
  return function (_constructor: Function) {
    if (!PropertyMetaDataDictionary[metaData.className]) PropertyMetaDataDictionary[metaData.className] = {};
  };
}

export function SetPropertyMetaData(metaData: SetPropertyMetaDataParam) {
  return function (_target: any, propertyKey: any) {
    const newMetaData: PropertyMetaData = {
      className: metaData.className ?? "",
      isFKObject: metaData.isFKObject ?? false,
      isFKArray: metaData.isFKArray ?? false,
      isFK: metaData.isFK ?? false,
      fKClassName: metaData.fKClassName ?? "",
      columnNameInOtherTable: metaData.columnNameInOtherTable ?? "",
      DbIgnore: metaData.DbIgnore ?? false,
      columnNameOfParentInOtherTable: metaData.columnNameOfParentInOtherTable ?? "",
    };

    if (!PropertyMetaDataDictionary[newMetaData.className]) PropertyMetaDataDictionary[newMetaData.className] = {};
    if (!PropertyMetaDataDictionary[newMetaData.className]![propertyKey])
      PropertyMetaDataDictionary[newMetaData.className]![propertyKey] = newMetaData;
  };
}

export function GetPropertiesMetaData(className: string, throwError: true): Record<string | number | symbol, PropertyMetaData>;
export function GetPropertiesMetaData(className: string, throwError?: false): Record<string | number | symbol, PropertyMetaData> | undefined;
export function GetPropertiesMetaData(className: string, throwError = false): Record<string | number | symbol, PropertyMetaData> | undefined {
  if (!PropertyMetaDataDictionary[className]) {
    if (throwError) throw new ErrorCommon(`Found no class in property meta data with name: ${className}`);
  }
  return PropertyMetaDataDictionary[className];
}

export function GetPropertyMetaData(className: string, propertyName: string, throwError: true): PropertyMetaData;
export function GetPropertyMetaData(className: string, propertyName: string, throwError?: false): PropertyMetaData | undefined;
export function GetPropertyMetaData(className: string, propertyName: string, throwError = false): PropertyMetaData | undefined {
  if (!PropertyMetaDataDictionary[className]) {
    if (throwError) throw new ErrorCommon(`Found no class in property meta data with name: ${className}`);
  }
  if (!PropertyMetaDataDictionary[className]?.[propertyName]) {
    if (throwError)
      throw new ErrorCommon(`Found no property in property meta data with class name: ${className}, property name: ${propertyName}`);
  }
  return PropertyMetaDataDictionary[className]?.[propertyName];
}

export function GetPropertyMetaDataFkClassName(className: string, propertyName: string, throwError = false) {
  const fkClassName = throwError
    ? GetPropertyMetaData(className, propertyName, false)?.fKClassName
    : GetPropertyMetaData(className, propertyName, true)?.fKClassName;
  if (!fkClassName) throw new ErrorCommon(`No fKClassName Found with class name: ${className}, property name: ${propertyName}`);
  return fkClassName;
}
