import { useState, useEffect } from 'react';
import { getFoodItems } from '../lib/services/food';
import { FoodItem } from '../lib/types';
import { supabase } from '../lib/supabase/supabase';

export const useFoodItems = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const data = await getFoodItems();
      setItems(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();

    // 🪄 LOGIKA REALTIME LIST
    const subscription = supabase
      .channel('home-items-live')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'items' },
        (payload) => {
          setItems((current) => 
            current.map(item => item.id === payload.new.id ? { ...item, ...payload.new } : item)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Filter di sisi client untuk performa kilat
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
    setRefreshing
  };
};
