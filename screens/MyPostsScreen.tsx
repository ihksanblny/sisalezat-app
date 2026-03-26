import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { ChevronLeft, Trash2, Package } from 'lucide-react-native';
import { getMyFoodItems, deleteFoodItem } from '../lib/services/food';
import { FoodItem } from '../lib/types';
import { COLORS } from '../styles/theme';
import { StyleSheet } from 'react-native';

export default function MyPostsScreen({ navigation }: any) {
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
          : <Trash2 color={COLORS.primary} size={22} />
        }
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Postingan Saya</Text>
        <View style={{ width: 28 }} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  list: { padding: 16 },
  card: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 16, marginBottom: 14, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  cardImage: { width: 80, height: 80 },
  cardContent: { flex: 1, padding: 12 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
  cardStore: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  cardPrice: { fontSize: 14, fontWeight: 'bold', color: COLORS.primary },
  cardStock: { fontSize: 12, color: COLORS.textLight },
  cardStockEmpty: { color: '#FF6B6B', fontWeight: 'bold' },
  deleteButton: { padding: 16 },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginTop: 16 },
  emptySubtext: { fontSize: 14, color: COLORS.textLight, marginTop: 8, textAlign: 'center' },
});
