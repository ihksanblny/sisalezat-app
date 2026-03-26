import React from 'react';
import { View, ScrollView, Text, ActivityIndicator, SafeAreaView, RefreshControl } from 'react-native';

// Komponen Rapi Kita
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { PromoBanner } from '../components/PromoBanner';
import { FoodCard } from '../components/Foodcard';
import { BottomNav } from '../components/BottomNav';

// Logic & Styles
import { styles } from '../styles/screens/HomeScreen.styles';
import { useFoodItems } from '../hooks/useFoodItems';

export default function HomeScreen({ navigation }: any) {
  // Semua logika "Pintar" ada di dalam hook ini
  const { 
    items, 
    loading, 
    refreshing, 
    searchQuery, 
    setSearchQuery, 
    loadData, 
    setRefreshing 
  } = useFoodItems();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} />
        }
      >
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <PromoBanner />
        <Text style={styles.sectionTitle}>
          {searchQuery ? `Hasil: "${searchQuery}"` : 'Penyelamatan Terdekat 🏠'}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 50 }} />
        ) : items.length > 0 ? (
          items.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('Detail', { item })}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Tidak ada makanan yang cocok.</Text>
        )}
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}
