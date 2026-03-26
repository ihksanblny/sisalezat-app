import { supabase } from '../supabase/supabase';
import { FoodItem } from '../types/index';

export const getFoodItems = async (): Promise<FoodItem[]> => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data as FoodItem[];
  } catch (error) {
    console.error('Error saat mengambil data makanan:', error);
    return [];
  }
};

// Fungsi untuk Menambah Makanan Baru
export const addFoodItem = async (food: Partial<FoodItem>) => {
  const { data, error } = await supabase
    .from('items')
    .insert([food])
    .select();

  if (error) throw error;
  return data;
};

export const claimFoodItem = async (itemId: string, currentStock: number) => {
  if (currentStock <= 0) {
    throw new Error('Stok sudah habis');
  }

  const { data, error } = await supabase
    .from('items')
    .update({ stock: currentStock - 1 })
    .eq('id', itemId);

  if (error) throw error;
  return data;
}
