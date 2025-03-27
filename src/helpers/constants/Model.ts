import { Key } from "react";
import { NEW_ID, NEW_ID_FACTOR } from "../../constants";
import { DisplayDataItemFrom } from "../../types/components";

export function getNewestId(id?: number) {
  return (id ?? NEW_ID) + NEW_ID_FACTOR;
}
export function getLabels<DataType extends Key, Label extends React.ReactNode | React.ReactNode = React.ReactNode>(
  data: DisplayDataItemFrom<DataType, Label>[],
  values: DataType[]
) {
  return data.filter((x) => values.includes(x.value)).map((x) => x.label);
}
export function getLabel<DataType extends Key, Label extends React.ReactNode | React.ReactNode = React.ReactNode>(
  data: DisplayDataItemFrom<DataType, Label>[],
  value: DataType,
  placeholder = "unkown"
) {
  return data.find((x) => x.value === value)?.label ?? placeholder;
}
