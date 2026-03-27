import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';
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

// Fungsi Upload Gambar yang Lebih Stabil (Base64)
export const uploadFoodImage = async (uri: string) => {
  try {
    const fileName = `food-${Date.now()}.jpg`;
    
    // 1. Baca file gambar sebagai Base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64',
    });

    // 2. Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from('food-images')
      .upload(fileName, decode(base64), {
        contentType: 'image/jpeg'
      });

    if (error) throw error;

    // 3. Ambil Link Public-nya
    const { data: publicUrlData } = supabase.storage
      .from('food-images')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error upload image:', error);
    return null;
  }
};

export const addFoodItem = async (food: Partial<FoodItem>) => {
  // Ambil user yang sedang login, lalu simpan user_id-nya
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('items')
    .insert([{ ...food, user_id: user?.id }])
    .select();

  if (error) throw error;
  return data;
};

// Ambil postingan milik akun yang sedang login
export const getMyFoodItems = async (): Promise<FoodItem[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as FoodItem[];
};

// Hapus postingan berdasarkan ID
export const deleteFoodItem = async (itemId: string) => {
  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
};

export const claimFoodItem = async (itemId: string, currentStock: number) => {
  if (currentStock <= 0) {
    throw new Error('Stok sudah habis');
  }

  const newStock = currentStock - 1;

  // Jika stok habis, simpan juga waktu kapan item ini sold out
  const updatePayload: any = { stock: newStock };
  if (newStock <= 0) {
    updatePayload.sold_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('items')
    .update(updatePayload)
    .eq('id', itemId);

  if (error) throw error;
  return data;
}

