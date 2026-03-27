import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Clock } from 'lucide-react-native';
import { COLORS } from '../styles/theme';
import { styles } from '../styles/components/TimeRangePicker.styles';
import { useTimeRangePicker, toTimeString, HOURS, MINUTES } from '../hooks/useTimeRangePicker';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

// ─── Sub-komponen: Satu kolom scroll ──────────
const ScrollPicker = ({
  values, selected, onSelect,
}: { values: number[]; selected: number; onSelect: (v: number) => void }) => (
  <ScrollView style={styles.scrollCol} showsVerticalScrollIndicator={false}>
    {values.map(v => (
      <TouchableOpacity
        key={v}
        style={[styles.scrollItem, v === selected && styles.scrollItemActive]}
        onPress={() => onSelect(v)}
      >
        <Text style={[styles.scrollItemText, v === selected && styles.scrollItemTextActive]}>
          {v.toString().padStart(2, '0')}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

// ─── Komponen Utama ────────────────────────────
export const TimeRangePicker = ({ value, onChange }: Props) => {
  const {
    startStr, endStr,
    picking, tempH, tempM,
    setTempH, setTempM,
    openPicker, confirmPick, cancelPick,
  } = useTimeRangePicker({ value, onChange });

  return (
    <View>
      {/* Dua tombol jam */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.timeButton} onPress={() => openPicker('start')}>
          <Clock size={16} color={COLORS.primary} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.timeLabel}>Mulai</Text>
            <Text style={styles.timeValue}>{startStr}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.dash}>→</Text>

        <TouchableOpacity style={styles.timeButton} onPress={() => openPicker('end')}>
          <Clock size={16} color={COLORS.primary} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.timeLabel}>Selesai</Text>
            <Text style={styles.timeValue}>{endStr}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal Picker */}
      <Modal visible={!!picking} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>
              Pilih Jam {picking === 'start' ? 'Mulai' : 'Selesai'}
            </Text>

            {/* Preview jam terpilih */}
            <View style={styles.preview}>
              <Text style={styles.previewText}>{toTimeString(tempH, tempM)}</Text>
            </View>

            {/* Label kolom */}
            <View style={styles.pickerRow}>
              <Text style={styles.colLabel}>Jam</Text>
              <Text style={styles.colLabel}>Menit</Text>
            </View>

            {/* Scroll Jam & Menit */}
            <View style={styles.pickerRow}>
              <ScrollPicker values={HOURS} selected={tempH} onSelect={setTempH} />
              <Text style={styles.colon}>:</Text>
              <ScrollPicker values={MINUTES} selected={tempM} onSelect={setTempM} />
            </View>

            {/* Tombol Batal & Konfirmasi */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={cancelPick}>
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={confirmPick}>
                <Text style={styles.confirmText}>Konfirmasi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};