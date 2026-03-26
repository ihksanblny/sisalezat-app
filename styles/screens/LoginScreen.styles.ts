import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, padding: SPACING.xl, justifyContent: 'center' },
  headerArea: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 10 },
  inputArea: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: COLORS.text, marginBottom: 8, marginLeft: 5 },
  input: { backgroundColor: COLORS.background, borderRadius: RADIUS.m, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: COLORS.border },
  mainButton: { backgroundColor: COLORS.primary, borderRadius: RADIUS.m, padding: 18, alignItems: 'center', marginTop: 10, elevation: 5, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10 },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  
  // Gaya Pemisah (Divider)
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { marginHorizontal: 15, color: COLORS.textLight, fontSize: 12 },

  // Gaya Tombol Google
  googleButton: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: RADIUS.m, padding: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border },
  googleButtonText: { color: COLORS.text, fontWeight: 'bold', fontSize: 16, marginLeft: 12 },
  googleIcon: { width: 24, height: 24 },

  toggleArea: { marginTop: 25, alignItems: 'center' },
  toggleText: { color: COLORS.textLight, fontSize: 14 },
  toggleLink: { color: COLORS.primary, fontWeight: 'bold' }
});