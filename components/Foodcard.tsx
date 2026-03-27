import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Clock } from 'lucide-react-native';
import { FoodItem } from '../lib/types';
import { styles } from '../styles/components/FoodCard.styles';
import { StarRating } from './StarRating';

interface Props {
  item: FoodItem;
  onPress?: () => void;
}

export const FoodCard = ({ item, onPress }: Props) => {
  const isSoldOut = item.stock <= 0;

  return (
    <TouchableOpacity
      style={[styles.card, isSoldOut && styles.cardDisabled]}
      onPress={!isSoldOut ? onPress : undefined}
      activeOpacity={isSoldOut ? 1 : 0.7}
    >
      <Image source={{ uri: item.image_url }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.storeName}>{item.store_name}</Text>
          <StarRating
            itemId={item.id}
            avgRating={item.avg_rating}
            ratingCount={item.rating_count}
            mode="display"
          />
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.infoRow}>
          <Clock size={14} color="#666" />
          <Text style={styles.infoText}>Ambil: {item.pickup_time}</Text>
        </View>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.oldPrice}>Rp {item.original_price.toLocaleString()}</Text>
            <Text style={styles.newPrice}>Rp {item.discount_price.toLocaleString()}</Text>
          </View>
          <View style={styles.stockLabel}>
            <Text style={styles.stockText}>Sisa {item.stock}</Text>
          </View>
        </View>
      </View>

      {/* Overlay SOLD OUT saat stok habis */}
      {isSoldOut && (
        <View style={styles.soldOutOverlay}>
          <View style={styles.soldOutStamp}>
            <Text style={styles.soldOutText}>HABIS</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};