import { StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme';

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
    paddingTop: 20, // Sudah diturunkan lebih lega
    paddingBottom: 20,
    backgroundColor: COLORS.background
  },
  backButton: { 
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.m,
    ...SHADOWS.light
  },
  title: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: COLORS.primary,
    letterSpacing: -0.5
  },
  brandSub: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: -2,
  },
  list: { 
    paddingBottom: 100 
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
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
    fontSize: 24, 
    fontWeight: '900', 
    color: COLORS.primary, 
    marginTop: 25 
  },
  emptySub: { 
    fontSize: 14, 
    color: COLORS.textLighter, 
    textAlign: 'center', 
    marginTop: 10,
    lineHeight: 22
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
    color: COLORS.white, 
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase'
  }
});
