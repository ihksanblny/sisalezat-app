import { StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F5F7' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: SPACING.l, 
    backgroundColor: COLORS.white, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.border 
  },
  backButton: { padding: 8 },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text, marginTop: 16 },
  emptySub: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginTop: 8 },
  list: { padding: SPACING.l },
  card: { 
    backgroundColor: COLORS.white, 
    borderRadius: RADIUS.m, 
    padding: 15, 
    marginBottom: 15, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 5 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.grayLight },
  buyerInfo: { flex: 1, marginLeft: 10 },
  buyerName: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
  orderDate: { fontSize: 10, color: COLORS.textLighter },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderTopColor: '#F0F0F0' 
  },
  itemImage: { width: 50, height: 50, borderRadius: RADIUS.s },
  itemName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  pickupTime: { fontSize: 12, color: COLORS.textLight },
  statusTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  statusTextSuccess: { backgroundColor: '#D1E7DD' },
  statusTextPending: { backgroundColor: '#FFF3CD' },
  completeButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: COLORS.primary, 
    borderRadius: RADIUS.s, 
    padding: 10, 
    marginTop: 10,
    gap: 8
  },
  completeText: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 }
});
