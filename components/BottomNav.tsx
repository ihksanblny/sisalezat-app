import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Home, Search, PlusCircle, User } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/components/BottomNav.styles';
import { COLORS } from '../styles/theme';

export const BottomNav = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  // Fungsi untuk mengecek apakah tab sedang aktif
  const isActive = (screenName: string) => route.name === screenName;

  return (
    <View style={styles.bottomNav}>
      {/* Tombol Home */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Home')}
      >
        <Home color={isActive('Home') ? COLORS.primary : COLORS.grayMedium} size={28} />
      </TouchableOpacity>

      {/* Tombol Cari (Sementara ke Home) */}
      <TouchableOpacity style={styles.navItem}>
        <Search color={COLORS.grayMedium} size={28} />
      </TouchableOpacity>

      {/* Tombol TAMBAH (Halaman Merchant) */}
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Merchant')}
      >
        <PlusCircle color={isActive('Merchant') ? COLORS.primary : COLORS.grayMedium} size={32} />
      </TouchableOpacity>

      {/* Tombol Profil (Sementara Placeholder) */}
      <TouchableOpacity style={styles.navItem}>
        <User color={COLORS.grayMedium} size={28} />
      </TouchableOpacity>
    </View>
  );
};