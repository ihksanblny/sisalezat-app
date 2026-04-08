import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.l,
    justifyContent: 'center',
  },
  headerArea: {
    marginBottom: 50,
  },
  title: {
    ...TYPOGRAPHY.display,
    fontSize: 42, // Massive editorial header
    color: COLORS.primary,
    lineHeight: 48,
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
    backgroundColor: COLORS.white,
    height: 60,
    borderRadius: RADIUS.m,
    paddingHorizontal: 20,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 20,
    ...SHADOWS.light,
    fontFamily: 'Inter-Regular',
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: 20,
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
    height: 60,
    borderRadius: RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#f0f0f0',
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