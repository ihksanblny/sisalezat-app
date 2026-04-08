import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, ShoppingBag, CheckCircle, Clock } from 'lucide-react-native';
import { getIncomingClaims, updateClaimStatus } from '../lib/services/claim';
import { COLORS, SPACING, RADIUS } from '../styles/theme';

import { styles } from '../styles/screens/IncomingOrdersScreen.styles';

export default function IncomingOrdersScreen({ navigation }: any) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await getIncomingClaims();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchOrders(); }, [fetchOrders]));

  const handleComplete = (claimId: string, itemName: string) => {
    Alert.alert(
      'Selesaikan Pesanan?',
      `Pastikan ${itemName} sudah diberikan ke pembeli.`,
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Sudah Diambil', 
          onPress: async () => {
            try {
              await updateClaimStatus(claimId, 'completed');
              fetchOrders();
            } catch {
              Alert.alert('Gagal', 'Tidak bisa mengubah status pesanan.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Pesanan Masuk</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>
      ) : orders.length === 0 ? (
        <View style={styles.empty}>
          <ShoppingBag size={64} color={COLORS.grayMedium} />
          <Text style={styles.emptyTitle}>Belum ada pesanan</Text>
          <Text style={styles.emptySub}>Pesanan dari pembeli akan muncul di sini saat mereka melakukan klaim.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image source={{ uri: item.profiles?.avatar_url }} style={styles.avatar} />
                <View style={styles.buyerInfo}>
                  <Text style={styles.buyerName}>{item.profiles?.display_name || 'Pembeli'}</Text>
                  <Text style={styles.orderDate}>{new Date(item.created_at).toLocaleString('id-ID')}</Text>
                </View>
                <View style={[styles.statusTag, item.status === 'completed' ? styles.statusTextSuccess : styles.statusTextPending]}>
                   <Text style={[styles.statusText, item.status === 'completed' ? {color: '#2D6A4F'} : {color: '#856404'}]}>
                     {item.status === 'completed' ? 'Selesai' : 'Pending'}
                   </Text>
                </View>
              </View>

              <View style={styles.itemRow}>
                <Image source={{ uri: item.items?.image_url }} style={styles.itemImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.items?.name}</Text>
                  <Text style={[styles.pickupTime, { fontWeight: 'bold', color: COLORS.primary }]}>
                    {item.items?.discount_price > 0 ? `Rp ${item.items.discount_price.toLocaleString('id-ID')}` : 'Gratis'}
                  </Text>
                  <Text style={styles.pickupTime}>Waktu: {item.items?.pickup_time}</Text>
                </View>
              </View>

              {item.status === 'pending' && (
                <TouchableOpacity 
                  style={styles.completeButton} 
                  onPress={() => handleComplete(item.id, item.items?.name)}
                >
                  <CheckCircle size={18} color={COLORS.white} />
                  <Text style={styles.completeText}>Konfirmasi Pengambilan</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
