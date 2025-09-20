import { Stack, useRouter } from 'expo-router';
import { BookOpen, Home, UserCircle } from 'lucide-react-native';
import { StatusBar } from 'react-native';
import { Authorized } from '~/shared/auth';
import { BottomNavigation, BottomNavItem } from '~/shared/ui/navigation';

export default function AuthorizedLayout() {
  const router = useRouter();

  return (
    <Authorized>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNavigation>
        <BottomNavItem
          Icon={Home}
          label="Home"
          onPress={() => router.push('/(authorized)/home')}
        />
        <BottomNavItem
          Icon={BookOpen}
          label="Feed"
          onPress={() => router.push('/(authorized)/feed')}
        />
        <BottomNavItem
          Icon={UserCircle}
          label="My"
          onPress={() => router.push('/(authorized)/profile')}
        />
      </BottomNavigation>
    </Authorized>
  );
}
