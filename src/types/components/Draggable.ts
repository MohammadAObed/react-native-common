import { PropsWithChildren } from "react";

export type AnimatedContext = {
  startX: number;
  startY: number;
};

export type DraggableProps = PropsWithChildren & {
  initialTranslateY?: number;
  initialTranslateX?: number;
  keyboardVisibleTranslateY?: number;
  zIndex?: number;
  onFinish?: (param: OnFinishParam) => void;
};

export type OnFinishParam = { translateX: number; translateY: number };
