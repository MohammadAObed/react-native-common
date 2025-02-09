import { ComponentType, Key } from "react";

export type WizardKey = Key;

export type Step<T extends WizardKey> = {
  step: T;
  component: ComponentType<{}>;
};

export type WizardProps<T extends WizardKey> = {
  currentStep?: T;
  steps: Step<T>[];
  showNavigationButtons?: boolean;
  onNext?: (step: T | undefined, isLastStep: boolean) => void;
  onPrev?: (step: T | undefined, isFirstStep: boolean) => void;
};
