import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  headerNav: { position: 'absolute', top: 50, left: SPACING.l, right: SPACING.l, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between' },
  iconCircle: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 10, borderRadius: 25 },
  heroImage: { width: '100%', height: 350 },
  content: { padding: SPACING.xl, borderTopLeftRadius: RADIUS.xl, borderTopRightRadius: RADIUS.xl, backgroundColor: COLORS.white, marginTop: -30 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  storeName: { color: COLORS.primary, fontWeight: 'bold' },
  ratingBox: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 5, fontSize: 12, color: COLORS.textLight },
  itemName: { fontSize: 24, fontWeight: 'bold', marginTop: 10, color: COLORS.text },
  badgeRow: { flexDirection: 'row', marginTop: SPACING.m },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.grayLight, paddingHorizontal: SPACING.m, paddingVertical: 8, borderRadius: RADIUS.l, marginRight: 10 },
  badgeText: { fontSize: 12, color: COLORS.textLight, marginLeft: 5 },
  descriptionSection: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  descriptionText: { color: COLORS.textLight, marginTop: 10, lineHeight: 22 },
  footer: { padding: SPACING.xl, paddingBottom: 35, borderTopWidth: 1, borderColor: COLORS.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerOldPrice: { textDecorationLine: 'line-through', color: COLORS.textLighter, fontSize: 14 },
  footerNewPrice: { color: COLORS.primary, fontSize: 22, fontWeight: 'bold' },
  orderButton: { backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 15, borderRadius: RADIUS.l },
  orderButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 }
});
