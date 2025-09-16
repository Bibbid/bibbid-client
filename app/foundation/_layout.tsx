import { Stack, useRouter } from 'expo-router';
import { FlaskConical, Grid, Home } from 'lucide-react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BottomNavigation, BottomNavItem } from '~/shared/ui/navigation';

export default function Layout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{ contentStyle: styles.content, headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <BottomNavigation>
        <BottomNavItem
          Icon={Home}
          label="Home"
          onPress={() => router.push('/')}
        />
        <BottomNavItem
          Icon={FlaskConical}
          label="Foundation"
          onPress={() => router.push('/foundation')}
        />
        <BottomNavItem
          Icon={Grid}
          label="Masonry Grid"
          onPress={() => router.push('/foundation/masonry-grid')}
        />
      </BottomNavigation>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
  content: {
    backgroundColor: 'transparent',
    paddingBottom: 70,
  },
}));
