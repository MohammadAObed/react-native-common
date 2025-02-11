import { ErrorCode } from "./ErrorCustom";
import { SvgShape } from "./SvgShape";

export type SvgShapeValues = (typeof SvgShape)[keyof typeof SvgShape];
export type ErrorCodeValues = (typeof ErrorCode)[keyof typeof ErrorCode];
