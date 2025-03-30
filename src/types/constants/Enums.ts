import { SvgShape } from "../../constants";
import { ErrorCommon } from "../../models";

export type SvgShapeValues = (typeof SvgShape)[keyof typeof SvgShape];
export type ErrorCodeValues = (typeof ErrorCommon.ErrorCode)[keyof typeof ErrorCommon.ErrorCode];
