import { supabase } from '../supabase/supabase';

// Toggle favorite (Tambah jika belum ada, hapus jika sudah ada)
export const toggleFavorite = async (itemId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Harus login untuk menggunakan fitur favorit');

  // Cek apakah sudah ada
  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('item_id', itemId)
    .single();

  if (existing) {
    // Hapus
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', existing.id);
    if (error) throw error;
    return false; // Sekarang tidak favorit
  } else {
    // Tambah
    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, item_id: itemId });
    if (error) throw error;
    return true; // Sekarang favorit
  }
};

// Ambil semua item yang difavoritkan user
export const getFavoriteItems = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('favorites')
    .select(`
      item_id,
      items (*)
    `)
    .eq('user_id', user.id);

  if (error) throw error;
  return data.map(f => f.items).filter(Boolean);
};

// Ambil list ID saja untuk mengecek status heart secara cepat di list
export const getFavoriteIds = async (): Promise<string[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('favorites')
    .select('item_id')
    .eq('user_id', user.id);

  return data?.map(f => f.item_id) || [];
};