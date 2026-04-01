import { useState, useEffect, useCallback } from 'react';
import { getFavoriteIds, toggleFavorite as toggleFavoriteService } from '../lib/services/favorite';

export const useFavorites = (itemId: string) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const checkStatus = useCallback(async () => {
    try {
      const ids = await getFavoriteIds();
      setIsFavorite(ids.includes(itemId));
    } catch (err) {
      console.error('Error checking favorite status:', err);
    }
  }, [itemId]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const toggleFavorite = async () => {
    try {
      const newState = await toggleFavoriteService(itemId);
      setIsFavorite(newState);
      return newState;
    } catch (err) {
      console.error('Error toggling favorite:', err);
      throw err;
    }
  };

  return { isFavorite, toggleFavorite, checkStatus };
};
