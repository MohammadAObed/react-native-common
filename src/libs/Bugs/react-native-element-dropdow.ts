export class DropDownBugHelper {
  static HandleMultiSelectOnChangeParam = (allValues: string[]) => {
    return allValues.map((x) => x.toString()); //because the new pressed row will be a number in this allValues: string[] (strange right? bug?), ex: ["1","3",3] new: 3,
  };
}
