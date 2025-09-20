import { useAuthStore } from './store';
import { useRouter } from 'expo-router';
import { showToast } from '~/shared/ui/toast';

export default function useAuth() {
  const router = useRouter();
  const { accessToken, refreshToken, signIn, signOut } = useAuthStore();

  const signOutWithRedirect = async (callback?: () => void) => {
    await signOut();
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
