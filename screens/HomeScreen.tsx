import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import { ChevronRight, User, ShoppingBag, Search } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase/supabase';
import { FoodCard } from '../components/Foodcard';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../styles/theme';
import { BottomNav } from '../components/BottomNav';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const dynamicCategories = useMemo(() => {
    const uniqueCats = Array.from(new Set(allItems.map(item => item.category).filter(Boolean)));
    return ['All', ...uniqueCats];
  }, [allItems]);

  const fetchItems = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .gt('stock', 0)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      const now = new Date();
      const validItems = (data || []).filter(item => {
        try {
          if (!item.pickup_time) return true;
          const parts = item.pickup_time.split(/[-–—]|sampai/i);
          const lastPart = parts[parts.length - 1].trim().replace('.', ':');
          const [h, m] = lastPart.split(':').map(Number);
          if (isNaN(h)) return true;
          const expiry = new Date();
          expiry.setHours(h, m || 0, 0, 0);
          if (h < 6 && now.getHours() > 18) expiry.setDate(expiry.getDate() + 1);
          return now < expiry;
        } catch { return true; }
      });

      setAllItems(validItems);
      setItems(validItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { 
    setLoading(true);
    fetchItems(); 
  }, [fetchItems]));

  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setItems(allItems);
    } else {
      const filtered = allItems.filter(item => item.category === category);
      setItems(filtered);
    }
  };


  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brandName}>SisaLezat</Text>
          <Text style={styles.brandSub}>Sustainable Gourmet</Text>
        </View>
        <TouchableOpacity style={styles.avatarContainer} onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatarPlaceholder}>
             <User size={20} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard 
            item={item} 
            onPress={() => navigation.navigate('Detail', { item })} 
          />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.searchBarContainer}>
               <TouchableOpacity 
                 style={styles.searchBar} 
                 onPress={() => navigation.navigate('Search')}
               >
                 <Search size={20} color={COLORS.textLighter} />
                 <Text style={styles.searchPlaceholder}>Search surplus food...</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.heroCard}>
               <Image 
                 source={{ uri: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop' }} 
                 style={styles.heroImage} 
               />
               <View style={styles.heroOverlay}>
                  <Text style={styles.heroSubtitle}>Rescue Today's Finest</Text>
                  <Text style={styles.heroTitle}>Premium Surplus, Half the Price</Text>
                  <TouchableOpacity style={styles.heroCta} onPress={() => handleCategoryPress('Bakery')}>
                     <Text style={styles.heroCtaText}>RESCUE NOW</Text>
                     <ChevronRight size={14} color={COLORS.white} />
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.filterSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                {dynamicCategories.map((cat: string) => (
                  <TouchableOpacity 
                    key={cat}
                    style={[styles.filterPill, activeCategory === cat && styles.filterPillActive]}
                    onPress={() => handleCategoryPress(cat)}
                  >
                    <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Available in Your Area</Text>
               <Text style={styles.sectionSub}>Pick up before time runs out</Text>
            </View>
          </>
        }
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ padding: 60, alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
              <>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={{ marginTop: 15, color: COLORS.textLight, fontWeight: '600' }}>Curating today's surplus...</Text>
              </>
            ) : (
              <>
                <ShoppingBag size={48} color={COLORS.grayMedium} />
                <Text style={{ marginTop: 15, fontSize: 16, fontWeight: '700', color: COLORS.text }}>Semua sudah terjual!</Text>
                <Text style={{ marginTop: 5, color: COLORS.textLighter, textAlign: 'center' }}>Cek kembali nanti untuk makanan lezat lainnya.</Text>
              </>
            )}
          </View>
        }
      />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.l,
    height: 70,
    backgroundColor: COLORS.background,
  },
  brandName: {
    ...TYPOGRAPHY.display,
    fontSize: 28,
    color: COLORS.primary,
  },
  brandSub: {
    ...TYPOGRAPHY.label,
    fontSize: 10,
    color: COLORS.accent,
    marginTop: -4,
  },
  avatarContainer: {
    width: 44,
    height: 44,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  
  searchBarContainer: {
    paddingHorizontal: SPACING.l,
    marginVertical: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainer,
    height: 56,
    borderRadius: RADIUS.l,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  searchPlaceholder: {
    ...TYPOGRAPHY.body,
    color: COLORS.textLighter,
    marginLeft: 12,
    fontSize: 15,
  },
  heroCard: { 
    marginHorizontal: SPACING.l, 
    height: 260, 
    borderRadius: RADIUS.l, 
    overflow: 'hidden',
    marginBottom: 30,
    ...SHADOWS.medium,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(1, 45, 29, 0.45)',
    padding: SPACING.l,
    justifyContent: 'flex-end',
  },
  heroSubtitle: {
    ...TYPOGRAPHY.label,
    color: '#FFB59F',
    fontSize: 12,
    marginBottom: 8,
  },
  heroTitle: {
    ...TYPOGRAPHY.display,
    color: COLORS.white,
    fontSize: 34,
    lineHeight: 38,
    marginBottom: 20,
    maxWidth: '85%',
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.m,
    gap: 8,
  },
  heroCtaText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontSize: 11,
  },

  filterSection: {
    marginBottom: 35,
  },
  filterScroll: {
    paddingHorizontal: SPACING.l,
    gap: 12,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADIUS.m, // Slightly less rounded for editorial feel
    backgroundColor: COLORS.surfaceVariant, // Tonal instead of shadow
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.light, // Only active pill gets a very subtle lift
  },
  filterText: {
    ...TYPOGRAPHY.subheadline,
    fontSize: 14,
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: COLORS.white,
    fontFamily: 'Inter-Bold',
  },

  sectionHeader: { 
    paddingHorizontal: SPACING.l, 
    marginBottom: 20,
  },
  sectionTitle: { 
    ...TYPOGRAPHY.headline,
    fontSize: 22, 
    color: COLORS.primary, 
  },
  sectionSub: {
    fontSize: 12,
    color: COLORS.textLighter,
    marginTop: 2,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
  },
  listContainer: { 
    paddingBottom: 120, 
  },
});
