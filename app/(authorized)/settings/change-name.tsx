import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import {
  BlankNavItem,
  NavBackButton,
  NavCenterTitle,
  TopNavigation,
} from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function ChangeName() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TopNavigation
        left={<NavBackButton />}
        center={<NavCenterTitle title="Change Name" />}
        right={<BlankNavItem />}
      />

      <CustomText>Change Name</CustomText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['md'],
    fontWeight: theme.fontWeight['medium'],
  },
}));
