import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/components/PromoBanner.styles';

export const PromoBanner = () => (
  <View style={styles.banner}>
    <Text style={styles.bannerTitle}>Hemat 70% Malam Ini!</Text>
    <Text style={styles.bannerSubtitle}>Selamatkan makanan lezat dari pembuangan.</Text>
  </View>
);