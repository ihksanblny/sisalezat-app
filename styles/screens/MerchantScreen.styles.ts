import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from '../theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  scrollContainer: { 
    padding: SPACING.l,
    paddingBottom: 60,
  },
  
  headerArea: { 
    marginBottom: 40, 
    marginTop: 10 
  },
  backButton: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.l,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: 20,
  },
  title: { 
    ...TYPOGRAPHY.display,
    fontSize: 32, 
    color: COLORS.primary 
  },
  subtitle: { 
    ...TYPOGRAPHY.body,
    fontSize: 14, 
    color: COLORS.textLighter, 
    marginTop: 8 
  },

  imagePicker: { 
    width: '100%', 
    height: 220, 
    backgroundColor: COLORS.white, 
    borderRadius: RADIUS.l, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 30, 
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  pickedImage: { 
    width: '100%', 
    height: '100%',
    resizeMode: 'cover'
  },
  imagePickerText: { 
    ...TYPOGRAPHY.label,
    fontSize: 10,
    color: COLORS.textLighter, 
    marginTop: 12 
  },

  inputGroup: { 
    marginBottom: 25 
  },
  label: { 
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.primary, 
    marginBottom: 10,
    marginLeft: 4,
  },
  input: { 
    backgroundColor: COLORS.white, 
    borderRadius: RADIUS.m, 
    padding: 16, 
    fontSize: 15,
    color: COLORS.primary,
    fontFamily: 'Inter-Regular',
    ...SHADOWS.light,
  },
  
  rowInputs: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  halfInput: { 
    width: '48%' 
  },

  submitButton: { 
    backgroundColor: COLORS.primary, 
    borderRadius: RADIUS.m, 
    paddingVertical: 20, 
    alignItems: 'center', 
    marginTop: 30, 
    ...SHADOWS.medium 
  },
  disabledButton: { 
    backgroundColor: COLORS.grayMedium 
  },
  submitButtonText: { 
    ...TYPOGRAPHY.label,
    color: COLORS.white, 
    fontSize: 14,
  },

  checkboxContainer: {
    paddingVertical: 5,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  checkboxBase: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    ...TYPOGRAPHY.body,
    fontSize: 15,
    color: COLORS.textLight,
  },
  checkboxLabelActive: {
    color: COLORS.primary,
    fontFamily: 'Inter-Bold',
  },
});
