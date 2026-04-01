import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { claimFoodItem } from '../lib/services/food';
import { supabase } from '../lib/supabase/supabase';

export const useFoodDetail = (item: any) => {
  const [isBooking, setIsBooking] = useState(false);
  const [currentStock, setCurrentStock] = useState(item.stock);

  // 🪄 LOGIKA REALTIME SINGLE ITEM
  useEffect(() => {
    const subscription = supabase
      .channel(`detail-live-${item.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'items', filter: `id=eq.${item.id}` },
        (payload) => {
          if (payload.new.stock !== undefined) {
            setCurrentStock(payload.new.stock);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [item.id]);

  const handleClaim = async (onSuccess?: () => void, paymentMethod: 'cod' | 'qris' = 'cod') => {
    if (currentStock <= 0) {
      Alert.alert('Habis', 'Maaf, makanan ini sudah tidak tersedia.');
      return;
    }

    setIsBooking(true);
    try {
      await claimFoodItem(item.id, currentStock, paymentMethod);
      const msg = paymentMethod === 'qris' 
        ? 'Pesanan dibuat! Silakan bayar via QRIS di riwayat klaim Anda.' 
        : 'Pesanan berhasil! Silakan bayar saat pengambilan di toko.';
      Alert.alert('Berhasil!', msg);
      if (onSuccess) onSuccess();
    } catch (error) {
      Alert.alert('Gagal', 'Sistem gagal memproses pesanan Anda.');
    } finally {
      setIsBooking(false);
    }
  };

  return { isBooking, currentStock, handleClaim };
};
