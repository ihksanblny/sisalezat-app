import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  searchContainer: { backgroundColor: COLORS.white, borderRadius: RADIUS.m, paddingHorizontal: SPACING.m, marginVertical: SPACING.m, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 45 },
});
