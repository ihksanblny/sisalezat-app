import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, Image, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { ChevronLeft, MapPin, Clock, Share2, User, CreditCard, Banknote, X, Leaf } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Hooks & Styles
import { useFoodDetail } from '../hooks/useFoodDetail';
import { styles } from '../styles/screens/DetailScreen.styles';
import { getProfile } from '../lib/services/profile';
import { Profile } from '../lib/types';
import { COLORS } from '../styles/theme';
import { StarRating } from '../components/StarRating';

export default function DetailScreen({ route, navigation }: any) {
  const insets = useSafeAreaInsets();
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
    <View style={styles.container}>
      {/* FLOATING HEADER */}
      <View style={[styles.headerNav, { top: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.iconCircle}><ChevronLeft color={COLORS.primary} size={24} /></View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconCircle}><Share2 color={COLORS.primary} size={20} /></View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.image_url }} style={styles.heroImage} />
        
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.storeName}>{item.store_name || 'Artisan Bakery'}</Text>
          </View>
          <Text style={styles.itemName}>{item.name}</Text>

          {/* INFO GRID (The Editorial Principle) */}
          <View style={styles.infoGrid}>
             <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Distance</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                   <MapPin size={14} color={COLORS.primary} />
                   <Text style={styles.infoValue}>1.2 km away</Text>
                </View>
             </View>
             <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Pickup Time</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                   <Clock size={14} color={COLORS.primary} />
                   <Text style={styles.infoValue}>{item.pickup_time}</Text>
                </View>
             </View>
             <View style={[styles.infoCard, currentStock < 3 && { backgroundColor: '#FFDBD0' }]}>
                <Text style={styles.infoLabel}>Availability</Text>
                <Text style={[styles.infoValue, currentStock < 3 && { color: '#4C1000' }]}>
                   {currentStock === 0 ? 'Habis Terjual' : `Hanya ${currentStock} Sisa`}
                </Text>
             </View>
          </View>

          {/* MEET THE ARTISAN */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Meet the Artisan</Text>
            {poster && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                {poster.avatar_url
                  ? <Image source={{ uri: poster.avatar_url }} style={{ width: 44, height: 44, borderRadius: 22 }} />
                  : <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
                      <User size={20} color={COLORS.primary} />
                    </View>
                }
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: COLORS.primary }}>{poster.display_name || 'Premium Merchant'}</Text>
                  <Text style={{ fontSize: 13, color: COLORS.textLighter }}>Verified Trusted Seller</Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About this Rescue</Text>
            <Text style={styles.descriptionText}>
              Bantu selamatkan {item.name}! Paket makanan premium ini menunggu untuk dinikmati dengan kualitas yang tetap terjaga. Setiap pembelian berkontribusi langsung pada pengurangan limbah makanan di kota Anda.
            </Text>
          </View>

          {/* SUSTAINABILITY HIGHLIGHT */}
          <View style={[styles.infoCard, { flexDirection: 'row', gap: 15, marginBottom: 40, backgroundColor: '#c1ecd4' }]}>
             <Leaf color="#002114" />
             <View>
                <Text style={{ fontSize: 14, fontWeight: '900', color: '#002114' }}>Eco-Friendly Choice</Text>
                <Text style={{ fontSize: 12, color: '#002114', opacity: 0.7 }}>Saving this meal reduces approx. 2.5kg of CO2.</Text>
             </View>
          </View>

          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Rate Experience</Text>
            <StarRating
              itemId={item.id}
              avgRating={item.avg_rating}
              ratingCount={item.rating_count}
              mode="interactive"
            />
          </View>
        </View>
      </ScrollView>

      {/* FOOTER PESAN (Editorial Floating) */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerOldPrice}>Rp {item.original_price?.toLocaleString()}</Text>
          <Text style={styles.footerNewPrice}>Rp {item.discount_price?.toLocaleString()}</Text>
        </View>
        <TouchableOpacity 
            style={[styles.orderButton, currentStock <= 0 && { backgroundColor: COLORS.grayMedium }]} 
            onPress={() => setShowPaymentModal(true)}
            disabled={isBooking || currentStock <= 0}
        >
          {isBooking ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.orderButtonText}>
              {currentStock <= 0 ? 'SOLD OUT' : 'GIVE A NEW HOME'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* PAYMENT MODAL (Premium Stitch Style) */}
      <Modal visible={showPaymentModal} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Secure this Meal</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <X color={COLORS.primary} size={28} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>Pilih langkah terbaik untuk menjemput lezatnya hari ini.</Text>

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
                <Text style={styles.paymentOptionTitle}>Bayar Saat Jemput (COD)</Text>
                <Text style={styles.paymentOptionDesc}>Serahkan pembayaran saat Anda tiba di lokasi.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.paymentOption} 
              onPress={() => {
                if (!poster?.qris_url) {
                  Alert.alert('Info', 'Artisan ini belum mendaftarkan QRIS. Gunakan metode Jemput & Bayar (COD).');
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
                <Text style={styles.paymentOptionTitle}>Digital Payment (QRIS)</Text>
                <Text style={styles.paymentOptionDesc}>Scan kode QRIS toko untuk transaksi tanpa repot.</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}