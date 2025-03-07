export type PropertyMetaData = {
  className: string;
  isFKObject: boolean;
  isFKArray: boolean;
  isFK: boolean;
  fKClassName: any; //string
  columnNameInOtherTable: string;
  columnNameOfParentInOtherTable: string;
  DbIgnore: boolean;
};

export type SetClassMetaDataParam = { className: string };

export type SetPropertyMetaDataParam = { className: string } & Partial<Omit<PropertyMetaData, "isFKObject" | "isFKArray" | "fKClassName">> &
  ({ isFKObject: true; fKClassName: string } | { isFKObject?: false; fKClassName?: string }) &
  ({ isFKArray: true; fKClassName: string } | { isFKArray?: false; fKClassName?: string });
