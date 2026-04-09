import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from '../theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  scrollContent: {
    paddingBottom: 120,
  },
  
  // IMMERSIVE STITCH HEADER
  heroSection: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: SPACING.l,
    borderBottomLeftRadius: RADIUS.l,
    borderBottomRightRadius: RADIUS.l,
    ...SHADOWS.medium,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.accent,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  nameArea: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    ...TYPOGRAPHY.display,
    fontSize: 24,
    color: COLORS.white,
  },
  userEmail: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },

  // STATS ROW (STITCH STYLE)
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: RADIUS.m,
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.display,
    fontSize: 18,
    color: COLORS.white,
  },
  statLabel: {
    ...TYPOGRAPHY.label,
    fontSize: 8,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },

  // CONTENT SECTIONS
  sectionContainer: {
    paddingHorizontal: SPACING.l,
    marginTop: 30,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingLeft: 4,
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.accent,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.l,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    ...TYPOGRAPHY.subheadline,
    fontSize: 15,
    color: COLORS.primary,
  },

  // LOGOUT BUTTON
  logoutContainer: {
    paddingHorizontal: SPACING.l,
    marginTop: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ffdbd0',
    padding: 18,
    borderRadius: RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    ...TYPOGRAPHY.label,
    color: '#4c1000',
    fontSize: 13,
  },
});
