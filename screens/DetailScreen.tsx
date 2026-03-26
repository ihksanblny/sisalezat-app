import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ChevronLeft, MapPin, Clock, Star, Share2, User } from 'lucide-react-native';
// Hooks & Styles
import { useFoodDetail } from '../hooks/useFoodDetail';
import { styles } from '../styles/screens/DetailScreen.styles';
import { getProfile } from '../lib/services/profile';
import { Profile } from '../lib/types';
import { COLORS } from '../styles/theme';

export default function DetailScreen({ route, navigation }: any) {
  const { item } = route.params;
  const { isBooking, currentStock, handleClaim } = useFoodDetail(item);
  const [poster, setPoster] = useState<Profile | null>(null);

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
            <View style={styles.ratingBox}>
              <Star size={16} color="#FFD93D" fill="#FFD93D" />
              <Text style={styles.ratingText}>4.8 (200+ rating)</Text>
            </View>
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
            onPress={() => handleClaim(() => navigation.goBack())}
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
    </SafeAreaView>
  );
}