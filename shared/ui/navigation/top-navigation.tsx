import { topNavigationStyles } from './top-navigation.styles';
import { View } from 'react-native';

interface TopNavigationProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function TopNavigation({ left, center, right }: TopNavigationProps) {
  return (
    <View style={topNavigationStyles.container}>
      {left ? left : <BlankNavItem />}
      {center ? center : <BlankNavItem />}
      {right ? right : <BlankNavItem />}
    </View>
  );
}

export function BlankNavItem() {
  return <View style={topNavigationStyles.blank} />;
}
