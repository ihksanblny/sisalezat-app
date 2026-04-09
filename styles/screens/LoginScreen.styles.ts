import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xl, // More whitespace
    justifyContent: 'center',
  },
  headerArea: {
    marginBottom: 50,
  },
  title: {
    ...TYPOGRAPHY.display,
    fontSize: 52, // Even more massive
    color: COLORS.primary,
    lineHeight: 56,
    marginBottom: 4,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: COLORS.textLighter,
    marginTop: 12,
  },
  inputArea: {
    marginBottom: 40,
  },
  inputLabel: {
    ...TYPOGRAPHY.label,
    fontSize: 10,
    color: COLORS.textLighter,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.surfaceContainer, // Tonal layering
    height: 64,
    borderRadius: RADIUS.m,
    paddingHorizontal: 24,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant, // Ghost border
    fontFamily: 'Inter-Regular',
  },
  mainButton: {
    backgroundColor: COLORS.primaryContainer, // Rich tonal background
    height: 68,
    borderRadius: RADIUS.l, // More rounded as per theme
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: 24,
  },
  buttonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
    opacity: 0.5,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    ...TYPOGRAPHY.label,
    fontSize: 10,
    marginHorizontal: 15,
    color: COLORS.textLighter,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: 64,
    borderRadius: RADIUS.l,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    ...TYPOGRAPHY.subheadline,
    fontSize: 14,
    color: COLORS.primary,
  },
  toggleArea: {
    marginTop: 40,
    alignItems: 'center',
  },
  toggleText: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.textLighter,
  },
  toggleLink: {
    ...TYPOGRAPHY.subheadline,
    color: COLORS.accent,
    textDecorationLine: 'underline',
  },
});