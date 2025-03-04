import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { SQLiteDatabaseCustom } from "../models";

export const useSQLiteContextCustom = <ClassNames extends string = string>() => {
  const db = useSQLiteContext();
  const [customDb, setCustomDb] = useState(new SQLiteDatabaseCustom<ClassNames>(db));

  useEffect(() => {
    setCustomDb(new SQLiteDatabaseCustom<ClassNames>(db));
  }, [db]);

  return customDb;
};
