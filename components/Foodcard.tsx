import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, Zap } from 'lucide-react-native';
import { useFavorites } from '../hooks/useFavorites';
import { COLORS } from '../styles/theme';
import { styles } from '../styles/screens/../../styles/components/FoodCard.styles';

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
          <Text style={styles.merchantLabel}>{item.store_name?.toUpperCase()}</Text>
          <Text style={[styles.priceText, { color: COLORS.primary, marginTop: 4 }]}>
            Rp {item.discount_price?.toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image_url }} style={styles.image} />

        {/* Floating Price Tag */}
        <View style={styles.floatingPrice}>
          <Text style={styles.priceText}>Rp {item.discount_price?.toLocaleString()}</Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity style={styles.heartButton} onPress={handleToggleLike}>
          <Heart
            size={16}
            color={isFavorite ? COLORS.accent : COLORS.primary}
            fill={isFavorite ? COLORS.accent : 'transparent'}
          />
        </TouchableOpacity>

        {/* Type Badge */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>PREMIUM SURPLUS</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.merchantLabel}>{item.store_name || 'Artisan Bakery'}</Text>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

        <View style={styles.footer}>
          {item.stock > 0 && (
            <View style={styles.stockIndicator}>
              <View style={[styles.stockDot, { backgroundColor: item.stock < 3 ? '#FF6B6B' : '#c1ecd4' }]} />
              <Text style={styles.stockText}>{item.stock} LEFT</Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Zap size={10} color={COLORS.accent} fill={COLORS.accent} />
            <Text style={[styles.stockText, { color: COLORS.accent }]}>SAVED</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};