import { useAuthStore } from '../model';
import { type PropsWithChildren, useEffect } from 'react';

export default function AuthLoaded({ children }: PropsWithChildren) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
