import type { ButtonCustomProps } from "../ButtonCustom";
import type { OptionalChildren } from "../Common";

export type CardCustomProps = OptionalChildren<ButtonCustomProps> & {
    title?: string
    description?: string
};
