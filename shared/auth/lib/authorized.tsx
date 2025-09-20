import { useAuth } from '../model';
import { Href, Redirect } from 'expo-router';
import type { PropsWithChildren } from 'react';

interface AuthorizedProps extends PropsWithChildren {
  fallback?: Href;
}

export default function Authorized({
  children,
  fallback = '/',
}: AuthorizedProps) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={fallback} />;
  }

  return <>{children}</>;
}
