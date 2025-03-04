import { Asset } from 'expo-asset';
import { SQLiteDatabase } from 'expo-sqlite';
import { SQLiteDatabaseCustom } from '../../models';
import type { Params } from '../models/Common';

export type GetSqlFile = (currentDbVersion: number) => Promise<Asset[]>;

export type HandleDbVersion = (
  db: SQLiteDatabaseCustom,
  currentDbVersion: number
) => Promise<void>;

export type Transaction = Params<
  Params<SQLiteDatabase['withExclusiveTransactionAsync']>
>;

export type NestedIds<ClassNames extends string> = Partial<
  Record<ClassNames, number>
>;

export type SqliteForeignKey = {
  id: number;
  seq: number;
  table: string;
  from: string;
  to: string;
  on_update: string;
  on_delete: string;
  match: string;
};

export type SqliteMaster = {
  type: string;
  name: string;
  tbl_name: string;
  rootpage: number;
  sql: string | null;
};

export type SqliteTableColumnInfo = {
  cid: number;
  name: string;
  type: string;
  notnull: 0 | 1;
  dflt_value: string | null;
  pk: number;
};
