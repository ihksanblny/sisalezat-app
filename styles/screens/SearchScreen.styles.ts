import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

  // Search bar atas
  topBar: {
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.m,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.m,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.text },

  // Filter chips — FIX: height terkontrol
  filtersContainer: {
    paddingVertical: 12,
    paddingLeft: SPACING.l,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 36,                  // 🔑 fixed height
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: 8,
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',     // 🔑 jangan stretch
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  chipTextActive: { color: COLORS.white, fontWeight: '700' },

  // Riwayat pencarian
  recentSection: { paddingHorizontal: SPACING.l, paddingTop: SPACING.m },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  clearText: { fontSize: 13, color: COLORS.primary },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recentText: { fontSize: 15, color: COLORS.text },

  // Hasil pencarian
  resultList: { paddingHorizontal: SPACING.l, paddingTop: 8, paddingBottom: 100 },
  resultCount: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 10,
    fontWeight: '500',
  },

  // State kosong & placeholder
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  emoji: { fontSize: 60, marginBottom: 14 },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
});