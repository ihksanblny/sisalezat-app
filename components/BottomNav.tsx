import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Home, Search, Heart, User } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, RADIUS, SHADOWS } from '../styles/theme';

const { width } = Dimensions.get('window');

export const BottomNav = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const tabs = [
    { name: 'Home', icon: Home },
    { name: 'Search', icon: Search },
    { name: 'Favorites', icon: Heart },
    { name: 'Profile', icon: User },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        {tabs.map((tab) => {
          const isActive = route.name === tab.name;
          const Icon = tab.icon;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => navigation.navigate(tab.name)}
            >
              <Icon 
                size={22} 
                color={isActive ? COLORS.primary : COLORS.textLighter} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30, // Melayang sesuai referensi
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.full,
    justifyContent: 'space-between',
    width: '100%',
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  activeTab: {
    // Tidak pakai background hitam di tab icon agar tetap clean sesuai home scren ref
  },
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
  }
});