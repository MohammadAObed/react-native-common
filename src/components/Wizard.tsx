import { /* React, */ useEffect, useState } from 'react';
import { View } from 'react-native';
import { useStyles } from '../hooks';
import { getWizardCustomStyles } from '../styles';
import type { WizardKey, WizardProps } from '../types/components';
import { ButtonCustom } from './ButtonCustom';

export const Wizard = <T extends WizardKey>({
  steps,
  currentStep: step,
  showNavigationButtons = true,
  onNext,
  onPrev,
}: WizardProps<T>) => {
  const { styles } = useStyles(getWizardCustomStyles);
  const [currentStep, setCurrentStep] = useState<T | undefined>(
    step ?? steps[0]!.step
  );

  const goToNextStep = () => {
    setCurrentStep((prev) => {
      const newStep = steps[steps.findIndex((x) => x.step === prev) + 1]?.step;
      onNext?.(newStep, newStep === undefined);
      return newStep ?? prev;
    });
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => {
      const index = steps.findIndex((x) => x.step === prev) - 1;
      const newStep = steps[index]?.step;
      onPrev?.(newStep, index === 0);
      return newStep ?? prev;
    });
  };

  const currentStepData = steps.find((x) => x.step === currentStep);
  const CurrentComponent = currentStepData?.component;

  useEffect(() => {
    if (step) {
      setCurrentStep(() => step);
    }
  }, [step]);

  return (
    <View style={styles.container}>
      <View>{CurrentComponent && <CurrentComponent />}</View>

      {showNavigationButtons && (
        <View style={{ flexDirection: 'row' }}>
          <>
            <ButtonCustom
              style={styles.buttons}
              mode="button"
              onPress={goToPrevStep}
              disabled={steps.findIndex((x) => x.step === currentStep) === 0}
              applyDisabledStyle
            >
              Previous
            </ButtonCustom>
            <ButtonCustom
              style={styles.buttons}
              mode="button"
              onPress={goToNextStep}
              disabled={
                steps.findIndex((x) => x.step === currentStep) === steps.length
              }
              applyDisabledStyle
            >
              Next
            </ButtonCustom>
          </>
        </View>
      )}
    </View>
  );
};
