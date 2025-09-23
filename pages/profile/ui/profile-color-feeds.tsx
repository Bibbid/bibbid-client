import { FlashList } from '@shopify/flash-list';
import { SuspenseInfiniteQuery, SuspenseQuery } from '@suspensive/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FeedListItem } from '~/entities/feed';
import {
  FeedInfo,
  getInfiniteMyColorFeedsOptions,
  getMyFeedCountsOptions,
} from '~/features/feed';
import { Loading } from '~/shared/ui/loading';
import { CustomText } from '~/shared/ui/text';

interface ProfileColorFeedsProps {
  color: string;
}

export default function ProfileColorFeeds({ color }: ProfileColorFeedsProps) {
  return (
    <SuspenseQuery {...getMyFeedCountsOptions()}>
      {({ data }) => {
        const count = data.find((item) => item.color === color)?.count;

        return (
          <Suspense fallback={<Loading />}>
            <ProfileColorFeedsContent color={color} count={count ?? 0} />
          </Suspense>
        );
      }}
    </SuspenseQuery>
  );
}

interface ProfileColorFeedsContentProps {
  color: string;
  count: number;
}

function ProfileColorFeedsContent({
  color,
  count,
}: ProfileColorFeedsContentProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    getInfiniteMyColorFeedsOptions({ color, cursor: 0, size: 20 })
  );

  return (
    data && (
      <View style={styles.container}>
        <View style={styles.header}>
          <CustomText style={styles.title}>{color}</CustomText>
          <CustomText
            style={[
              styles.amount,
              { color: data.pages[0][0].color.rgbHexCode },
            ]}>
            {count}
          </CustomText>
        </View>
        <FlashList
          data={data.pages.flatMap((page) => page)}
          renderItem={({ item }) => (
            <FeedInfo
              image={item.image}
              color={item.color}
              profileImage={item.uploader.buddyImage}
              createdAt={item.createdAt}
              name={item.uploader.buddyName}
              description={item.uploader.introduction ?? ''}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <>{isLoading && <Loading />}</>}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 20,
    columnGap: 8,
    height: 56,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  amount: {
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  separator: {
    width: '100%',
    height: 24,
  },
}));
