import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { getFavoriteItems } from '../lib/services/favorite';
import { FoodCard } from '../components/Foodcard';
import { COLORS } from '../styles/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../styles/screens/FavoritesScreen.styles';

export default function FavoritesScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await getFavoriteItems();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.primary} size={28} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.title}>Makanan Favorit</Text>
          <Text style={styles.brandSub}>Saved Collection</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIconCircle}>
            <Heart size={40} color={COLORS.accent} fill={COLORS.accent} />
          </View>
          <Text style={styles.emptyTitle}>Your heart is empty</Text>
          <Text style={styles.emptySub}>Sukai makanan premium yang Anda inginkan untuk menyimpannya dalam koleksi pribadi.</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseText}>Jelajahi Makanan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodCard 
              item={item} 
              onPress={() => navigation.navigate('Detail', { item })} 
            />
          )}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}