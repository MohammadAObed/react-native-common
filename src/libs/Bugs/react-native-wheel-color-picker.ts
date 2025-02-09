export class ColorPickerBugHelper {
  static HandleTransparentColor = (value: string) => {
    //color picker does not handle: hex with 8 digits and named colors and transparent word
    let correctValue: string | null = null;
    if (value.startsWith("#") && value.length > 7) {
      correctValue = value.substring(0, 7);
    } else if (value === "transparent") {
      correctValue = "#ffffff";
    }
    return correctValue;
  };
}
