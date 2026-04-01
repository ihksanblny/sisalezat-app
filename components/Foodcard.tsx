import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart, Star } from 'lucide-react-native';
import { useFavorites } from '../hooks/useFavorites';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../styles/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (SPACING.l * 2) - SPACING.m) / 2;

export const FoodCard = ({ item, onPress, horizontal = false }: any) => {
  const { isFavorite, toggleFavorite } = useFavorites(item.id);

  const handleToggleLike = (e: any) => {
    e.stopPropagation();
    toggleFavorite();
  };

  if (horizontal) {
    return (
      <TouchableOpacity style={styles.hCard} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: item.image_url }} style={styles.hImage} />
        <View style={styles.hContent}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.hStore}>{item.store_name}</Text>
          <View style={styles.hFooter}>
            <Text style={styles.hPrice}>Rp {item.discount_price.toLocaleString()}</Text>
            <View style={styles.ratingRow}>
              <Star size={10} color="#000" fill="#000" />
              <Text style={styles.ratingText}>{item.avg_rating?.toFixed(1) || '0.0'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <TouchableOpacity style={styles.heartButton} onPress={handleToggleLike}>
          <Heart 
            size={16} 
            color={isFavorite ? COLORS.accent : COLORS.primary} 
            fill={isFavorite ? COLORS.accent : 'transparent'} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.label}>Mulai Dari</Text>
        <Text style={styles.price}>Rp {item.discount_price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // GRID CARD (Vertical)
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.l,
    width: CARD_WIDTH,
    marginBottom: SPACING.m,
    padding: 10,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F8F9FA',
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH - 20,
    borderRadius: RADIUS.m,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  label: {
    fontSize: 10,
    color: COLORS.textLighter,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 2,
  },

  // HORIZONTAL CARD
  hCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.m,
    padding: 10,
    marginBottom: SPACING.s,
    marginHorizontal: SPACING.l,
    ...SHADOWS.light,
    alignItems: 'center',
  },
  hImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.grayLight,
  },
  hContent: {
    flex: 1,
    marginLeft: 15,
  },
  hStore: {
    fontSize: 11,
    color: COLORS.textLighter,
    marginTop: 2,
  },
  hFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  hPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});