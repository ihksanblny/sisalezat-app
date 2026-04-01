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
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import HistoryScreen from './screens/HistoryScreen';
import IncomingOrdersScreen from './screens/IncomingOrdersScreen';

// Hooks & Theme
import { useAuth } from './hooks/useAuth';
import { COLORS } from './styles/theme';

const Stack = createNativeStackNavigator();

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Detail" component={DetailScreen} />
              <Stack.Screen name="Merchant" component={MerchantScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="MyPosts" component={MyPostsScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="Favorites" component={FavoritesScreen} />
              <Stack.Screen name="History" component={HistoryScreen} />
              <Stack.Screen name="IncomingOrders" component={IncomingOrdersScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}