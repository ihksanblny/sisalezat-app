import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  banner: { backgroundColor: COLORS.secondary, borderRadius: RADIUS.l, padding: SPACING.l, marginBottom: SPACING.l },
  bannerTitle: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  bannerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 5 },
});
