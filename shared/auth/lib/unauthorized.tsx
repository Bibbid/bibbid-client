import { useAuth } from '../model';
import { Href, Redirect } from 'expo-router';
import type { PropsWithChildren } from 'react';

interface UnauthorizedProps extends PropsWithChildren {
  fallback?: Href;
}

export default function Unauthorized({
  children,
  fallback = '/',
}: UnauthorizedProps) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={fallback} />;
  }

  return <>{children}</>;
}
