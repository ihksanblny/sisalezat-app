import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { ChevronLeft, Trash2, Package } from 'lucide-react-native';
import { getMyFoodItems, deleteFoodItem } from '../lib/services/food';
import { FoodItem } from '../lib/types';
import { COLORS } from '../styles/theme';
import { styles } from '../styles/screens/MyPostsScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MyPostsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMyPosts = useCallback(async () => {
    setLoading(true);
    const data = await getMyFoodItems();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handleDelete = (item: FoodItem) => {
    Alert.alert(
      'Hapus Postingan?',
      `Yakin ingin menghapus "${item.name}"? Aksi ini tidak bisa dibatalkan.`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            setDeletingId(item.id);
            try {
              await deleteFoodItem(item.id);
              setItems(prev => prev.filter(i => i.id !== item.id));
            } catch (e) {
              Alert.alert('Gagal', 'Postingan tidak bisa dihapus.');
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: FoodItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardStore}>{item.store_name}</Text>
        <View style={styles.cardMeta}>
          <Text style={styles.cardPrice}>Rp {item.discount_price.toLocaleString()}</Text>
          <Text style={[styles.cardStock, item.stock <= 0 && styles.cardStockEmpty]}>
            Sisa {item.stock}
          </Text>
        </View>
      </View>
      {/* Tombol Hapus */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
        disabled={deletingId === item.id}
      >
        {deletingId === item.id
          ? <ActivityIndicator color={COLORS.primary} size="small" />
          : <Trash2 color={COLORS.primary} size={20} />
        }
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.primary} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Postingan Saya</Text>
      </View>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.centerBox}>
          <Package color={COLORS.grayMedium} size={60} />
          <Text style={styles.emptyText}>Belum ada postingan</Text>
          <Text style={styles.emptySubtext}>Tap tombol + untuk mulai berbagi makanan!</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

