import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme';

export const styles = StyleSheet.create({
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, height: 60, backgroundColor: COLORS.white, borderRadius: RADIUS.xl, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  navItem: { padding: 10 }
});
