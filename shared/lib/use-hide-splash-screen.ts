import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function useHideSplashScreen() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);
}
