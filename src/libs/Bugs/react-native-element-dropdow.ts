export class DropDownBugHelper {
  /** Because the new pressed row will be a number in this allValues: string[] (strange right? bug?), ex: ["1","3",3] new: 3, */
  static HandleMultiSelectOnChangeParam = (allValues: string[]) => {
    return allValues.map((x) => x.toString());
  };
}
