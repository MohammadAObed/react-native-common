import type { PropsWithChildren } from 'react';

export type StaticProps = PropsWithChildren & {
  initialTranslateY: number;
  initialTranslateX: number;
  keyboardVisibleTranslateY?: number;
  zIndex?: number;
};
