import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.l, marginBottom: SPACING.l, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, flexDirection: 'row' },
  cardImage: { width: 100, height: 130 },
  cardContent: { flex: 1, padding: SPACING.m },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  storeName: { color: COLORS.textLighter, fontSize: 12 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF9E5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  ratingText: { fontSize: 10, marginLeft: 3, fontWeight: 'bold' },
  itemName: { fontSize: 16, fontWeight: 'bold', marginVertical: 4, color: COLORS.text },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  infoText: { fontSize: 12, color: COLORS.textLight, marginLeft: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  oldPrice: { textDecorationLine: 'line-through', color: COLORS.textLighter, fontSize: 12 },
  newPrice: { color: COLORS.primary, fontSize: 18, fontWeight: 'bold' },
  stockLabel: { backgroundColor: '#FFF5F5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  stockText: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold' },
});
