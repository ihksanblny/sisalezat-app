import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, Star } from 'lucide-react-native';
import { useFavorites } from '../hooks/useFavorites';
import { COLORS } from '../styles/theme';
import { styles } from '../styles/components/FoodCard.styles';

const { width } = Dimensions.get('window');

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
        
        {item.stock > 0 && (
           <View style={styles.badgeTopLeft}>
             <Text style={styles.badgeText}>Sisa {item.stock}</Text>
           </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.label}>Mulai Dari</Text>
        <Text style={styles.price}>Rp {item.discount_price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};