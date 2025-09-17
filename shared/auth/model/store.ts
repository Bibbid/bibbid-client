import { Authorization } from './schemas';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface AuthState extends Authorization {
  signIn: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isSignedIn: false,
  accessToken: null,
  refreshToken: null,
  signIn: async ({ accessToken, refreshToken }) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);

    set({ accessToken, refreshToken, isSignedIn: true });
  },
  signOut: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');

    set({ accessToken: null, refreshToken: null, isSignedIn: false });
  },
  initialize: async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (accessToken && refreshToken) {
        console.log('[INFO] device auth info is found');
        console.log('[INFO] accessToken', accessToken);
        console.log('[INFO] refreshToken', refreshToken);

        set({
          ...get(),
          accessToken,
          refreshToken,
          isSignedIn: true,
        });
      } else {
        console.warn('[INFO] device auth info is not found');
      }
    } catch {
      console.warn('[INFO] find device auth info is failed');

      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');

      set({
        ...get(),
        accessToken: null,
        refreshToken: null,
        isSignedIn: false,
      });
    }
  },
}));
