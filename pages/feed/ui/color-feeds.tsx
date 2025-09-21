import getInfiniteColorFeeds from '../model/get-infinite-color-feeds-options';
import { useSelectedColor } from './color-palette';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FeedListItem } from '~/entities/feed';

export default function ColorFeeds() {
  const { selectedColor } = useSelectedColor();

  return (
    <View>
      <ColorFeedList color={selectedColor} />
    </View>
  );
}

function ColorFeedList({ color }: { color: string }) {
  const {
    data: feedData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(getInfiniteColorFeeds({ color, cursor: 0 }));

  const feeds = useMemo(
    () => feedData?.pages.flatMap((page) => page) ?? [],
    [feedData]
  );

  return (
    feeds && (
      <FlashList
        masonry
        data={feeds}
        renderItem={({ item, index }) => (
          <ColorFeedItem data={item} index={index} total={feeds.length} />
        )}
        numColumns={2}
        optimizeItemArrangement={false}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => (
          <>
            <View style={styles.spacing} />
            {isLoading && <ActivityIndicator />}
          </>
        )}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        extraData={color}
      />
    )
  );
}

function ColorFeedItem({
  data,
  index,
  total,
}: {
  data: FeedListItem;
  index: number;
  total: number;
}) {
  const router = useRouter();

  const isEvenColumn = index % 2 === 0;

  const getHeight = useCallback(() => {
    return index === total - 2 || index === 1 ? 156 : 206;
  }, [index, total]);

  return (
    <Pressable
      onPress={() => router.push(`/feed/feed-detail?feedId=${data.feedId}`)}
      style={[
        isEvenColumn ? { paddingRight: 4 } : { paddingLeft: 4 },
        styles.imageContainer,
      ]}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.topGradient}
      />
      <Image
        source={{ uri: data.image.presignedUrl }}
        style={[
          styles.image,
          {
            height: getHeight(),
          },
        ]}
        contentFit="cover"
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
        style={styles.bottomGradient}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    minWidth: 156,
    width: '100%',
    borderRadius: theme.radius['xs'],
  },
  spacing: {
    width: '100%',
    height: 12,
  },
  separator: {
    width: '100%',
    height: 14,
  },
  topGradient: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
}));
