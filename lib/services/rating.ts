import { supabase } from '../supabase/supabase';

// Ambil rating milik user saat ini untuk sebuah item
export const getMyRating = async (itemId: string): Promise<number | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('ratings')
    .select('rating')
    .eq('item_id', itemId)
    .eq('user_id', user.id)
    .single();

  return data?.rating ?? null;
};

// Submit atau update rating user untuk sebuah item (upsert)
export const submitRating = async (itemId: string, rating: number): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Harus login untuk memberi rating');

  const { error } = await supabase
    .from('ratings')
    .upsert(
      { item_id: itemId, user_id: user.id, rating },
      { onConflict: 'item_id,user_id' }
    );

  if (error) throw error;
};
