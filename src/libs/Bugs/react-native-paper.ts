import { TextInputCustomProps } from "@mohammad_obed/react-native-common/src/types/components";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { MD3Theme } from "react-native-paper";

export class PaperBugHelper {
  /** If input is disabled, then underline is always showing */
  static GetTextInputDisabledTheme = (theme: MD3Theme, modeCustom: TextInputCustomProps["modeCustom"]) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        onSurfaceDisabled: modeCustom === "text" ? "transparent" : theme.colors.onSurfaceDisabled,
      },
    };
  };

  /** When input is disabled and textAlign in style property or content style property is configured to be right or center then the placeholder does not appear when toggling the disable value  */
  static GetTextInputContentStyle = (
    inputText: string | undefined,
    placeholder: string | undefined,
    style: StyleProp<TextStyle>,
    contentStyle: StyleProp<TextStyle>
  ) => {
    const flattenStyle = StyleSheet.flatten(style);
    const flattenContentStyle = StyleSheet.flatten(contentStyle);
    const textAlign = flattenContentStyle?.textAlign ?? flattenStyle?.textAlign;
    let TextAlignStyle: TextStyle = {
      textAlign,
      alignSelf: textAlign === "left" ? "flex-start" : textAlign === "right" ? "flex-end" : textAlign === "center" ? "center" : undefined,
    };
    if (!inputText && placeholder) {
      TextAlignStyle.textAlign = undefined;
    }
    return { ...flattenContentStyle, ...TextAlignStyle };
  };
}
/** When input is disabled and textAlign in style property or content style property is configured to be right or center then the placeholder does not appear when toggling the disable value  */
export type TPaperBugHelper = {
  TextInputCustomPropsOmit: "textAlign";
};
