import { bottomNavigationStyles } from './bottom-navigation.styles';
import { LucideIcon } from 'lucide-react-native';
import type { PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

export function BottomNavigation({ children }: PropsWithChildren) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[bottomNavigationStyles.safeArea, { paddingBottom: bottom }]}>
      <View style={bottomNavigationStyles.container}>{children}</View>
    </View>
  );
}

interface BottomNavItemProps {
  Icon: LucideIcon;
  label: string;
  onPress: () => void;
  active?: boolean;
}

export function BottomNavItem({
  Icon,
  label,
  onPress,
  active,
}: BottomNavItemProps) {
  const theme = useAnimatedTheme();

  bottomNavigationStyles.useVariants({
    active,
  });

  return (
    <Pressable style={bottomNavigationStyles.item} onPress={onPress}>
      <Icon
        size={24}
        color={
          active ? theme.value.color['gray-11'] : theme.value.color['gray-5']
        }
      />
      <Text style={bottomNavigationStyles.label}>{label}</Text>
    </Pressable>
  );
}
