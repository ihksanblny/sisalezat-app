import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getMyRating, submitRating } from '../lib/services/rating';

export const useRating = (itemId: string) => {
  const [myRating, setMyRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingRating, setLoadingRating] = useState(true);

  useEffect(() => {
    getMyRating(itemId).then(r => {
      setMyRating(r);
      setLoadingRating(false);
    });
  }, [itemId]);

  const handleRate = async (stars: number) => {
    // Toggle off jika klik bintang yang sama
    const newRating = myRating === stars ? null : stars;

    setMyRating(newRating);
    setSubmitting(true);
    try {
      if (newRating !== null) {
        await submitRating(itemId, newRating);
      }
    } catch (err: any) {
      Alert.alert('Gagal', err.message || 'Tidak bisa menyimpan rating.');
      setMyRating(myRating); // rollback
    } finally {
      setSubmitting(false);
    }
  };

  return { myRating, submitting, loadingRating, handleRate };
};
