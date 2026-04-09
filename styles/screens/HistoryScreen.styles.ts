import { StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.m,
    backgroundColor: COLORS.background,
    gap: 16,
  },
  backButton: { 
    width: 52,
    height: 52,
    borderRadius: RADIUS.l,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  title: { 
    ...TYPOGRAPHY.display,
    fontSize: 22, 
    color: COLORS.primary 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  empty: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 60 
  },
  emptyTitle: { 
    ...TYPOGRAPHY.display,
    fontSize: 24, 
    color: COLORS.primary, 
    marginTop: 25 
  },
  emptySub: { 
    ...TYPOGRAPHY.body,
    fontSize: 14, 
    color: COLORS.textLighter, 
    textAlign: 'center', 
    marginTop: 10 
  },
  list: { 
    paddingHorizontal: SPACING.l,
    paddingBottom: 100 
  },
  claimCard: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.white, 
    borderRadius: RADIUS.l, 
    padding: 16, 
    marginBottom: 16, 
    alignItems: 'center',
    ...SHADOWS.light 
  },
  itemImage: { 
    width: 70, 
    height: 70, 
    borderRadius: RADIUS.m, 
    backgroundColor: COLORS.surfaceVariant 
  },
  cardInfo: { 
    flex: 1, 
    marginLeft: 16, 
    gap: 4 
  },
  itemName: { 
    ...TYPOGRAPHY.subheadline,
    fontSize: 15, 
    color: COLORS.primary 
  },
  storeName: { 
    ...TYPOGRAPHY.label,
    fontSize: 9, 
    color: COLORS.accent 
  },
  timeRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6,
    marginTop: 4
  },
  timeText: { 
    ...TYPOGRAPHY.body,
    fontSize: 12, 
    color: COLORS.textLighter 
  },
  priceCol: { 
    alignItems: 'flex-end', 
    marginLeft: 12 
  },
  price: { 
    ...TYPOGRAPHY.headline,
    fontSize: 14, 
    color: COLORS.primary 
  },
  date: { 
    ...TYPOGRAPHY.label,
    fontSize: 8, 
    color: COLORS.textLighter, 
    marginTop: 6 
  },
  badge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 8, 
    gap: 4, 
    marginTop: 6 
  },
  badgeSuccess: { backgroundColor: '#c1ecd4' },
  badgePending: { backgroundColor: '#ffdbd0' },
  badgeDanger: { backgroundColor: '#fad8d8' },
  badgeText: { 
    ...TYPOGRAPHY.label,
    fontSize: 9, 
  },
  qrisMiniButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    marginTop: 6, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: RADIUS.m, 
    backgroundColor: COLORS.primary,
    ...SHADOWS.light
  },
  qrisMiniText: { 
    ...TYPOGRAPHY.label,
    fontSize: 9, 
    color: COLORS.white, 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(1, 45, 29, 0.4)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  modalContent: { 
    backgroundColor: COLORS.background, 
    borderRadius: RADIUS.l, 
    padding: 25, 
    width: '100%', 
    alignItems: 'center',
    ...SHADOWS.medium
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 20 
  },
  modalTitle: { 
    ...TYPOGRAPHY.headline,
    fontSize: 18, 
    color: COLORS.primary 
  },
  qrisImage: { 
    width: 280, 
    height: 350, 
    backgroundColor: '#FFF',
    borderRadius: RADIUS.m,
  },
  qrisHint: { 
    ...TYPOGRAPHY.body,
    fontSize: 12, 
    color: COLORS.textLighter, 
    textAlign: 'center', 
    marginTop: 20, 
    lineHeight: 18 
  }
});
