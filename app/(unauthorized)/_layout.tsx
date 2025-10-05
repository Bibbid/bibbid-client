import ErrorScreen from '../error';
import { ErrorBoundary } from '@suspensive/react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Unauthorized } from '~/shared/auth';

export default function UnauthorizedLayout() {
  return (
    <ErrorBoundary fallback={<ErrorScreen />}>
      <StatusBar style="light" />
      <Unauthorized>
        <Stack screenOptions={{ headerShown: false }} />
      </Unauthorized>
    </ErrorBoundary>
  );
}
