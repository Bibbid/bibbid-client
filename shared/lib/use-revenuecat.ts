import { useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

export default function useRevenueCat() {
  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (
      !process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_APPLE_API_KEY ||
      !process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY
    ) {
      throw new Error('RevenueCat API key is not set');
    }

    if (Platform.OS === 'ios') {
      Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_APPLE_API_KEY,
      });
    } else if (Platform.OS === 'android') {
      Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUECAT_PROJECT_GOOGLE_API_KEY,
      });
    }
  }, []);
}
