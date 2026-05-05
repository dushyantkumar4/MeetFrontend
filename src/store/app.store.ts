
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  notifications: Notification[];
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      theme: 'dark',
      notifications: [],
      setTheme: (theme) => set({ theme }, false, 'setTheme'),
      addNotification: (notification) =>
        set(
          (state) => ({ notifications: [...state.notifications, notification] }),
          false,
          'addNotification'
        ),
      removeNotification: (id) =>
        set(
          (state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }),
          false,
          'removeNotification'
        ),
    }),
    { name: 'AppStore' }
  )
);