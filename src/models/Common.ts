import { NEW_ID, NewIdsTracker } from '../constants';
import { getNewestId } from '../helpers';
import type { Fields } from '../types/models';
import { cloneDeepCommon, getKeys } from '../utils';

//? functions must only be static
export class Common {
  public Id: number;
  private _className?: string;
  constructor(className: string) {
    this.Id = Common._getNewId(className);
    this._className = className;
  }
  // [key: string]: unknown;

  static update<Model>(
    item: Common,
    fields: Fields<Model>,
    ..._args: any[]
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
  static copy(item: Common, ..._args: unknown[]) {
    let newItemPartial: Common = new (this as any)({});
    let newItem = cloneDeepCommon(
      item,
      newItemPartial._className!,
      (className) => {
        const newId = Common._getNewId(className);
        return newId;
      }
    );
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

  static _getNewId(className: string): number {
    const tracker = NewIdsTracker.find((x) => x.className === className);
    if (tracker) {
      tracker.lastNewId = getNewestId(tracker.lastNewId);
      return tracker.lastNewId;
    }
    NewIdsTracker.push({ className, lastNewId: NEW_ID });
    return NEW_ID;
  }
}
