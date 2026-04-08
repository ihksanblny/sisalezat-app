import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from '../theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  header: { 
    padding: SPACING.xl, 
    alignItems: 'center', 
    backgroundColor: COLORS.background, 
    paddingBottom: 40 
  },

  // Avatar
  avatarContainer: { 
    width: 100, 
    height: 100, 
    marginBottom: 20, 
    position: 'relative' 
  },
  avatarImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    ...SHADOWS.medium,
    borderWidth: 0,
  },
  avatarPlaceholder: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: COLORS.white, 
    justifyContent: 'center', 
    alignItems: 'center', 
    ...SHADOWS.light 
  },
  cameraIcon: { 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: COLORS.primary, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 3, 
    borderColor: COLORS.background 
  },

  // Nama
  nameRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 6 
  },
  userName: { 
    ...TYPOGRAPHY.display,
    fontSize: 26, 
    color: COLORS.primary 
  },
  editRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 6 
  },
  nameInput: { 
    ...TYPOGRAPHY.headline,
    fontSize: 22, 
    color: COLORS.primary, 
    borderBottomWidth: 2, 
    borderBottomColor: COLORS.accent, 
    paddingBottom: 4, 
    minWidth: 150 
  },
  editAction: { 
    padding: 8, 
    marginLeft: 10 
  },

  userEmail: { 
    ...TYPOGRAPHY.body,
    fontSize: 14, 
    color: COLORS.textLighter 
  },

  // Menu Section (Artisanal Style)
  menuSection: { 
    paddingHorizontal: SPACING.l, 
    marginTop: 10 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 18, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(0,0,0,0.03)' 
  },
  menuIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 14, 
    backgroundColor: COLORS.white, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 16,
    ...SHADOWS.light 
  },
  menuText: { 
    flex: 1, 
    ...TYPOGRAPHY.subheadline,
    fontSize: 15, 
    color: COLORS.primary 
  },

  // Logout
  logoutButton: { 
    margin: SPACING.l, 
    marginTop: 40, 
    flexDirection: 'row', 
    backgroundColor: '#ffdbd0', // tertiary_fixed
    padding: 20, 
    borderRadius: RADIUS.m, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 120,
  },
  logoutText: { 
    ...TYPOGRAPHY.label,
    color: '#4c1000', 
    fontSize: 14, 
    marginLeft: 10 
  },
});
