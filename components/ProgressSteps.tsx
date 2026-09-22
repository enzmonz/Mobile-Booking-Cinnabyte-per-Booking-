import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { Spacing, ScreenPadding } from '@/constants/spacing';

const STEPS = ['Date', 'Time', 'Confirm'];

interface ProgressStepsProps {
  currentStep: 1 | 2 | 3;
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <View style={styles.container}>
      {STEPS.map((label, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isDone = step < currentStep;
        return (
          <React.Fragment key={label}>
            <View style={styles.step}>
              <Text
                style={[
                  styles.number,
                  (isActive || isDone) && styles.numberActive,
                ]}
              >
                {String(step).padStart(2, '0')}
              </Text>
              <Text
                style={[
                  styles.label,
                  (isActive || isDone) && styles.labelActive,
                ]}
              >
                {label}
              </Text>
            </View>
            {index < STEPS.length - 1 && (
              <View
                style={[styles.line, isDone && styles.lineActive]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ScreenPadding,
    paddingBottom: Spacing.lg,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  number: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: Colors.textMuted,
  },
  numberActive: {
    color: Colors.accentDark,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textMuted,
  },
  labelActive: {
    color: Colors.text,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.sm,
  },
  lineActive: {
    backgroundColor: Colors.accentDark,
  },
});
