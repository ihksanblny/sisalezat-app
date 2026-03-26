import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollContainer: { padding: SPACING.l },
  
  headerArea: { marginBottom: 30, marginTop: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginTop: 5 },

  imagePicker: { width: '100%', height: 200, backgroundColor: COLORS.background, borderRadius: RADIUS.m, borderStyle: 'dashed', borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center', marginBottom: 25, overflow: 'hidden' },
  pickedImage: { width: '100%', height: '100%' },
  imagePickerText: { color: COLORS.textLight, marginTop: 10 },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  input: { backgroundColor: COLORS.background, borderRadius: RADIUS.m, padding: 15, borderWidth: 1, borderColor: COLORS.border },
  
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },

  submitButton: { backgroundColor: COLORS.primary, borderRadius: RADIUS.m, paddingVertical: 18, alignItems: 'center', marginTop: 20, elevation: 5, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10 },
  disabledButton: { backgroundColor: COLORS.grayMedium },
  submitButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 }
});
