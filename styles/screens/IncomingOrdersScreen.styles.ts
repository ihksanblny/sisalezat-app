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
    justifyContent: 'space-between', 
    paddingHorizontal: SPACING.l,
    paddingTop: 20,
    paddingBottom: 25,
    backgroundColor: COLORS.background,
  },
  backButton: { 
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light
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
    padding: SPACING.l,
    paddingBottom: 100 
  },
  card: { 
    backgroundColor: COLORS.white, 
    borderRadius: RADIUS.l, 
    padding: 20, 
    marginBottom: 20, 
    ...SHADOWS.light,
    // NO-LINE RULE
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  avatar: { 
    width: 42, 
    height: 42, 
    borderRadius: 21, 
    backgroundColor: COLORS.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyerInfo: { 
    flex: 1, 
    marginLeft: 12 
  },
  buyerName: { 
    ...TYPOGRAPHY.subheadline,
    fontSize: 15, 
    color: COLORS.primary 
  },
  orderDate: { 
    ...TYPOGRAPHY.label,
    fontSize: 9, 
    color: COLORS.textLighter 
  },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15, 
    paddingVertical: 15, 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(0,0,0,0.03)' 
  },
  itemImage: { 
    width: 60, 
    height: 60, 
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.surfaceVariant
  },
  itemName: { 
    ...TYPOGRAPHY.subheadline,
    fontSize: 14, 
    color: COLORS.primary 
  },
  pickupTime: { 
    ...TYPOGRAPHY.body,
    fontSize: 12, 
    color: COLORS.textLighter 
  },
  statusTag: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  statusText: { 
    ...TYPOGRAPHY.label,
    fontSize: 9, 
  },
  statusTextSuccess: { 
    backgroundColor: '#c1ecd4', // primary_fixed
  },
  statusTextPending: { 
    backgroundColor: '#ffdbd0', // tertiary_fixed
  },
  completeButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: COLORS.primary, 
    borderRadius: RADIUS.m, 
    padding: 16, 
    marginTop: 15,
    gap: 10,
    ...SHADOWS.light
  },
  completeText: { 
    ...TYPOGRAPHY.label,
    color: COLORS.white, 
    fontSize: 12 
  }
});
