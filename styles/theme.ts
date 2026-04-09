export const COLORS = {
  // Brand Colors (Stitch: The Ethereal Orchard)
  primary: '#012D1D', // Deep Forest (High-end autoritas)
  primaryContainer: '#1B4332',
  onPrimary: '#FFFFFF',
  
  secondary: '#5E5E5B',
  accent: '#FFB59F', // Sun-Kissed Orange (Appetite appeal)
  
  // Surfaces (Paint context)
  background: '#F4FAFD', // Soft Cream Canvas
  surface: '#FFFFFF',
  surfaceVariant: '#E8EFF1',
  
  // Text Colors
  text: '#161D1F', // Deep Charcoal
  textLight: '#414844',
  textLighter: '#717973',
  
  // Functional
  success: '#2D6A4F',
  error: '#BA1A1A',
  border: '#C1C8C2',
  white: '#FFFFFF',
  grayLight: '#F1F3F4',
  grayMedium: '#BDC1C6',
  outlineVariant: 'rgba(193, 200, 194, 0.15)', // Ghost Border
  surfaceContainer: '#E8EFF1',
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48, // Whitespace adalah kemewahan
};

export const RADIUS = {
  s: 12,
  m: 18,
  l: 28, // Extra rounded (Material 3 style)
  full: 999,
};

export const SHADOWS = {
  // Ambient Shadow (Tinted with forest green)
  light: {
    shadowColor: '#012D1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  medium: {
    shadowColor: '#012D1D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
};

export const TYPOGRAPHY = {
  // Editorial Rules (Stitch: The Ethereal Orchard)
  display: {
    fontFamily: 'Manrope-ExtraBold',
    fontWeight: '800' as const,
    letterSpacing: -1.5,
    lineHeight: 42,
  },
  headline: {
    fontFamily: 'Manrope-Bold',
    fontWeight: '700' as const,
    letterSpacing: -0.8,
  },
  subheadline: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  label: {
    fontFamily: 'Inter-Bold',
    fontWeight: '700' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontWeight: '400' as const,
    lineHeight: 24,
  }
};
