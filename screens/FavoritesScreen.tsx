import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { getFavoriteItems } from '../lib/services/favorite';
import { FoodCard } from '../components/Foodcard';
import { COLORS } from '../styles/theme';
import { styles } from '../styles/screens/FavoritesScreen.styles';

export default function FavoritesScreen({ navigation }: any) {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Makanan Favorit</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.empty}>
          <Heart size={60} color={COLORS.grayMedium} />
          <Text style={styles.emptyTitle}>Belum ada favorit</Text>
          <Text style={styles.emptySub}>Sukai makanan yang Anda incar untuk menyimpannya di sini!</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseText}>Cari Makanan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodCard 
              item={item} 
              onPress={() => navigation.navigate('Detail', { item })} 
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}