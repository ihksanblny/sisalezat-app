import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Home, Search, Heart, User, Plus } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, RADIUS, SHADOWS } from '../styles/theme';

const { width } = Dimensions.get('window');

export const BottomNav = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const tabs = [
    { name: 'Home', icon: Home },
    { name: 'Search', icon: Search },
    { name: 'Merchant', icon: Plus, special: true }, 
    { name: 'Favorites', icon: Heart },
    { name: 'Profile', icon: User },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        {tabs.map((tab) => {
          const isActive = route.name === tab.name;
          const Icon = tab.icon;

          if (tab.special) {
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.specialTab}
                onPress={() => navigation.navigate(tab.name)}
                activeOpacity={0.8}
              >
                <View style={styles.specialIconBg}>
                  <Plus size={26} color={COLORS.white} strokeWidth={3} />
                </View>
              </TouchableOpacity>
            );
          }

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
    bottom: 30, 
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: RADIUS.full,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  specialTab: {
    marginTop: -30, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialIconBg: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  activeTab: {
    // Clean state
  },
  activeDot: {
    position: 'absolute',
    bottom: -2,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
  }
});