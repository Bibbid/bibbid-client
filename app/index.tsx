import { Redirect } from 'expo-router';
import { useAuth } from '~/shared/auth';

export default function Root() {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <Redirect href="/(authorized)/home" />
  ) : (
    <Redirect href="/(unauthorized)/sign-in" />
  );
}
