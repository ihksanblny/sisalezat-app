import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (SPACING.l * 2) - SPACING.m) / 2;

export const styles = StyleSheet.create({
  // GRID CARD (Editorial Style)
  card: {
    backgroundColor: COLORS.white, // Pop against Soft Mist background
    borderRadius: RADIUS.l,
    width: CARD_WIDTH,
    marginBottom: SPACING.l,
    padding: 12,
    ...SHADOWS.light,
    // NO BORDERS as per Stitch Design System
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH - 24,
    borderRadius: RADIUS.m,
    overflow: 'hidden',
    backgroundColor: COLORS.surfaceVariant,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)', // Solid semi-transparent white
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  badgeTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.primary, // Deep Forest Green
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.s,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 16,
    alignItems: 'flex-start', // Editorial: Left align
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 20,
  },
  label: {
    fontSize: 11,
    color: COLORS.textLighter,
    marginTop: 6,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary, // Focus with forest green
    marginTop: 2,
  },

  // HORIZONTAL CARD (List Style)
  hCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.l,
    padding: 14,
    marginBottom: SPACING.m,
    marginHorizontal: SPACING.l,
    ...SHADOWS.light,
    alignItems: 'center',
  },
  hImage: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.surfaceVariant,
  },
  hContent: {
    flex: 1,
    marginLeft: 18,
  },
  hStore: {
    fontSize: 12,
    color: COLORS.textLighter,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  hPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});