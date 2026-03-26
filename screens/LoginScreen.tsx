import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { signIn, signUp, signInWithGoogle } from '../lib/services/auth';
import { styles } from '../styles/screens/LoginScreen.styles';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) return Alert.alert('Error', 'Isi dulu semua datanya ya!');
    
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        Alert.alert('Berhasil!', 'Akun Anda sudah terdaftar. Selamat datang!');
      }
    } catch (error: any) {
      Alert.alert('Gagal', error.message || 'Cek kembali data Anda');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      // Browser akan terbuka untuk proses OAuth
    } catch (error: any) {
      Alert.alert('Gagal', 'Gagal menyambung ke Google.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.title}>{isLogin ? 'Selamat Datang' : 'Buat Akun'}</Text>
        <Text style={styles.subtitle}>Selamatkan makanan lezat mulai hari ini 🍲</Text>
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.inputLabel}>Email Anda</Text>
        <TextInput 
          placeholder="nama@email.com" 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput 
          placeholder="Min. 6 Karakter" 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword}
          secureTextEntry 
        />
      </View>

      <TouchableOpacity style={styles.mainButton} onPress={handleSubmit} disabled={loading || googleLoading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>{isLogin ? 'Masuk Sekarang' : 'Daftar Akun'}</Text>}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ATAU</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Tombol Google dengan Logo */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin} disabled={loading || googleLoading}>
        {googleLoading ? (
          <ActivityIndicator color="#222" />
        ) : (
          <>
            <Image 
              source={require('../assets/google_icon.png')} 
              style={styles.googleIcon} 
            />
            <Text style={styles.googleButtonText}>Lanjutkan dengan Google</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.toggleArea} onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <Text style={styles.toggleLink}>{isLogin ? 'Daftar Disini' : 'Login Disini'}</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}