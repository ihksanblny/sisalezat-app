import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import { ChevronRight, User, ShoppingBag } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase/supabase';
import { FoodCard } from '../components/Foodcard';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { BottomNav } from '../components/BottomNav';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Bakery', 'Meals', 'Snacks', 'Beverages'];

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
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(category.toLowerCase()) || 
        item.description?.toLowerCase().includes(category.toLowerCase())
      );
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
          <View style={styles.notifDot}>
              <Text style={styles.notifText}>2</Text>
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
                {categories.map(cat => (
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
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  brandSub: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: -2,
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
  notifDot: { 
    position: 'absolute', 
    top: -2, 
    right: -2, 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    backgroundColor: '#FF7043', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  notifText: { fontSize: 9, color: COLORS.white, fontWeight: '900' },
  
  heroCard: { 
    marginHorizontal: SPACING.l, 
    height: 240, 
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
    color: '#FFB59F',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    marginBottom: 16,
    maxWidth: '80%',
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.m,
    gap: 8,
  },
  heroCtaText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },

  filterSection: {
    marginBottom: 30,
  },
  filterScroll: {
    paddingHorizontal: SPACING.l,
    gap: 10,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  filterTextActive: {
    color: COLORS.white,
  },

  sectionHeader: { 
    paddingHorizontal: SPACING.l, 
    marginBottom: 20,
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: COLORS.primary, 
    letterSpacing: -0.5 
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
