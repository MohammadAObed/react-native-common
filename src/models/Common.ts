import { NEW_ID, NewIdsTracker } from '../constants';
import type { Fields } from '../types/models';
import { cloneDeep, getKeys } from '../utils';

//? functions must only be static
export class Common {
  public Id: number;
  constructor() {
    this.Id = Common.getNewId(this);
  }
  // [key: string]: unknown;

  static create(...args: unknown[]) {
    return new this();
  }

  static update<Model>(
    item: Common,
    fields: Fields<Model>,
    ...args: any[]
  ): any {
    const fieldNames = getKeys(fields) as Extract<
      keyof Fields<Model>,
      string
    >[];
    for (let i = 0; i < fieldNames.length; i++) {
      let fieldName = fieldNames[i]!;
      let fieldValue = fields[fieldName];
      Common.setNestedPropertyValue(item, fieldName.split('.'), fieldValue);
    }
    return { ...item };
  }

  //...args needed for child classes
  static copy(item: Common, ...args: unknown[]) {
    let newItem = cloneDeep(item);
    let newItemPartial: any = new (this as any)({});
    newItem.Id = newItemPartial.Id;
    return newItem;
  }

  static validate() {}

  static setNestedPropertyValue(
    item: any,
    proptiesNames: string[],
    value: unknown
  ) {
    let currentObj: Record<string, unknown> = item;
    for (let i = 0; i < proptiesNames.length - 1; i++) {
      let propertyName = proptiesNames[i]!;

      if (
        !currentObj[propertyName] ||
        typeof currentObj[propertyName] !== 'object'
      ) {
        currentObj[propertyName] = {};
      }

      currentObj = currentObj[propertyName] as Record<string, unknown>; //"as this" won't be correct, because we go one level deep each iteration and assign currentObj to be the nested property value (object)
    }

    let lastPropertyName = proptiesNames.vLast()!;
    currentObj[lastPropertyName] = value; //currentObj is assigned by reference (as normally in javacript) to the deeply nested object inside the instance of "this", so modifying any value of its properties will result in modifying the nested object property value
    return this;
  }

  private static getNewId(obj: Common): number {
    const name = obj.constructor.name; //I heard when app is published (run build) the classes names changes due to minification (ex: Item → a, Game → b)
    const tracker = NewIdsTracker.find((x) => x.className === name);
    if (tracker) return --tracker.lastNewId;
    NewIdsTracker.push({ className: name, lastNewId: NEW_ID });
    return NEW_ID;
  }
}
