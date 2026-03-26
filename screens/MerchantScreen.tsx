import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, ChevronLeft } from 'lucide-react-native';
import { addFoodItem, uploadFoodImage } from '../lib/services/food';
import { styles } from '../styles/screens/MerchantScreen.styles';
import { COLORS } from '../styles/theme';

export default function MerchantScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    store_name: '',
    original_price: '',
    discount_price: '',
    stock: '',
    pickup_time: '18:00 - 20:00', // Default waktu
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddFood = async () => {
    const { name, store_name, original_price, discount_price, stock, pickup_time } = form;

    if (!name || !store_name || !original_price || !discount_price || !stock) {
      return Alert.alert('Halo!', 'Pastikan semua koliom harga dan stok sudah terisi ya.');
    }

    setLoading(true);
    try {
      let finalImageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

      // 1. Upload Gambar ke Supabase Storage (Cloud)
      if (image) {
        const uploadedUrl = await uploadFoodImage(image);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      // 2. Simpan Data ke Database dengan Link Gambar Cloud
      const foodData = {
        name,
        store_name,
        original_price: parseInt(original_price),
        discount_price: parseInt(discount_price),
        stock: parseInt(stock),
        pickup_time,
        image_url: finalImageUrl,
      };

      await addFoodItem(foodData);
      Alert.alert('Sukses!', 'Makanan Anda kini sudah tampil dengan gambar yang jernih di beranda!');
      navigation.goBack();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Waduh', 'Gagal mendaftarkan makanan. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.headerArea}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 15 }}>
              <ChevronLeft color={COLORS.text} size={28} />
            </TouchableOpacity>
            <Text style={styles.title}>Daftarkan Makanan</Text>
            <Text style={styles.subtitle}>Selamatkan sisa makanan lezat dari tokomu 🥯</Text>
          </View>

          {/* Area Pilih Foto */}
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.pickedImage} />
            ) : (
              <>
                <Camera color={COLORS.textLight} size={40} />
                <Text style={styles.imagePickerText}>Ambil Foto Makanan</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Input Form */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Makanan</Text>
            <TextInput 
              placeholder="Contoh: Paket Pastry 5pcs" 
              style={styles.input} 
              value={form.name}
              onChangeText={(t) => setForm({...form, name: t})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Toko / Resto</Text>
            <TextInput 
              placeholder="Contoh: Bakery Enak Jaya" 
              style={styles.input}
              value={form.store_name}
              onChangeText={(t) => setForm({...form, store_name: t})}
            />
          </View>

          <View style={styles.rowInputs}>
             <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Harga Asli</Text>
                <TextInput 
                  placeholder="Rp 50.000" 
                  keyboardType="numeric"
                  style={styles.input}
                  value={form.original_price}
                  onChangeText={(t) => setForm({...form, original_price: t})}
                />
             </View>
             <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Harga Diskon</Text>
                <TextInput 
                  placeholder="Rp 15.000" 
                  keyboardType="numeric"
                  style={styles.input}
                  value={form.discount_price}
                  onChangeText={(t) => setForm({...form, discount_price: t})}
                />
             </View>
          </View>

          <View style={styles.rowInputs}>
             <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Stok Tersisa</Text>
                <TextInput 
                  placeholder="5" 
                  keyboardType="numeric"
                  style={styles.input}
                  value={form.stock}
                  onChangeText={(t) => setForm({...form, stock: t})}
                />
             </View>
             <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Jam Ambil</Text>
                <TextInput 
                  placeholder="18:00 - 20:00" 
                  style={styles.input}
                  value={form.pickup_time}
                  onChangeText={(t) => setForm({...form, pickup_time: t})}
                />
             </View>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]} 
            onPress={handleAddFood}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color={COLORS.white} /> : (
              <>
                <Text style={styles.submitButtonText}>Bagikan Sisa Lezat!</Text>
              </>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
