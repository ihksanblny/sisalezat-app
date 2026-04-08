import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Soft Mist canvas
  },
  headerNav: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    alignItems: 'center',
    height: 60,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  heroImage: {
    width: width,
    height: 420,
    resizeMode: 'cover',
  },
  content: {
    backgroundColor: COLORS.background,
    marginTop: -30, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: SPACING.l,
    paddingTop: 35,
    paddingBottom: 150,
  },
  titleRow: {
    marginBottom: 8,
  },
  storeName: {
    ...TYPOGRAPHY.label,
    fontSize: 12,
    color: COLORS.accent,
    marginBottom: 6,
  },
  itemName: {
    ...TYPOGRAPHY.display,
    fontSize: 34,
    color: COLORS.primary,
    marginBottom: 20,
  },
  
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADIUS.l,
    flex: 1,
    minWidth: 140,
    ...SHADOWS.light,
  },
  infoLabel: {
    ...TYPOGRAPHY.label,
    fontSize: 10,
    color: COLORS.textLighter,
    marginBottom: 6,
  },
  infoValue: {
    ...TYPOGRAPHY.subheadline,
    fontSize: 14,
    color: COLORS.primary,
  },

  descriptionSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 12,
  },
  descriptionText: {
    ...TYPOGRAPHY.body,
    fontSize: 15,
    color: COLORS.text,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    paddingTop: 20,
    paddingBottom: 40,
    ...SHADOWS.medium,
  },
  footerOldPrice: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.textLighter,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  footerNewPrice: {
    ...TYPOGRAPHY.display,
    fontSize: 26,
    color: COLORS.primary,
  },
  orderButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    height: 56,
    borderRadius: RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  orderButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontSize: 13,
  },

  // Modal Payments
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(1, 45, 29, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.l,
    borderTopRightRadius: RADIUS.l,
    padding: SPACING.l,
    paddingBottom: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    ...TYPOGRAPHY.headline,
    fontSize: 22,
    color: COLORS.primary,
  },
  modalSubtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.textLighter,
    marginBottom: 25,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADIUS.l,
    marginBottom: 16,
    ...SHADOWS.light,
  },
  paymentIconBox: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentOptionTitle: {
    ...TYPOGRAPHY.subheadline,
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 4,
  },
  paymentOptionDesc: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    color: COLORS.textLighter,
    lineHeight: 18,
  },
});
