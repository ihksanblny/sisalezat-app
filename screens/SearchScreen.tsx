import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Search, ChevronLeft, SlidersHorizontal, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSearch } from '../hooks/useSearch';
import { FoodCard } from '../components/Foodcard';
import { COLORS } from '../styles/theme';
import { styles } from '../styles/screens/SearchScreen.styles';

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
          <ChevronLeft color={COLORS.primary} size={24} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Search size={18} color={COLORS.textLighter} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari makanan lezat..."
            placeholderTextColor={COLORS.textLighter}
            value={query}
            onChangeText={setQuery}
            autoFocus
            multiline={false}
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