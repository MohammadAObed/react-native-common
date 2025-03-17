import { View, type ViewStyle } from "react-native";
import { getContainerStyleFromChildren, getStyleFromChildren, isBlurSupported } from "../helpers";
import { useStyles } from "../hooks";
import getShadowStyles from "../styles/Shadow";
import type { ShadowProps } from "../types/components";

const blurSupported = isBlurSupported();
const BLUR_NOT_SUPPORTED_OPACITY = 0.185

const Shadow = ({ children, style, containerStyle, offset = [0, 0], opacity = 1, borderRadius = 0, blur = 0, ...rest }: ShadowProps) => {
  const { styles } = useStyles(getShadowStyles);
  const transform: ViewStyle["transform"] = [{ translateX: offset[0] }, { translateY: offset[1] }];
  let _containerStyle = getContainerStyleFromChildren(children);
  let _style = getStyleFromChildren(children);
  return (
    <View style={[styles.shadowContainer, _containerStyle, containerStyle]}>
      <View
        style={[
          styles.shadow,
          _style,
          { transform },
          {
            opacity: blurSupported ? opacity : BLUR_NOT_SUPPORTED_OPACITY,
            borderRadius,
            filter: [{ blur }],
          },
          style,
        ]}
        {...rest}
      ></View>
      {children}
    </View>
  );
};
export default Shadow;
