import getRandomFeedsOptions from '../model/get-random-feeds-options';
import getTodayColorFeedsOptions from '../model/get-today-color-feeds-options';
import { SuspenseQuery } from '@suspensive/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MoreHorizontal } from 'lucide-react-native';
import { Suspense, useRef } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { StyleSheet } from 'react-native-unistyles';
import Dot from '~/assets/icons/dot-solid.svg';
import { useTodayColor } from '~/entities/color';
import { FeedListItem } from '~/entities/feed';
import { Chip } from '~/shared/ui/chip';
import { CustomText } from '~/shared/ui/text';

export default function WhatsNewSection() {
  const { hasTodayColor } = useTodayColor();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title}>What&apos;s New</CustomText>
        <CustomText style={styles.description}>
          Go ahead and try image surfing!
        </CustomText>
      </View>
      <Suspense>
        {hasTodayColor ? (
          <SuspenseQuery {...getTodayColorFeedsOptions()}>
            {({ data }) => <TodayImageCarousel data={data} />}
          </SuspenseQuery>
        ) : (
          <SuspenseQuery {...getRandomFeedsOptions()}>
            {({ data }) => <TodayImageCarousel data={data} />}
          </SuspenseQuery>
        )}
      </Suspense>
    </View>
  );
}

function TodayImageCarousel({ data }: { data: FeedListItem[] }) {
  const ref = useRef<ICarouselInstance>(null);

  const progress = useSharedValue<number>(0);

  const width = Dimensions.get('window').width;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={styles['carousel-container']}>
      <Carousel
        ref={ref}
        width={width}
        height={width}
        data={data}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.8,
        }}
        renderItem={({ item }) => <ImageSlide data={item} />}
      />
      <Pagination.Custom
        progress={progress}
        data={data}
        containerStyle={styles['pagination-container']}
        activeDotStyle={styles['pagination-active-dot']}
        dotStyle={styles['pagination-dot']}
        onPress={onPressPagination}
      />
    </View>
  );
}

interface ImageSlideProps {
  data: FeedListItem;
}

function ImageSlide({ data }: ImageSlideProps) {
  return (
    <View key={data.feedId} style={styles.slide}>
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
      <Image source={{ uri: data.image.presignedUrl }} style={styles.image} />
      <View style={styles.imageOverlay}>
        <View style={styles.imageOverlayHeader}>
          <View style={styles.imageOverlayHeaderTop}>
            <Image
              source={{ uri: data.image.presignedUrl }}
              style={styles.imageOverlayHeaderImage}
            />
            <CustomText style={styles.imageOverlayHeaderText} numberOfLines={1}>
              {data.uploader.buddyName}
            </CustomText>
            <Pressable>
              <MoreHorizontal size={16} color="white" />
            </Pressable>
          </View>
          <View style={styles.imageOverlayHeaderBottom}>
            <Chip
              label={data.color.displayName}
              type="tinted"
              leftIcon={Dot}
              customColor={data.color.rgbHexCode}
            />
          </View>
        </View>
        <View style={styles.imageOverlayFooter}>
          <CustomText style={styles.imageOverlayText}>
            {formatDistanceToNow(new Date(data.createdAt))}
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
    paddingBottom: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 4,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight['semibold'],
    color: 'white',
  },
  description: {
    fontSize: theme.fontSize['sm'],
    color: theme.color['gray-8'],
  },
  'carousel-container': {
    position: 'relative',
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  'pagination-positioner': {
    position: 'absolute',
    bottom: 0,
  },
  'pagination-container': {
    position: 'absolute',
    bottom: 0,
    columnGap: 8,
  },
  'pagination-dot': {
    backgroundColor: theme.color['gray-3'],
    width: 4,
    height: 4,
    borderRadius: 50,
  },
  'pagination-active-dot': {
    backgroundColor: theme.color['opacity-white-50'],
    borderWidth: 1,
    borderColor: theme.color['opacity-white-16'],
    width: 24,
    height: 4,
    borderRadius: 50,
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageOverlayHeader: {
    width: '100%',
    padding: 12,
    rowGap: 12,
  },
  imageOverlayHeaderTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  imageOverlayHeaderImage: {
    width: 24,
    height: 24,
  },
  imageOverlayHeaderText: {
    flex: 1,
    color: 'white',
    fontSize: theme.fontSize['sm'],
    fontWeight: theme.fontWeight['medium'],
    textAlign: 'left',
  },
  imageOverlayHeaderBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  imageOverlayFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 14,
    rowGap: 4,
  },
  imageOverlayText: {
    flex: 1,
    color: theme.color['opacity-white-50'],
    fontSize: theme.fontSize['xs'],
    textAlign: 'center',
  },
}));
