import { SuspenseQuery } from '@suspensive/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Suspense } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FeedReport } from '~/pages/feed';
import getFeedDetailOptions from '~/pages/feed/model/get-feed-detail-options';
import { Loading } from '~/shared/ui/loading';
import {
  BlankNavItem,
  NavBackButton,
  NavCenterTitle,
  TopNavigation,
} from '~/shared/ui/navigation';

export default function ReportScreen() {
  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  return (
    <View style={styles.container}>
      <TopNavigation
        left={<NavBackButton />}
        center={<NavCenterTitle title="Report" />}
        right={<BlankNavItem />}
      />
      {feedId && (
        <Suspense fallback={<Loading />}>
          <SuspenseQuery {...getFeedDetailOptions(Number(feedId))}>
            {({ data }) => <FeedReport data={data} />}
          </SuspenseQuery>
        </Suspense>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight['semibold'],
    paddingHorizontal: 8,
  },
}));
