import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '../supabase/supabase';

// Memastikan sesi auth selesai dengan benar saat kembali ke aplikasi
WebBrowser.maybeCompleteAuthSession();

export const signIn = async (email: string, pass: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });
  if (error) throw error;
  return data;
};

// Fungsi Login dengan Google yang sudah diperbaiki untuk Mobile
export const signInWithGoogle = async () => {
  // 1. Dapatkan URL redirect untuk aplikasi kita (sesuai scheme di app.json)
  const redirectUrl = Linking.createURL('auth');
  
  // 2. Minta URL login dari Supabase
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;

  // 3. Buka browser HP untuk login Google
  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

  // 4. Jika berhasil kembali ke aplikasi, kirimkan session ke Supabase
  if (result.type === 'success') {
    const { url } = result;
    
    // Pecah URL untuk mengambil access_token dan refresh_token
    // Supabase biasanya mengirimkan token di dalam hash (#)
    const hash = url.split('#')[1];
    if (hash) {
      const params = Object.fromEntries(new URLSearchParams(hash));
      const { access_token, refresh_token } = params;
      
      if (access_token && refresh_token) {
        return await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
      }
    }
  }
  
  return null;
};

export const signUp = async (email: string, pass: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};