import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import Feed from '~/assets/icons/bulb.svg';
import Home from '~/assets/icons/home.svg';
import Profile from '~/assets/icons/user-circle.svg';
import { Authorized } from '~/shared/auth';
import { BottomNavigation, BottomNavItem } from '~/shared/ui/navigation';

export default function AuthorizedLayout() {
  return (
    <Authorized>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }} />
      <BottomNavigation>
        <BottomNavItem Icon={Home} label="Home" href="/(authorized)/home" />
        <BottomNavItem Icon={Feed} label="Feed" href="/(authorized)/feed" />
        <BottomNavItem Icon={Profile} label="My" href="/(authorized)/profile" />
      </BottomNavigation>
    </Authorized>
  );
}
