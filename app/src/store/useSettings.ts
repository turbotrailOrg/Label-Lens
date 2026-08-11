import { create } from 'zustand';
import { UserSettings } from '../types';

interface SettingsStore {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

export const useSettings = create<SettingsStore>((set) => ({
  settings: {
    country: 'Global',
    dietaryPreferences: [],
    allergies: [],
  },
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));
