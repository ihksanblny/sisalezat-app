import { StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export const styles = StyleSheet.create({
  // Tombol utama
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  timeButton: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 14 },
  timeLabel: { fontSize: 11, color: COLORS.textLight },
  timeValue: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginTop: 2 },
  dash: { fontSize: 22, color: COLORS.textLight, fontWeight: 'bold' },

  // Modal / Bottom Sheet
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, textAlign: 'center', marginBottom: 16 },

  // Preview jam terpilih
  preview: { backgroundColor: COLORS.primary + '15', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 20 },
  previewText: { fontSize: 48, fontWeight: '900', color: COLORS.primary, letterSpacing: 4 },

  // Kolom scroll
  pickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  colLabel: { flex: 1, textAlign: 'center', fontSize: 12, color: COLORS.textLight, marginBottom: 4, fontWeight: '600' },
  scrollCol: { flex: 1, height: 180 },
  scrollItem: { paddingVertical: 12, alignItems: 'center', borderRadius: 10, marginVertical: 2, marginHorizontal: 8 },
  scrollItemActive: { backgroundColor: COLORS.primary + '20' },
  scrollItemText: { fontSize: 20, color: COLORS.textLight, fontWeight: '500' },
  scrollItemTextActive: { color: COLORS.primary, fontWeight: '800', fontSize: 22 },
  colon: { fontSize: 28, fontWeight: '900', color: COLORS.text, paddingHorizontal: 8, marginTop: -10 },

  // Tombol aksi
  actions: { flexDirection: 'row', gap: 12, marginTop: 24 },
  cancelBtn: { flex: 1, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  cancelText: { color: COLORS.textLight, fontWeight: '600', fontSize: 16 },
  confirmBtn: { flex: 2, padding: 16, borderRadius: 14, backgroundColor: COLORS.primary, alignItems: 'center' },
  confirmText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
