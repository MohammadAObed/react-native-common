import { useState } from "react";
import { FAB } from "react-native-paper";
import { SafeAreaViewCustom } from "../../components";
import { useStyles } from "../../hooks";
import { getFloatingButtonGroupStyles, getFloatingContainerModeStyles } from "../../styles";
import type { FloatingButtonGroupProps } from "../../types/components";

export const FloatingButtonGroup = ({
  style,
  containerStyle,
  fabStyle,
  color,
  rippleColor,
  icon,
  openIcon,
  mode = "bottom-right",
  visible = true,
  actions,
  onPress,
  onLongPress,
  ...rest
}: FloatingButtonGroupProps) => {
  const { styles } = useStyles(getFloatingButtonGroupStyles);
  const { styles: modeStyles } = useStyles(getFloatingContainerModeStyles);
  const [state, setState] = useState({ open: false });
  const { open } = state;
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  actions.forEach((action) => {
    action.containerStyle = [action.containerStyle, styles.actionContainerStyle];
    action.labelStyle = [action.labelStyle, styles.actionLabelStyle];
    if (mode === "top-left" || mode === "bottom-left" || mode === "middle-left") action.label = "";
  });
  return (
    <SafeAreaViewCustom style={[styles.container, modeStyles[mode], containerStyle]}>
      <FAB.Group
        style={[style]}
        fabStyle={[fabStyle, styles.fabStyle]}
        color={color ?? styles.iconColor.color}
        rippleColor={rippleColor ?? styles.rippleColor.color}
        backdropColor="transparent"
        visible={visible}
        open={open}
        icon={open ? openIcon ?? icon : icon}
        actions={actions}
        onStateChange={onStateChange}
        onPress={(e) => onPress?.(open, e)}
        onLongPress={(e) => onLongPress?.(open, e)}
        {...rest}
      />
    </SafeAreaViewCustom>
  );
};
