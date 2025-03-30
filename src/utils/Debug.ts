import { ErrorCommon } from "../models";

export function modifyConsoleLog() {
  const originalLog = console.log;
  console.log = function (...args) {
    if (typeof args[0] === "string" && args[0].includes("🚀")) {
      args[0] += " 🚀 ";
    }
    const formattedArgs = args.map((arg) => {
      try {
        if (arg instanceof ErrorCommon || arg instanceof Error) {
          arg = ErrorCommon.copy(arg as ErrorCommon);
        }
        return typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg);
      } catch (error) {
        return arg;
      }
    });
    originalLog("================================================BeginLog================================================");
    originalLog(...formattedArgs);
    originalLog("================================================EndLog================================================");
  };
}
