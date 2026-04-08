import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, StyleSheet, Alert } from 'react-native';
import { ChevronLeft, MapPin, Clock, Share2, User, CreditCard, Banknote, X } from 'lucide-react-native';
// Hooks & Styles
import { useFoodDetail } from '../hooks/useFoodDetail';
import { styles } from '../styles/screens/DetailScreen.styles';
import { getProfile } from '../lib/services/profile';
import { Profile } from '../lib/types';
import { COLORS } from '../styles/theme';
import { StarRating } from '../components/StarRating';

export default function DetailScreen({ route, navigation }: any) {
  const { item } = route.params;
  const { isBooking, currentStock, handleClaim } = useFoodDetail(item);
  const [poster, setPoster] = useState<Profile | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (item.user_id) {
      getProfile(item.user_id).then(setPoster);
    }
  }, [item.user_id]);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER NAV */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconCircle}><ChevronLeft color="#222" /></View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconCircle}><Share2 color="#222" size={20} /></View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.image_url }} style={styles.heroImage} />
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.storeName}>{item.store_name}</Text>
            <StarRating
              itemId={item.id}
              avgRating={item.avg_rating}
              ratingCount={item.rating_count}
              mode="display"
            />
          </View>
          <Text style={styles.itemName}>{item.name}</Text>

          {/* Profil Penjual */}
          {poster && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, padding: 12, backgroundColor: COLORS.background, borderRadius: 12 }}>
              {poster.avatar_url
                ? <Image source={{ uri: poster.avatar_url }} style={{ width: 38, height: 38, borderRadius: 19 }} />
                : <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.grayLight, justifyContent: 'center', alignItems: 'center' }}>
                    <User size={20} color={COLORS.grayMedium} />
                  </View>
              }
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 12, color: COLORS.textLight }}>Dijual oleh</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.text }}>{poster.display_name || 'Penjual'}</Text>
              </View>
            </View>
          )}
          <View style={styles.badgeRow}>
            <View style={styles.badge}><MapPin size={14} color="#666" /><Text style={styles.badgeText}>1.2 km</Text></View>
            <View style={styles.badge}><Clock size={14} color="#666" /><Text style={styles.badgeText}>Ambil: {item.pickup_time}</Text></View>
            <View style={[styles.badge, currentStock < 3 && { backgroundColor: '#FFF5F5' }]}>
                <Text style={[styles.badgeText, currentStock < 3 && { color: '#FF6B6B', fontWeight: 'bold' }]}>Sisa: {currentStock}</Text>
            </View>
          </View>
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.descriptionText}>
              Nikmati paket makanan lezat yang kami selamatkan hari ini. Kualitas masih terjaga 100%. Dengan membeli ini, Anda sudah membantu mengurangi limbah makanan!
            </Text>
          </View>

          {/* Rating Interaktif */}
          <View style={[styles.descriptionSection, { alignItems: 'center' }]}>
            <Text style={styles.sectionTitle}>Beri Rating</Text>
            <StarRating
              itemId={item.id}
              avgRating={item.avg_rating}
              ratingCount={item.rating_count}
              mode="interactive"
            />
          </View>
        </View>
      </ScrollView>

      {/* FOOTER PESAN */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerOldPrice}>Rp {item.original_price.toLocaleString()}</Text>
          <Text style={styles.footerNewPrice}>Rp {item.discount_price.toLocaleString()}</Text>
        </View>
        <TouchableOpacity 
            style={[styles.orderButton, currentStock <= 0 && { backgroundColor: '#CCC' }]} 
            onPress={() => setShowPaymentModal(true)}
            disabled={isBooking || currentStock <= 0}
        >
          {isBooking ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.orderButtonText}>
              {currentStock <= 0 ? 'Habis Terjual' : 'Simpan Makanan!'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* MODAL PILIHAN PEMBAYARAN */}
      <Modal visible={showPaymentModal} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Metode Pembayaran</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <X color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>Pilih cara Anda membayar makanan ini saat pengambilan nanti.</Text>

            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => {
                setShowPaymentModal(false);
                handleClaim(() => navigation.goBack(), 'cod');
              }}
            >
              <View style={[styles.paymentIconBox, { backgroundColor: '#E3F2FD' }]}>
                <Banknote color="#1976D2" size={24} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.paymentOptionTitle}>Bayar di Tempat (COD)</Text>
                <Text style={styles.paymentOptionDesc}>Bayar tunai saat mengambil makanan di lokasi.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => {
                if (!poster?.qris_url) {
                  Alert.alert('Info', 'Toko ini belum mendaftarkan QRIS. Silakan gunakan metode COD.');
                  return;
                }
                setShowPaymentModal(false);
                handleClaim(() => navigation.goBack(), 'qris');
              }}
            >
              <View style={[styles.paymentIconBox, { backgroundColor: '#F3E5F5' }]}>
                <CreditCard color="#7B1FA2" size={24} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.paymentOptionTitle}>Scan QRIS Toko</Text>
                <Text style={styles.paymentOptionDesc}>Bayar lewat aplikasi bank/e-wallet sebelum ambil.</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}