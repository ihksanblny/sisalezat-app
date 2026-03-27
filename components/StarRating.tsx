import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Star } from 'lucide-react-native';
import { styles } from '../styles/components/StarRating.styles';
import { useRating } from '../hooks/useRating';

interface Props {
  itemId: string;
  avgRating?: number;
  ratingCount?: number;
  // Mode: 'interactive' = bisa klik (DetailScreen), 'display' = hanya tampil (FoodCard)
  mode?: 'interactive' | 'display';
  displayRating?: number; // untuk mode display
}

const STAR_COLOR_FILLED = '#FFD93D';
const STAR_COLOR_EMPTY = '#DDD';

export const StarRating = ({
  itemId,
  avgRating = 0,
  ratingCount = 0,
  mode = 'display',
  displayRating,
}: Props) => {
  const { myRating, submitting, loadingRating, handleRate } = useRating(itemId);

  const ratingToShow = mode === 'interactive'
    ? (myRating ?? 0)
    : (displayRating ?? avgRating);

  if (mode === 'display') {
    // Tampilan ringkas di FoodCard
    return (
      <View style={styles.summary}>
        <Star size={12} color={STAR_COLOR_FILLED} fill={STAR_COLOR_FILLED} />
        <Text style={styles.avgText}>
          {avgRating > 0 ? avgRating.toFixed(1) : '-'}
        </Text>
        {ratingCount > 0 && (
          <Text style={styles.countText}>({ratingCount})</Text>
        )}
      </View>
    );
  }

  // Mode interaktif di DetailScreen
  if (loadingRating) return <ActivityIndicator size="small" color={STAR_COLOR_FILLED} />;

  return (
    <View style={styles.container}>
      {/* Bintang rata-rata di atas */}
      <View style={styles.summary}>
        <Star size={14} color={STAR_COLOR_FILLED} fill={STAR_COLOR_FILLED} />
        <Text style={styles.avgText}>
          {avgRating > 0 ? `${avgRating.toFixed(1)} / 5` : 'Belum ada rating'}
        </Text>
        {ratingCount > 0 && (
          <Text style={styles.countText}>dari {ratingCount} ulasan</Text>
        )}
      </View>

      {/* Bintang klik untuk beri rating */}
      <View style={[styles.starsRow, { marginTop: 10 }]}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRate(star)}
            disabled={submitting}
          >
            <Star
              size={32}
              color={star <= ratingToShow ? STAR_COLOR_FILLED : STAR_COLOR_EMPTY}
              fill={star <= ratingToShow ? STAR_COLOR_FILLED : 'transparent'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.ratingLabel}>
        {submitting
          ? 'Menyimpan...'
          : myRating
          ? `Anda memberi ${myRating} bintang — tap lagi untuk ubah`
          : 'Tap bintang untuk memberi rating'}
      </Text>
    </View>
  );
};
