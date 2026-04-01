import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Search, ChevronLeft, SlidersHorizontal, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSearch } from '../hooks/useSearch';
import { FoodCard } from '../components/Foodcard';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';

export default function SearchScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { 
    query, setQuery, 
    results, loading,
    activeFilter, setActiveFilter,
    filters 
  } = useSearch();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER & SEARCH BAR */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Search size={18} color={COLORS.textLighter} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari makanan atau restomu..."
            placeholderTextColor={COLORS.textLighter}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={18} color={COLORS.textLighter} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* FILTER CHIPS */}
      <View style={styles.filterSection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filters}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === item.id && styles.filterChipActive
              ]}
              onPress={() => setActiveFilter(item.id)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === item.id && styles.filterTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* SEARCH RESULTS */}
      <View style={styles.resultHeader}>
         <Text style={styles.resultTitle}>
           {loading ? 'Mencari...' : `${results.length} makanan ditemukan`}
         </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={results}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodCard 
              item={item} 
              onPress={() => navigation.navigate('Detail', { item })} 
            />
          )}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Maaf, makanan tidak ditemukan.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.l, 
    paddingBottom: 15,
    gap: 12
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: RADIUS.m,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
  },
  
  filterSection: { marginBottom: 20 },
  filterList: { paddingHorizontal: SPACING.l },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: COLORS.white,
  },

  resultHeader: {
    paddingHorizontal: SPACING.l,
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textLight,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
  },
  listContainer: {
    paddingBottom: 30,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyState: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyText: { color: COLORS.textLighter, fontSize: 16 },
});
