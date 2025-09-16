import { Stack } from 'expo-router';
import { Unauthorized } from '~/shared/auth';

export default function UnauthorizedLayout() {
  return (
    <Unauthorized>
      <Stack screenOptions={{ headerShown: false }} />
    </Unauthorized>
  );
}
