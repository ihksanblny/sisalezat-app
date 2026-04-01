import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFoodItems } from '../lib/services/food';
import { FoodItem } from '../lib/types';

const RECENT_KEY = 'sisalezat_recent_searches';
const MAX_RECENT = 6;

export type FilterType = 'all' | 'cheap' | 'top_rated' | 'tonight';

export const FILTERS: { id: FilterType; label: string; emoji: string }[] = [
  { id: 'all',       label: 'Semua',     emoji: '🍱' },
  { id: 'cheap',     label: '< Rp 20rb', emoji: '💰' },
  { id: 'top_rated', label: 'Rating 4+', emoji: '⭐' },
  { id: 'tonight',   label: 'Malam ini', emoji: '🌙' },
];

// ─── Helpers (sama dengan useFoodItems) ───────────────

// Parse jam akhir dari berbagai format pickup_time:
// "18:00 - 20:00", "18:00-20:00", "18.00 - 20.00", "20:00", "2:30"
const parseEndHour = (pickupTime: string): number | null => {
  if (!pickupTime || !pickupTime.trim()) return null;

  // Ambil bagian akhir (setelah " - " atau "-")
  const dashParts = pickupTime.split(/\s*[-–]\s*/);
  const endPart = dashParts[dashParts.length - 1].trim();

  // Parse jam: "20:00", "20.00", "20"
  const hourMatch = endPart.match(/^(\d{1,2})[:.]?/);
  if (!hourMatch) return null;

  const h = parseInt(hourMatch[1], 10);
  return isNaN(h) ? null : h;
};

// Cek apakah item sudah expired
const isPickupExpired = (item: FoodItem): boolean => {
  const endH = parseEndHour(item.pickup_time ?? '');
  // Jika tidak bisa di-parse, jangan sembunyikan (benefit of doubt)
  if (endH === null) return false;

  const parts = (item.pickup_time ?? '').split(/\s*[-–]\s*/);
  const endPart = parts[parts.length - 1].trim();
  const minMatch = endPart.match(/^\d{1,2}[:.](\d{2})/);
  const endM = minMatch ? parseInt(minMatch[1], 10) : 0;

  const postedAt = item.created_at ? new Date(item.created_at) : new Date();
  const expiry = new Date(postedAt);
  expiry.setHours(endH, endM, 0, 0);
  return new Date() > expiry;
};


const applyFilter = (items: FoodItem[], filter: FilterType): FoodItem[] => {
  switch (filter) {
    case 'cheap':
      return items.filter(i => i.discount_price < 20000);

    case 'top_rated':
      return items.filter(i => (i.avg_rating ?? 0) >= 4);

    case 'tonight': {
      return items.filter(i => {
        const endH = parseEndHour(i.pickup_time ?? '');
        return endH !== null && endH >= 17;
      });
    }

    default: // 'all'
      return items;
  }
};

// ─── Hook Utama ───────────────────────────────────────

export const useSearch = () => {
  const [allItems, setAllItems] = useState<FoodItem[]>([]);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const [data, stored] = await Promise.all([
        getFoodItems(),
        AsyncStorage.getItem(RECENT_KEY),
      ]);
      const active = data.filter(item => !isPickupExpired(item));
      setAllItems(active);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch (e) {
      console.error('useSearch init error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Re-fetch setiap kali halaman Search dibuka / difokuskan
  useFocusEffect(useCallback(() => { loadItems(); }, [loadItems]));


  const saveRecent = useCallback(async (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(r => r !== term)].slice(0, MAX_RECENT);
    setRecentSearches(updated);
    try { await AsyncStorage.setItem(RECENT_KEY, JSON.stringify(updated)); } catch (_) {}
  }, [recentSearches]);

  const clearRecent = useCallback(async () => {
    setRecentSearches([]);
    try { await AsyncStorage.removeItem(RECENT_KEY); } catch (_) {}
  }, []);

  // Hitung hasil: selalu tampilkan (filter + query)
  const results = (() => {
    let base = applyFilter(allItems, activeFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      base = base.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.store_name.toLowerCase().includes(q)
      );
    }
    return base;
  })();

  // Tampilkan hasil SELALU jika ada data
  const showResults = results.length > 0;
  const showRecent = query.trim().length === 0 && recentSearches.length > 0;
  const showPlaceholder = allItems.length === 0 && !loading;

  return {
    query, setQuery,
    activeFilter, setActiveFilter,
    recentSearches,
    results,
    loading,
    showResults,
    showRecent,
    showPlaceholder,
    filters: FILTERS,
    saveRecent,
    clearRecent,
  };
};
