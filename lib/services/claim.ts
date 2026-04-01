import { supabase } from '../supabase/supabase';

export interface Claim {
  id: string;
  user_id: string;
  item_id: string;
  seller_id: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  items: any; // Relation
}

// Ambil riwayat klaim SAYA (sebagai pembeli)
export const getMyClaims = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('claims')
    .select(`
      *,
      items (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Ambil klaim yang MASUK ke saya (sebagai penjual)
export const getIncomingClaims = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('claims')
    .select(`
      *,
      items (*),
      profiles:user_id (display_name, avatar_url)
    `)
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Update status klaim (oleh penjual)
export const updateClaimStatus = async (claimId: string, status: string) => {
  const { error } = await supabase
    .from('claims')
    .update({ status })
    .eq('id', claimId);

  if (error) throw error;
};
