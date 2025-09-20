import { CustomText } from '../text';
import { topNavigationStyles } from './top-navigation.styles';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, type StyleProp, View, type ViewStyle } from 'react-native';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

interface TopNavigationProps {
  style?: StyleProp<ViewStyle>;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function TopNavigation({
  left,
  center,
  right,
  style,
}: TopNavigationProps) {
  return (
    <View style={[topNavigationStyles.container, style]}>
      {left ? left : <BlankNavItem />}
      {center ? center : <BlankNavItem />}
      {right ? right : <BlankNavItem />}
    </View>
  );
}

export function NavBackButton() {
  const router = useRouter();

  const theme = useAnimatedTheme();

  return (
    <Pressable style={topNavigationStyles.back} onPress={() => router.back()}>
      <ChevronLeft size={24} color={theme.value.color['gray-5']} />
    </Pressable>
  );
}

export function NavCenterTitle({ title }: { title: string }) {
  return <CustomText style={topNavigationStyles.title}>{title}</CustomText>;
}

export function BlankNavItem() {
  return <View style={topNavigationStyles.blank} />;
}
