import { Stack } from 'expo-router';
import { Authorized } from '~/shared/auth';

export default function AuthorizedLayout() {
  return (
    <Authorized>
      <Stack screenOptions={{ headerShown: false }} />
    </Authorized>
  );
}
