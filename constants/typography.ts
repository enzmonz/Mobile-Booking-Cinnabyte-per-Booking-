// Type scale + font family tokens. Fonts are loaded in app/_layout.tsx via
// @expo-google-fonts/inter; these family names must match the keys used there.
export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

export const Typography = {
  largeHeading: {
    fontFamily: FontFamily.bold,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.4,
  },
  sectionHeading: {
    fontFamily: FontFamily.semibold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  cardTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  bodyMedium: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  metadata: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  eyebrow: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
  },
};

export default Typography;
