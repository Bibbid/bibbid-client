import { useAuthStore } from './store';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { showToast } from '~/shared/ui/toast';

export default function useAuth() {
  const router = useRouter();

  const { accessToken, refreshToken, signIn, signOut } = useAuthStore();

  const queryClient = useQueryClient();

  const signOutWithRedirect = async (callback?: () => void) => {
    await signOut();
    queryClient.clear();
    router.replace('/');

    showToast({ text1: 'Logged out successfully' });
    callback?.();
  };

  return {
    isSignedIn: !!refreshToken,
    accessToken,
    refreshToken,
    signIn,
    signOut: signOutWithRedirect,
  };
}
