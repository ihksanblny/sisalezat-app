import { StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  starsRow: { flexDirection: 'row', gap: 6 },
  ratingLabel: { fontSize: 12, color: COLORS.textLight, marginTop: 6 },
  summary: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avgText: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  countText: { fontSize: 12, color: COLORS.textLight },
});
