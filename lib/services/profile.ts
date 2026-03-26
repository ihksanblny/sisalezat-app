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

// Update display_name dan/atau avatar_url
export const updateProfile = async (userId: string, updates: Partial<Pick<Profile, 'display_name' | 'avatar_url'>>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
};

// Upload avatar ke Supabase Storage lalu simpan URL-nya
export const uploadAvatar = async (userId: string, uri: string): Promise<string> => {
  const fileName = `avatar-${userId}-${Date.now()}.jpg`;

  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, decode(base64), {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};
