import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.l, 
    paddingTop: SPACING.m, // Added breathing room here
    paddingBottom: 20,
    gap: 12
  },
  backButton: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.l,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: RADIUS.l,
    paddingLeft: 16,
    paddingRight: 8,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  searchIcon: { marginRight: 12 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: 'Inter-Regular',
    paddingVertical: 0, 
    textAlignVertical: 'center',
    includeFontPadding: false, // Android specific style
  },
  
  filterSection: { marginBottom: 25 },
  filterList: { paddingHorizontal: SPACING.l },
  filterChip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.surfaceContainer,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.light,
  },
  filterText: {
    ...TYPOGRAPHY.subheadline,
    fontSize: 14,
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: COLORS.white,
    fontFamily: 'Inter-Bold',
  },

  resultHeader: {
    paddingHorizontal: SPACING.l,
    marginBottom: 20,
  },
  resultTitle: {
    ...TYPOGRAPHY.label,
    fontSize: 12,
    color: COLORS.accent,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
  },
  listContainer: {
    paddingBottom: 50,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyState: { flex: 1, alignItems: 'center', marginTop: 80, paddingHorizontal: 40 },
  emptyText: { 
    ...TYPOGRAPHY.body,
    fontSize: 16, 
    color: COLORS.textLighter, 
    textAlign: 'center',
  },
});