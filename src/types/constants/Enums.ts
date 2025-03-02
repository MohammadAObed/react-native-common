import { ErrorCode, SvgShape } from "../../constants";

export type SvgShapeValues = (typeof SvgShape)[keyof typeof SvgShape];
export type ErrorCodeValues = (typeof ErrorCode)[keyof typeof ErrorCode];
