import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, ChevronLeft, Check } from 'lucide-react-native';
import { addFoodItem, uploadFoodImage } from '../lib/services/food';
import { styles } from '../styles/screens/MerchantScreen.styles';
import { COLORS } from '../styles/theme';
import { TimeRangePicker } from '../components/TimeRangePicker';

export default function MerchantScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    store_name: '',
    original_price: '',
    discount_price: '',
    stock: '',
    pickup_time: '18:00 - 20:00',
    category: 'Bakery', // Default category
  });

  const categories = ['Bakery', 'Meals', 'Snacks', 'Beverages', 'Other'];

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
    const { name, store_name, original_price, discount_price, stock, pickup_time, category } = form;

    if (!name || !store_name || !original_price || !discount_price || !stock || !category) {
      return Alert.alert('Halo!', 'Pastikan semua kolom sudah terisi ya.');
    }

    setLoading(true);
    try {
      let finalImageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

      if (image) {
        const uploadedUrl = await uploadFoodImage(image);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      const foodData = {
        name,
        store_name,
        original_price: parseInt(original_price),
        discount_price: parseInt(discount_price),
        stock: parseInt(stock),
        pickup_time,
        category, // Include category in DB
        image_url: finalImageUrl,
      };

      await addFoodItem(foodData);
      Alert.alert('Sukses!', 'Makanan Anda kini sudah tampil dengan kategori yang tepat!');
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
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.headerArea}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <ChevronLeft color={COLORS.primary} size={24} />
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

          {/* Category Selection (Checkbox Style) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kategori Makanan</Text>
            <View style={styles.checkboxContainer}>
              {categories.map((cat) => (
                <TouchableOpacity 
                  key={cat}
                  style={styles.checkboxItem}
                  onPress={() => setForm({...form, category: cat})}
                >
                  <View style={[
                    styles.checkboxBase,
                    form.category === cat && styles.checkboxChecked
                  ]}>
                    {form.category === cat && <Check size={12} color={COLORS.white} />}
                  </View>
                  <Text style={[
                    styles.checkboxLabel,
                    form.category === cat && styles.checkboxLabelActive
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
          </View>

           {/* Time Range Picker */}
           <View style={styles.inputGroup}>
             <Text style={styles.label}>Jam Ambil</Text>
             <TimeRangePicker
               value={form.pickup_time}
               onChange={(val) => setForm({...form, pickup_time: val})}
             />
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
