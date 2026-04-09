import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from '../theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.l, 
    paddingTop: SPACING.m,
    paddingBottom: 25,
    gap: 16
  },
  headerTitle: {
    ...TYPOGRAPHY.display,
    fontSize: 24,
    color: COLORS.primary,
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
  
  list: { 
    paddingHorizontal: SPACING.l,
    paddingBottom: 100,
  },
  card: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.white, 
    borderRadius: RADIUS.l, 
    marginBottom: 16, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    ...SHADOWS.light,
  },
  cardImage: { 
    width: 90, 
    height: 90,
  },
  cardContent: { 
    flex: 1, 
    padding: 15,
  },
  cardTitle: { 
    ...TYPOGRAPHY.headline,
    fontSize: 16, 
    color: COLORS.primary,
  },
  cardStore: { 
    ...TYPOGRAPHY.body,
    fontSize: 12, 
    color: COLORS.textLighter, 
    marginTop: 2 
  },
  cardMeta: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  cardPrice: { 
    ...TYPOGRAPHY.headline,
    fontSize: 14, 
    color: COLORS.primary,
  },
  cardStock: { 
    ...TYPOGRAPHY.label,
    fontSize: 10, 
    color: COLORS.accent,
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.s,
  },
  cardStockEmpty: { 
    color: '#FF6B6B', 
    fontWeight: 'bold' 
  },
  deleteButton: { 
    padding: 15,
    marginRight: 5,
  },
  
  centerBox: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 40 
  },
  emptyText: { 
    ...TYPOGRAPHY.display,
    fontSize: 20, 
    color: COLORS.primary, 
    marginTop: 16 
  },
  emptySubtext: { 
    ...TYPOGRAPHY.body,
    fontSize: 14, 
    color: COLORS.textLighter, 
    marginTop: 8, 
    textAlign: 'center' 
  },
});
