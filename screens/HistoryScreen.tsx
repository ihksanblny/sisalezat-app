import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, Image, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, Ticket, CheckCircle, Clock, XCircle, QrCode, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMyClaims } from '../lib/services/claim';
import { getProfile } from '../lib/services/profile';
import { styles } from '../styles/screens/HistoryScreen.styles';
import { COLORS } from '../styles/theme';

export default function HistoryScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQris, setSelectedQris] = useState<string | null>(null);

  const fetchClaims = useCallback(async () => {
    try {
      const data = await getMyClaims();
      const claimsWithQris = await Promise.all(data.map(async (c: any) => {
        const profile = await getProfile(c.seller_id);
        return { ...c, qris_url: profile?.qris_url };
      }));
      setClaims(claimsWithQris);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchClaims(); }, [fetchClaims]));

  const StatusBadge = ({ status }: { status: string }) => {
    const isCompleted = status === 'completed';
    const isPending = status === 'pending';
    
    return (
      <View style={[styles.badge, isCompleted ? styles.badgeSuccess : isPending ? styles.badgePending : styles.badgeDanger]}>
        {isCompleted ? <CheckCircle size={11} color="#1b4332" /> : isPending ? <Clock size={11} color="#4c1000" /> : <XCircle size={11} color="#601410" />}
        <Text style={[styles.badgeText, isCompleted ? {color: '#1b4332'} : isPending ? {color: '#4c1000'} : {color: '#601410'}]}>
          {status === 'pending' ? 'Perlu Diambil' : status === 'completed' ? 'Selesai' : 'Dibatalkan'}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.primary} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Riwayat Klaim</Text>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>
      ) : claims.length === 0 ? (
        <View style={styles.empty}>
          <Ticket size={64} color={COLORS.accent} />
          <Text style={styles.emptyTitle}>Belum ada klaim</Text>
          <Text style={styles.emptySub}>Makanan yang Anda selamatkan akan muncul secara artistik di sini.</Text>
        </View>
      ) : (
        <FlatList
          data={claims}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.claimCard}>
              <Image source={{ uri: item.items?.image_url }} style={styles.itemImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.items?.name}</Text>
                <Text style={styles.storeName}>{item.items?.store_name}</Text>
                <View style={styles.timeRow}>
                  <Clock size={14} color={COLORS.textLighter} />
                  <Text style={styles.timeText}>Ambil: {item.items?.pickup_time}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <StatusBadge status={item.status} />
                  {item.status === 'pending' && item.qris_url && (
                    <TouchableOpacity 
                      onPress={() => setSelectedQris(item.qris_url)}
                      style={styles.qrisMiniButton}
                    >
                      <QrCode size={12} color={COLORS.white} />
                      <Text style={styles.qrisMiniText}>Bayar QRIS</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.priceCol}>
                <Text style={styles.price}>
                  {item.items?.discount_price > 0 
                    ? `Rp ${item.items.discount_price.toLocaleString('id-ID')}` 
                    : 'Gratis'}
                </Text>
                <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal View QRIS */}
      <Modal visible={!!selectedQris} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Scan QRIS Toko</Text>
              <TouchableOpacity onPress={() => setSelectedQris(null)}>
                <X size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            {selectedQris && <Image source={{ uri: selectedQris }} style={styles.qrisImage} resizeMode="contain" />}
            <Text style={styles.qrisHint}>Silakan scan kode di atas melalui aplikasi bank favorit Anda!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
