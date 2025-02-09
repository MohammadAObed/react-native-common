import { ButtonCustomProps } from "./ButtonCustom";

export type PressableIconProps = ButtonCustomProps & {
  size?: number;
  iconMode?: "bare" | "circle";
  name?: "plus" | "minus" | "trash" | "xmark" | "eye" | "eye-dropper" | "device" | "landscape-device" | "star" | "play" | "Flag";
  color?: string;
};
