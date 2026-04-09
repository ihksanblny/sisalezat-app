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
    paddingTop: SPACING.m, 
    paddingBottom: 25,
  },
  backButton: { 
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.l,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    ...SHADOWS.light
  },
  title: { 
    ...TYPOGRAPHY.display,
    fontSize: 24, 
    color: COLORS.primary,
  },
  brandSub: {
    ...TYPOGRAPHY.label,
    fontSize: 10,
    color: COLORS.accent,
    marginTop: -4,
  },
  list: { 
    paddingBottom: 100 
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
  },
  empty: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 60 
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium
  },
  emptyTitle: { 
    ...TYPOGRAPHY.display,
    fontSize: 24, 
    marginTop: 25,
    color: COLORS.primary,
  },
  emptySub: { 
    ...TYPOGRAPHY.body,
    fontSize: 14, 
    color: COLORS.textLighter, 
    textAlign: 'center', 
    marginTop: 10,
  },
  browseButton: { 
    marginTop: 35, 
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 24, 
    paddingVertical: 14, 
    borderRadius: RADIUS.m,
    ...SHADOWS.medium
  },
  browseText: { 
    ...TYPOGRAPHY.label,
    color: COLORS.white, 
    fontSize: 12,
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});
