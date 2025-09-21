import { SuspenseQuery } from '@suspensive/react-query';
import { Suspense } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { getMyProfileOptions } from '~/pages/profile';
import { ChangeName } from '~/pages/settings';
import { Loading } from '~/shared/ui/loading';
import {
  BlankNavItem,
  NavBackButton,
  NavCenterTitle,
  TopNavigation,
} from '~/shared/ui/navigation';

export default function ChangeNameScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TopNavigation
        left={<NavBackButton />}
        center={<NavCenterTitle title="Change Name" />}
        right={<BlankNavItem />}
      />
      <Suspense fallback={<Loading />}>
        <SuspenseQuery {...getMyProfileOptions()}>
          {({ data }) => <ChangeName name={data.name} />}
        </SuspenseQuery>
      </Suspense>
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
