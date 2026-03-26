import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, TextInput, Image, ActivityIndicator } from 'react-native';
import { User, Settings, LogOut, ChevronRight, Package, Heart, Camera, Check, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { signOut } from '../lib/services/auth';
import { updateProfile, uploadAvatar } from '../lib/services/profile';
import { styles } from '../styles/screens/ProfileScreen.styles';
import { COLORS } from '../styles/theme';
import { BottomNav } from '../components/BottomNav';

export default function ProfileScreen({ navigation }: any) {
  const { session } = useAuth();
  const { profile, setProfile, loading } = useProfile();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const startEdit = () => {
    setEditName(profile?.display_name || '');
    setIsEditing(true);
  };

  const cancelEdit = () => setIsEditing(false);

  const saveEdit = async () => {
    if (!user || !editName.trim()) return;
    setSaving(true);
    try {
      const updated = await updateProfile(user.id, { display_name: editName.trim() });
      setProfile(updated);
      setIsEditing(false);
    } catch {
      Alert.alert('Gagal', 'Tidak bisa menyimpan perubahan.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled || !user) return;

    setUploadingAvatar(true);
    try {
      const uri = result.assets[0].uri;
      const avatarUrl = await uploadAvatar(user.id, uri);
      const updated = await updateProfile(user.id, { avatar_url: avatarUrl });
      setProfile(updated);
    } catch {
      Alert.alert('Gagal', 'Tidak bisa mengganti foto profil.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Konfirmasi Keluar', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar', style: 'destructive',
        onPress: async () => {
          try { await signOut(); } catch { Alert.alert('Gagal', 'Ada masalah saat logout.'); }
        }
      },
    ]);
  };

  const MenuLink = ({ icon: Icon, title, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}><Icon color={COLORS.text} size={20} /></View>
      <Text style={styles.menuText}>{title}</Text>
      <ChevronRight color={COLORS.grayMedium} size={18} />
    </TouchableOpacity>
  );

  const avatarUrl = profile?.avatar_url;
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header Profil */}
        <View style={styles.header}>
          {/* Avatar dengan tombol ganti */}
          <TouchableOpacity style={styles.avatarContainer} onPress={handleChangeAvatar} disabled={uploadingAvatar}>
            {uploadingAvatar ? (
              <View style={styles.avatarPlaceholder}>
                <ActivityIndicator color={COLORS.primary} />
              </View>
            ) : avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <User size={50} color={COLORS.grayMedium} />
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Camera size={14} color={COLORS.white} />
            </View>
          </TouchableOpacity>

          {/* Nama yang bisa diedit */}
          {isEditing ? (
            <View style={styles.editRow}>
              <TextInput
                style={styles.nameInput}
                value={editName}
                onChangeText={setEditName}
                autoFocus
                placeholder="Nama tampilan"
              />
              {saving
                ? <ActivityIndicator color={COLORS.primary} style={{ marginLeft: 8 }} />
                : (
                  <>
                    <TouchableOpacity onPress={saveEdit} style={styles.editAction}>
                      <Check size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelEdit} style={styles.editAction}>
                      <X size={20} color={COLORS.textLight} />
                    </TouchableOpacity>
                  </>
                )
              }
            </View>
          ) : (
            <TouchableOpacity onPress={startEdit} style={styles.nameRow}>
              <Text style={styles.userName}>{displayName}</Text>
              <Settings size={16} color={COLORS.textLight} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          )}

          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Menu Pilihan */}
        <View style={styles.menuSection}>
          <MenuLink icon={Package} title="Postingan Saya" onPress={() => navigation.navigate('MyPosts')} />
          <MenuLink icon={Heart} title="Makanan Favorit" onPress={() => {}} />
        </View>

        {/* Tombol Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color={COLORS.primary} size={20} />
          <Text style={styles.logoutText}>Keluar Akun</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}