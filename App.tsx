import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import LoginScreen from './screens/LoginScreen';
import MerchantScreen from './screens/MerchantScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyPostsScreen from './screens/MyPostsScreen';

// Hooks & Theme
import { useAuth } from './hooks/useAuth';
import { COLORS } from './styles/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const { session, loading } = useAuth();

  // Tampilkan loading screen saat mengecek status login (Sangat Premium!)
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          // Jika SUDAH LOGIN, tampilkan aplikasi utama
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Merchant" component={MerchantScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="MyPosts" component={MyPostsScreen} />
          </>
        ) : (
          // Jika BELUM LOGIN, tampilkan hanya layar login
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}