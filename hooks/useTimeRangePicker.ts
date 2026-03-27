import { useState } from 'react';

// ─── Helper ───────────────────────────────────
export const toTimeString = (h: number, m: number) =>
  `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

export const parseTime = (str: string) => {
  const [h, m] = str.split(':').map(Number);
  return { h: isNaN(h) ? 18 : h, m: isNaN(m) ? 0 : m };
};

export const HOURS = Array.from({ length: 24 }, (_, i) => i);
export const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// ─── Hook ─────────────────────────────────────
interface UseTimeRangePickerProps {
  value: string;           // "HH:MM - HH:MM"
  onChange: (val: string) => void;
}

export const useTimeRangePicker = ({ value, onChange }: UseTimeRangePickerProps) => {
  const parts = value.split(' - ');
  const startStr = parts[0] || '18:00';
  const endStr = parts[1] || '20:00';

  const [picking, setPicking] = useState<'start' | 'end' | null>(null);
  const [tempH, setTempH] = useState(0);
  const [tempM, setTempM] = useState(0);

  const openPicker = (which: 'start' | 'end') => {
    const { h, m } = parseTime(which === 'start' ? startStr : endStr);
    setTempH(h);
    setTempM(m);
    setPicking(which);
  };

  const confirmPick = () => {
    const timeStr = toTimeString(tempH, tempM);
    if (picking === 'start') onChange(`${timeStr} - ${endStr}`);
    else onChange(`${startStr} - ${timeStr}`);
    setPicking(null);
  };

  const cancelPick = () => setPicking(null);

  return {
    startStr,
    endStr,
    picking,
    tempH,
    tempM,
    setTempH,
    setTempM,
    openPicker,
    confirmPick,
    cancelPick,
  };
};
