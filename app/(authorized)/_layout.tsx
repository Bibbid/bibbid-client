import { Href, Stack } from 'expo-router';
import { StatusBar, View } from 'react-native';
import Feed from '~/assets/icons/bulb.svg';
import Home from '~/assets/icons/home.svg';
import Profile from '~/assets/icons/user-circle.svg';
import { Authorized } from '~/shared/auth';
import { useActiveRoutes } from '~/shared/lib';
import { BottomNavigation, BottomNavItem } from '~/shared/ui/navigation';

const GNB_HIDE_PATHS: Href[] = [
  '/(authorized)/home/today-color',
  '/(authorized)/settings/change-name',
  '/(authorized)/home/upload',
  '/(authorized)/profile/buddy',
  '/(authorized)/feed/report',
];

const GNB_HEIGHT = 56;

export default function AuthorizedLayout() {
  const isGnbHideRoute = useActiveRoutes(GNB_HIDE_PATHS);

  return (
    <Authorized>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, paddingBottom: isGnbHideRoute ? 0 : GNB_HEIGHT }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      {!isGnbHideRoute && (
        <BottomNavigation>
          <BottomNavItem Icon={Home} label="Home" href="/(authorized)/home" />
          <BottomNavItem Icon={Feed} label="Feed" href="/(authorized)/feed" />
          <BottomNavItem
            Icon={Profile}
            label="My"
            href="/(authorized)/profile"
          />
        </BottomNavigation>
      )}
    </Authorized>
  );
}
