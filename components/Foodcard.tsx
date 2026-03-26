import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Star, Clock } from 'lucide-react-native';
import { FoodItem } from '../lib/types';
import { styles } from '../styles/components/FoodCard.styles';

interface Props {
  item: FoodItem;
  onPress?: () => void;
}

export const FoodCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image_url }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.storeName}>{item.store_name}</Text>
          <View style={styles.ratingBox}>
            <Star size={12} color="#FFD93D" fill="#FFD93D" />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
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
    </TouchableOpacity>
  );
};