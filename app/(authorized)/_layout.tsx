import { Stack, useRouter } from 'expo-router';
import { BookOpen, FlaskConical, Grid } from 'lucide-react-native';
import { Authorized } from '~/shared/auth';
import { BottomNavigation, BottomNavItem } from '~/shared/ui/navigation';

export default function AuthorizedLayout() {
  const router = useRouter();

  return (
    <Authorized>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNavigation>
        <BottomNavItem
          Icon={FlaskConical}
          label="Foundation"
          onPress={() => router.push('/(authorized)/foundation')}
        />
        <BottomNavItem
          Icon={BookOpen}
          label="Feed"
          onPress={() => router.push('/(authorized)/feed')}
        />
        <BottomNavItem
          Icon={Grid}
          label="Masonry Grid"
          onPress={() => router.push('/(authorized)/foundation/masonry-grid')}
        />
      </BottomNavigation>
    </Authorized>
  );
}
