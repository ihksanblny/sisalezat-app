import { useState, useEffect, useCallback, useRef } from 'react';
import { getFoodItems } from '../lib/services/food';
import { FoodItem } from '../lib/types';
import { supabase } from '../lib/supabase/supabase';

// ─────────────────────────────────────────────
// Helper: Cek apakah jam pickup sudah lewat
// Menggunakan created_at (tanggal posting) + jam selesai dari pickup_time
// Contoh pickup_time: "18:00 - 20:00"  →  ambil "20:00"
// ─────────────────────────────────────────────
const isPickupExpired = (item: FoodItem): boolean => {
  if (!item.pickup_time) return false;

  // Ambil jam akhir dari format "HH:MM - HH:MM" atau "HH:MM"
  const parts = item.pickup_time.split(' - ');
  const endTimeStr = parts[parts.length - 1].trim();
  const [endH, endM] = endTimeStr.split(':').map(Number);
  if (isNaN(endH) || isNaN(endM)) return false;

  // Gunakan tanggal posting sebagai acuan hari
  const postedAt = item.created_at ? new Date(item.created_at) : new Date();
  const expiry = new Date(postedAt);
  expiry.setHours(endH, endM, 0, 0);

  return new Date() > expiry;
};

// ─────────────────────────────────────────────
// Gabungan filter: lewat jam pickup ATAU sold > 3 menit
// ─────────────────────────────────────────────
const SOLD_OUT_HIDE_MINUTES = 3;

const shouldHideItem = (item: FoodItem): boolean => {
  // 1. Lewat jam pickup → sembunyikan
  if (isPickupExpired(item)) return true;

  // 2. Sold out lebih dari N menit → sembunyikan
  if (item.sold_at) {
    const minutesPassed = (Date.now() - new Date(item.sold_at).getTime()) / 60000;
    if (minutesPassed >= SOLD_OUT_HIDE_MINUTES) return true;
  }

  return false;
};

// ─────────────────────────────────────────────
// Hook Utama
// ─────────────────────────────────────────────
export const useFoodItems = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadData = useCallback(async () => {
    try {
      const data = await getFoodItems();
      setItems(data.filter(item => !shouldHideItem(item)));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // ⏱️ Cek setiap menit: ada item yang jam pickup-nya baru lewat?
    intervalRef.current = setInterval(() => {
      setItems(prev => prev.filter(item => !shouldHideItem(item)));
    }, 60 * 1000); // setiap 1 menit

    // 🔴 Realtime listener
    const subscription = supabase
      .channel('home-items-live')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'items' },
        (payload) => {
          const updated = payload.new as FoodItem;

          if (shouldHideItem(updated)) {
            setItems(prev => prev.filter(i => i.id !== updated.id));
            return;
          }

          setItems(prev =>
            prev.map(item => item.id === updated.id ? { ...item, ...updated } : item)
          );

          // Jadwalkan penghilangan lokal saat sold out (backup)
          if (updated.stock <= 0 && updated.sold_at) {
            const elapsed = Date.now() - new Date(updated.sold_at).getTime();
            const remaining = (SOLD_OUT_HIDE_MINUTES * 60000) - elapsed;
            if (remaining > 0) {
              setTimeout(() => {
                setItems(prev => prev.filter(i => i.id !== updated.id));
              }, remaining);
            }
          }
        }
      )
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'items' },
        (payload) => {
          const newItem = payload.new as FoodItem;
          if (!shouldHideItem(newItem)) {
            setItems(prev => [newItem, ...prev]);
          }
        }
      )
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'items' },
        (payload) => {
          setItems(prev => prev.filter(i => i.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loadData]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.store_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    items: filteredItems,
    loading,
    refreshing,
    searchQuery,
    setSearchQuery,
    loadData,
    setRefreshing,
  };
};
