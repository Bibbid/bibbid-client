import { useAuthStore } from './store';
import { useRouter } from 'expo-router';

export default function useAuth() {
  const router = useRouter();
  const { accessToken, refreshToken, signIn, signOut } = useAuthStore();

  const signOutWithRedirect = async () => {
    await signOut();
    router.replace('/');
  };

  return {
    isSignedIn: !!refreshToken,
    accessToken,
    refreshToken,
    signIn,
    signOut: signOutWithRedirect,
  };
}
