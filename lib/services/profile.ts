import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';
import { supabase } from '../supabase/supabase';
import { Profile } from '../types/index';

// Ambil profil berdasarkan user_id
export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data as Profile;
};

// Update profil (nama, avatar, atau qris)
export const updateProfile = async (userId: string, updates: Partial<Pick<Profile, 'display_name' | 'avatar_url' | 'qris_url'>>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
};

// Upload gambar ke storage
const uploadToBucket = async (bucket: string, prefix: string, userId: string, uri: string): Promise<string> => {
  try {
    const fileName = `${prefix}-${userId}-${Date.now()}.jpg`;
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, decode(base64), { contentType: 'image/jpeg', upsert: true });

    if (error) {
      console.error(`Supabase Storage Error (${prefix}):`, error);
      throw error;
    }
    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error(`Service Error (${prefix}):`, err);
    throw err;
  }
};

export const uploadAvatar = (userId: string, uri: string) => uploadToBucket('avatars', 'avatar', userId, uri);
export const uploadQris = (userId: string, uri: string) => uploadToBucket('avatars', 'qris', userId, uri);
