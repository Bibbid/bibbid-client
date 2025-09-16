import { Redirect } from 'expo-router';
import { useAuth } from '~/shared/auth';

export default function Root() {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <Redirect href="/(authorized)/foundation" />
  ) : (
    <Redirect href="/(unauthorized)/sign-in" />
  );
}
