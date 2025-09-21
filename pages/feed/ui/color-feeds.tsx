import { useSelectedColor } from './color-palette';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MoreHorizontal } from 'lucide-react-native';
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Dot from '~/assets/icons/dot-solid.svg';
import { FeedListItem } from '~/entities/feed';
import { getInfiniteColorFeedsOptions } from '~/features/feed';
import { Chip } from '~/shared/ui/chip';
import { CustomText } from '~/shared/ui/text';

interface ColorFeedsProps {
  color?: string;
}

export default function ColorFeeds({ color }: ColorFeedsProps) {
  const { selectedColor } = useSelectedColor();

  return <ColorFeedList color={color ?? selectedColor} />;
}

function ColorFeedList({ color }: { color: string }) {
  const {
    data: feedData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(getInfiniteColorFeedsOptions({ color, cursor: 0 }));

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
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
        style={styles.bottomGradient}
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
      <View style={styles.imageOverlay}>
        <View style={styles.imageOverlayHeader}>
          <CustomText style={styles.imageOverlayHeaderText}>
            {data.uploader.buddyName}
          </CustomText>
          <Pressable>
            <MoreHorizontal size={16} color="white" />
          </Pressable>
        </View>
        <View style={styles.imageOverlayFooter}>
          <Chip
            label={data.color.displayName}
            type="tinted"
            leftIcon={Dot}
            customColor={data.color.rgbHexCode}
          />
        </View>
      </View>
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
  imageOverlay: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageOverlayHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  imageOverlayHeaderText: {
    color: 'white',
    fontSize: theme.fontSize['xs'],
  },
  imageOverlayFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 8,
  },
}));
