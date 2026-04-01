import { StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.white 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: SPACING.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white
  },
  backButton: { 
    padding: 8 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.text 
  },
  list: { 
    padding: SPACING.l,
    paddingBottom: 100 // Spasi untuk BottomNav
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
    padding: 40 
  },
  emptyTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: COLORS.text, 
    marginTop: 15 
  },
  emptySub: { 
    fontSize: 14, 
    color: COLORS.textLight, 
    textAlign: 'center', 
    marginTop: 8,
    lineHeight: 20
  },
  browseButton: { 
    marginTop: 25, 
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 30, 
    paddingVertical: 12, 
    borderRadius: RADIUS.m,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  browseText: { 
    color: COLORS.white, 
    fontWeight: 'bold' 
  }
});
