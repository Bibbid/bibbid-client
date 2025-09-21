import getRandomFeedsOptions from '../model/get-random-feeds-options';
import getTodayColorFeedsOptions from '../model/get-today-color-feeds-options';
import { SuspenseQuery } from '@suspensive/react-query';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Suspense, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { StyleSheet } from 'react-native-unistyles';
import { FeedListItem } from '~/entities/feed';
import { CustomText } from '~/shared/ui/text';

export default function WhatsNewSection() {
  // TEMP
  const hasColor = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title}>What&apos;s New</CustomText>
        <CustomText style={styles.description}>
          Go ahead and try image surfing
        </CustomText>
      </View>
      <Suspense>
        {hasColor ? (
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
        renderItem={({ item: { image, feedId } }) => (
          <ImageSlide id={feedId} src={image.presignedUrl} />
        )}
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
  id: number;
  src: string;
}

function ImageSlide({ id, src }: ImageSlideProps) {
  return (
    <View key={id} style={styles.slide}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.topGradient}
      />
      <Image source={{ uri: src }} style={styles.image} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
        style={styles.bottomGradient}
      />
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
}));
