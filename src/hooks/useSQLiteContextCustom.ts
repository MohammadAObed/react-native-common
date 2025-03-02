import { SQLiteDatabaseCustom } from "@mohammad_obed/react-native-common/src/models";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export const useSQLiteContextCustom = <ClassNames extends string = string>() => {
  const db = useSQLiteContext();
  const [customDb, setCustomDb] = useState(new SQLiteDatabaseCustom<ClassNames>(db));

  useEffect(() => {
    setCustomDb(new SQLiteDatabaseCustom<ClassNames>(db));
  }, [db]);

  return customDb;
};
