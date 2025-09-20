import { CustomText } from '../text';
import { bottomNavigationStyles } from './bottom-navigation.styles';
import { Href, useRouter } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { useActiveRoute } from '~/shared/lib';

export function BottomNavigation({ children }: PropsWithChildren) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[bottomNavigationStyles.safeArea, { paddingBottom: bottom }]}>
      <View style={bottomNavigationStyles.container}>{children}</View>
    </View>
  );
}

interface BottomNavItemProps {
  Icon: React.FC<SvgProps>;
  label: string;
  href: Href;
}

export function BottomNavItem({ Icon, label, href }: BottomNavItemProps) {
  const theme = useAnimatedTheme();

  const router = useRouter();

  const isActive = useActiveRoute(href);

  bottomNavigationStyles.useVariants({
    active: isActive,
  });

  return (
    <Pressable
      style={bottomNavigationStyles.item}
      onPress={() => router.push(href)}>
      <Icon
        width={24}
        height={24}
        color={
          isActive ? theme.value.color['gray-11'] : theme.value.color['gray-5']
        }
      />
      <CustomText style={bottomNavigationStyles.label}>{label}</CustomText>
    </Pressable>
  );
}
