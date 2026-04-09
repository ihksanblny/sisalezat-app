import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, Image, ActivityIndicator, Modal, StyleSheet as RNStyleSheet } from 'react-native';
import { User, Settings, LogOut, ChevronRight, Package, Heart, Camera, Check, X, CreditCard, Ticket, QrCode, Leaf, ShieldCheck, Zap } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { signOut } from '../lib/services/auth';
import { updateProfile, uploadAvatar } from '../lib/services/profile';
import { styles } from '../styles/screens/ProfileScreen.styles';
import { COLORS, RADIUS, SHADOWS, TYPOGRAPHY, SPACING } from '../styles/theme';
import { BottomNav } from '../components/BottomNav';
import { supabase } from '../lib/supabase/supabase';

export default function ProfileScreen({ navigation }: any) {
  const { session } = useAuth();
  const { profile, setProfile, loading: profileLoading } = useProfile();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [updating, setUpdating] = useState(false);
  const [stats, setStats] = useState({ disave: 0, posts: 0, saved: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  // Sync editName with current profile name when opening modal
  useEffect(() => {
    if (profile?.display_name) {
      setEditName(profile.display_name);
    }
  }, [profile, isEditing]);

  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const { count: postsCount } = await supabase
        .from('items')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { data: claimsData } = await supabase
        .from('claims')
        .select(`
          status,
          items (
            original_price,
            discount_price
          )
        `)
        .eq('user_id', user.id);

      const disaveCount = claimsData?.length || 0;
      const totalSaved = (claimsData || []).reduce((acc: number, claim: any) => {
        const item = claim.items;
        if (item) {
          return acc + (item.original_price - item.discount_price);
        }
        return acc;
      }, 0);

      setStats({
        disave: disaveCount,
        posts: postsCount || 0,
        saved: totalSaved
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoadingStats(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statsDisplay = [
    { label: 'DI-SAVE', value: stats.disave.toString(), icon: Leaf },
    { label: 'POSTS', value: stats.posts.toString(), icon: Package },
    { label: 'SAVED', value: `Rp ${(stats.saved / 1000).toFixed(0)}k`, icon: Zap },
  ];

  const handleLogout = async () => {
    Alert.alert('Konfirmasi Keluar', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: async () => await signOut() },
    ]);
  };

  const handleUpdateName = async () => {
    if (!editName.trim() || !user) return;
    setUpdating(true);
    try {
      await updateProfile(user.id, { display_name: editName });
      if (profile) {
        setProfile({ ...profile, display_name: editName });
      }
      setIsEditing(false);
      Alert.alert('Sukses', 'Profil Anda telah diperbarui.');
    } catch (err) {
      Alert.alert('Error', 'Gagal memperbarui profil.');
    } finally {
      setUpdating(false);
    }
  };

  const handlePickAvatar = async () => {
    if (!user) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setUpdating(true);
      try {
        const url = await uploadAvatar(user.id, result.assets[0].uri);
        if (url) {
          await updateProfile(user.id, { avatar_url: url });
          if (profile) {
            setProfile({ ...profile, avatar_url: url });
          }
          Alert.alert('Sukses', 'Foto profil berhasil diganti.');
        }
      } catch (e) {
        Alert.alert('Error', 'Gagal mengunggah foto.');
      } finally {
        setUpdating(false);
      }
    }
  };

  const MenuItem = ({ icon: Icon, title, onPress, isLast }: any) => (
    <TouchableOpacity 
      style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]} 
      onPress={onPress}
    >
      <View style={styles.iconBox}>
        <Icon color={COLORS.primary} size={20} />
      </View>
      <Text style={styles.menuText}>{title}</Text>
      <ChevronRight color={COLORS.grayMedium} size={18} />
    </TouchableOpacity>
  );

  const avatarUrl = profile?.avatar_url;
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.profileHeader}>
            <TouchableOpacity style={styles.avatarWrapper} onPress={handlePickAvatar} disabled={updating}>
               {avatarUrl ? (
                 <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
               ) : (
                 <View style={styles.avatarPlaceholder}>
                    <User size={34} color="white" opacity={0.6} />
                 </View>
               )}
               <View style={styles.cameraBadge}>
                 {updating ? <ActivityIndicator size="small" color={COLORS.primary} /> : <Camera size={14} color={COLORS.primary} />}
               </View>
            </TouchableOpacity>
            
            <View style={styles.nameArea}>
               <Text style={styles.userName}>{displayName}</Text>
               <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
            
            <TouchableOpacity onPress={() => setIsEditing(true)}>
               <Settings size={22} color="white" opacity={0.5} />
            </TouchableOpacity>
          </View>

          {/* QUICK STATS */}
          <View style={styles.statsRow}>
            {statsDisplay.map((s, idx) => (
              <View key={idx} style={styles.statCard}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* MERCHANT ACTIONS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TOKO SAYA</Text>
          </View>
          <View style={styles.menuCard}>
            <MenuItem icon={Package} title="Postingan Makanan" onPress={() => navigation.navigate('MyPosts')} />
            <MenuItem icon={QrCode} title="Setup Pembayaran QRIS" onPress={() => {}} />
            <MenuItem icon={Ticket} title="Pesanan Masuk" onPress={() => navigation.navigate('IncomingOrders')} isLast />
          </View>
        </View>

        {/* BUYER ACTIONS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AKTIVITAS KLAIM</Text>
          </View>
          <View style={styles.menuCard}>
            <MenuItem icon={Heart} title="Makanan Favorit" onPress={() => navigation.navigate('Favorites')} />
            <MenuItem icon={ShieldCheck} title="Riwayat Penyelamatan" onPress={() => navigation.navigate('History')} isLast />
          </View>
        </View>

        {/* ACCOUNT SETTINGS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PENGATURAN AKUN</Text>
          </View>
          <View style={styles.menuCard}>
            <MenuItem icon={User} title="Edit Profil" onPress={() => setIsEditing(true)} />
            <MenuItem icon={ShieldCheck} title="Keamanan & Privasi" onPress={() => Alert.alert('Privacy', 'Data Anda aman bersama kami. Enkripsi end-to-end aktif.')} />
            <MenuItem icon={Zap} title="Bantuan & Dukungan" onPress={() => Alert.alert('Bantuan', 'Butuh bantuan? Hubungi kami di support@sisalezat.com')} isLast />
          </View>
        </View>

        {/* LOGOUT */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut color="#4c1000" size={20} />
            <Text style={styles.logoutText}>KELUAR DARI AKUN</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* EDIT PROFILE MODAL */}
      <Modal visible={isEditing} transparent animationType="slide">
        <View style={modalStyles.overlay}>
          <View style={modalStyles.content}>
            <View style={modalStyles.header}>
              <Text style={modalStyles.title}>Edit Profil</Text>
              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <View style={modalStyles.inputGroup}>
              <Text style={modalStyles.label}>Nama Panggilan</Text>
              <TextInput 
                style={modalStyles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Masukkan nama baru..."
                autoFocus
              />
            </View>

            <TouchableOpacity 
              style={[modalStyles.saveButton, updating && { opacity: 0.7 }]} 
              onPress={handleUpdateName}
              disabled={updating}
            >
              {updating ? <ActivityIndicator color="white" /> : <Text style={modalStyles.saveText}>SIMPAN PERUBAHAN</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNav />
    </View>
  );
}

const modalStyles = RNStyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.l,
    borderTopRightRadius: RADIUS.l,
    padding: SPACING.l,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    ...TYPOGRAPHY.display,
    fontSize: 22,
    color: COLORS.primary,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    color: COLORS.accent,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADIUS.m,
    fontSize: 16,
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    fontFamily: 'Inter-Regular',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  saveText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontSize: 13,
  }
});