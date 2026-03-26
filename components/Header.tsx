import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { styles } from '../styles/components/Header.styles';

export const Header = () => (
  <View style={styles.header}>
    <View>
      <Text style={styles.subtitle}>Selamat Malam,</Text>
      <Text style={styles.title}>Simpan Makanan Malam Ini? 🌙</Text>
    </View>
    <TouchableOpacity style={styles.locationTag}>
      <MapPin size={16} color="#FF6B6B" />
      <Text style={styles.locationText}>Bandung, Indo</Text>
    </TouchableOpacity>
  </View>
);