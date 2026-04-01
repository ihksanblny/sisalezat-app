import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, Ticket, CheckCircle, Clock, XCircle, QrCode, X } from 'lucide-react-native';
import { getMyClaims } from '../lib/services/claim';
import { getProfile } from '../lib/services/profile';
import { COLORS, SPACING, RADIUS } from '../styles/theme';

export default function HistoryScreen({ navigation }: any) {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQris, setSelectedQris] = useState<string | null>(null);

  const fetchClaims = useCallback(async () => {
    try {
      const data = await getMyClaims();
      // Ambil profile seller untuk tiap claim agar dapat qris_url
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
        {isCompleted ? <CheckCircle size={12} color="#2D6A4F" /> : isPending ? <Clock size={12} color="#856404" /> : <XCircle size={12} color="#721C24" />}
        <Text style={[styles.badgeText, isCompleted ? {color: '#2D6A4F'} : isPending ? {color: '#856404'} : {color: '#721C24'}]}>
          {status === 'pending' ? 'Perlu Diambil' : status === 'completed' ? 'Selesai' : 'Dibatalkan'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Riwayat Klaim</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>
      ) : claims.length === 0 ? (
        <View style={styles.empty}>
          <Ticket size={64} color={COLORS.grayMedium} />
          <Text style={styles.emptyTitle}>Belum ada klaim</Text>
          <Text style={styles.emptySub}>Makanan yang Anda simpan akan muncul di sini.</Text>
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
                      <QrCode size={14} color={COLORS.primary} />
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
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            {selectedQris && <Image source={{ uri: selectedQris }} style={styles.qrisImage} resizeMode="contain" />}
            <Text style={styles.qrisHint}>Silakan scan kode di atas untuk melakukan pembayaran melalui aplikasi bank atau e-wallet!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SPACING.l, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backButton: { padding: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginTop: 16 },
  emptySub: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginTop: 8 },
  list: { padding: SPACING.l },
  claimCard: { flexDirection: 'row', backgroundColor: '#F8F9FA', borderRadius: RADIUS.m, padding: 12, marginBottom: 15, alignItems: 'center' },
  itemImage: { width: 70, height: 70, borderRadius: RADIUS.s, backgroundColor: COLORS.grayLight },
  cardInfo: { flex: 1, marginLeft: 12, gap: 4 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  storeName: { fontSize: 12, color: COLORS.textLight },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 12, color: COLORS.textLighter },
  priceCol: { alignItems: 'flex-end', marginLeft: 8 },
  price: { fontSize: 14, fontWeight: 'bold', color: COLORS.primary },
  date: { fontSize: 10, color: COLORS.textLighter, marginTop: 4 },
  badge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4, marginTop: 4 },
  badgeSuccess: { backgroundColor: '#D1E7DD' },
  badgePending: { backgroundColor: '#FFF3CD' },
  badgeDanger: { backgroundColor: '#F8D7DA' },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  qrisMiniButton: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: COLORS.primary },
  qrisMiniText: { fontSize: 10, color: COLORS.primary, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: COLORS.white, borderRadius: RADIUS.l, padding: 20, width: '100%', alignItems: 'center' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  qrisImage: { width: 280, height: 350, backgroundColor: '#FFF' },
  qrisHint: { fontSize: 12, color: COLORS.textLight, textAlign: 'center', marginTop: 15, lineHeight: 18 }
});
