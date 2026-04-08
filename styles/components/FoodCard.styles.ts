import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (SPACING.l * 2) - 16) / 2;

export const styles = StyleSheet.create({
  // THE EVOLVED "EDITORIAL ARTISAN" CARD
  card: {
    width: CARD_WIDTH,
    marginBottom: 32,
    backgroundColor: 'transparent', 
  },
  imageContainer: {
    width: '100%',
    height: 240, // More elongated for a high-fashion food magazine look
    borderRadius: RADIUS.l,
    overflow: 'hidden',
    backgroundColor: '#dde4e6',
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  // Floating Price Tag (Overlapping the image)
  floatingPrice: {
    position: 'absolute',
    bottom: 12,
    right: -6, 
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.s,
    ...SHADOWS.medium,
  },
  priceText: {
    fontFamily: 'Manrope-ExtraBold',
    color: COLORS.white,
    fontSize: 14,
    letterSpacing: -0.5,
  },

  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.95)', 
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },

  content: {
    marginTop: 16,
    paddingHorizontal: 2,
  },
  merchantLabel: {
    ...TYPOGRAPHY.label,
    fontSize: 8,
    color: COLORS.accent, 
    marginBottom: 6,
  },
  name: {
    ...TYPOGRAPHY.headline,
    fontSize: 16,
    color: COLORS.primary,
    lineHeight: 20,
    marginBottom: 10,
  },
  
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stockIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stockText: {
     ...TYPOGRAPHY.label,
     fontSize: 9,
     color: COLORS.textLighter,
  },

  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(1, 45, 29, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  typeText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontSize: 8,
  },

  // HORIZONTAL CARD (List Style Refined)
  hCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.l,
    marginHorizontal: SPACING.l,
    marginBottom: 16,
    padding: 16,
    ...SHADOWS.light,
    alignItems: 'center',
  },
  hImage: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.m,
    backgroundColor: '#dde4e6',
  },
  hContent: {
    flex: 1,
    marginLeft: 20,
  },
});