import ErrorScreen from '../error';
import { ErrorBoundary } from '@suspensive/react';
import { Stack } from 'expo-router';
import { Unauthorized } from '~/shared/auth';

export default function UnauthorizedLayout() {
  return (
    <ErrorBoundary fallback={<ErrorScreen />}>
      <Unauthorized>
        <Stack screenOptions={{ headerShown: false }} />
      </Unauthorized>
    </ErrorBoundary>
  );
}
