import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Search, Filter, Bell, LayoutGrid, ShoppingBag } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase/supabase';
import { FoodCard } from '../components/Foodcard';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../styles/theme';
import { BottomNav } from '../components/BottomNav';

export default function HomeScreen({ navigation }: any) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    try {
      const now = new Date();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('items')
        .select('*')
        .gt('stock', 0)
        .gte('created_at', today.toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Filter kadaluwarsa jam ambil secara presisi
      const validItems = (data || []).filter(item => {
        try {
          if (!item.pickup_time) return true;
          
          // Pecah format "18:00 - 19:00" atau "19:00"
          const parts = item.pickup_time.split(/[-–—]|sampai/i);
          const lastPart = parts[parts.length - 1].trim();
          
          // Bersihkan karakter (ubah 19.00 jadi 19:00)
          const timeStr = lastPart.replace('.', ':');
          const [h, m] = timeStr.split(':').map(Number);
          
          if (isNaN(h)) return true;

          const expiry = new Date();
          expiry.setHours(h, m || 0, 0, 0);

          // Jika jam berakhir adalah Subuh (misal jam 1 atau 2 malam), 
          // tapi sekarang masih malam (jam 20-23), berarti itu jam 1 malam BESOK.
          if (h < 6 && now.getHours() > 18) {
             expiry.setDate(expiry.getDate() + 1);
          }

          return now < expiry;
        } catch {
          return true;
        }
      });

      setItems(validItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchItems(); }, [fetchItems]));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle}>
           <LayoutGrid size={20} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
           <ShoppingBag size={20} color={COLORS.text} />
           <View style={styles.notifDot}>
              <Text style={styles.notifText}>02</Text>
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
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>Ice cream Lover?</Text>
              <Text style={styles.heroTitle}>Order & Eat.</Text>
            </View>

            {/* Search Bar */}
            <TouchableOpacity 
              style={styles.searchBar} 
              onPress={() => navigation.navigate('Search')}
            >
              <Search size={20} color={COLORS.textLighter} />
              <Text style={styles.searchPlaceholder}>Search your item</Text>
              <View style={styles.filterBox}>
                 <Filter size={18} color={COLORS.primary} />
              </View>
            </TouchableOpacity>

            <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Discover food</Text>
            </View>
          </>
        }
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.l,
    paddingTop: 20, // Diperlebar agar tidak terlalu tinggi ke status bar
    paddingBottom: 10,
  },
  iconCircle: { 
    width: 44, 
    height: 44, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  notifDot: { 
    position: 'absolute', 
    top: -4, 
    right: -4, 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    backgroundColor: COLORS.text, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  notifText: { fontSize: 8, color: COLORS.white, fontWeight: 'bold' },
  
  heroSection: { paddingHorizontal: SPACING.l, marginBottom: 25 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: COLORS.text, lineHeight: 40 },

  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8F9FA', 
    marginHorizontal: SPACING.l, 
    paddingLeft: 16,
    paddingVertical: 12, 
    borderRadius: RADIUS.m,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  searchPlaceholder: { flex: 1, color: COLORS.textLighter, marginLeft: 15, fontSize: 16 },
  filterBox: { width: 44, height: 44, backgroundColor: COLORS.white, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 4, ...SHADOWS.light },

  sectionHeader: { paddingHorizontal: SPACING.l, marginBottom: 15 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: COLORS.text },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
  },
  listContainer: { 
    paddingTop: 10,
    paddingBottom: 120, // Ruang untuk BottomNav
  },
});
