export class PaperBugHelper {
  static GetTextInputValue = (isActive: boolean, inputText: string | undefined, placeholder: string | undefined) => {
    return isActive ? inputText : inputText ? inputText : placeholder; //when using placeholder prop, the placeholder text does not show unless you you type something then remove it
  };
  static GetTextInputColor = (
    inputText: string | undefined,
    placeholder: string | undefined,
    placeholderColor: string,
    textColor: string | undefined,
    styleColor: string
  ) => {
    return !inputText && placeholder ? placeholderColor : textColor ?? styleColor; //when using placeholder prop, the placeholder text does not show unless you you type something then remove it
  };
}
