import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: SPACING.xl, alignItems: 'center', backgroundColor: COLORS.background, borderBottomLeftRadius: RADIUS.xl, borderBottomRightRadius: RADIUS.xl, paddingBottom: 40 },

  // Avatar
  avatarContainer: { width: 100, height: 100, marginBottom: 15, position: 'relative' },
  avatarImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: COLORS.white },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.grayLight, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: COLORS.white },
  cameraIcon: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.white },

  // Nama
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  userName: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  editRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  nameInput: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, borderBottomWidth: 2, borderBottomColor: COLORS.primary, paddingBottom: 4, minWidth: 150 },
  editAction: { padding: 6, marginLeft: 4 },

  userEmail: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },

  // Menu
  menuSection: { padding: SPACING.l, marginTop: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuText: { flex: 1, fontSize: 16, color: COLORS.text, fontWeight: '500' },

  // Logout
  logoutButton: { margin: SPACING.l, marginTop: 30, flexDirection: 'row', backgroundColor: '#FFF5F5', padding: 18, borderRadius: RADIUS.m, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFDADA' },
  logoutText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16, marginLeft: 10 },

  // legacy (still needed for avatarContainer use)
  grayMedium: { color: COLORS.grayMedium },
});
