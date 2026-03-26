import React from 'react';
import { View, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { styles } from '../styles/components/SearchBar.styles';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: Props) => (
  <View style={styles.searchContainer}>
    <Search size={20} color="#999" style={styles.searchIcon} />
    <TextInput 
      placeholder="Cari roti atau resto..." 
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
    />
  </View>
);