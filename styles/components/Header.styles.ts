import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.l, paddingTop: SPACING.l },
  subtitle: { color: COLORS.textLight, fontSize: 14 },
  title: { color: COLORS.text, fontSize: 20, fontWeight: 'bold', maxWidth: '75%' },
  locationTag: { backgroundColor: COLORS.white, padding: 8, borderRadius: RADIUS.l, flexDirection: 'row', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  locationText: { fontSize: 10, marginLeft: 5, color: COLORS.text },
});
