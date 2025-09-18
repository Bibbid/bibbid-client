import { Image } from 'expo-image';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { StyleSheet } from 'react-native-unistyles';
import { CustomText } from '~/shared/ui/text';

const MOCK_IMAGES = [
  {
    id: 1,
    src: 'https://picsum.photos/200/300',
  },

  {
    id: 2,
    src: 'https://picsum.photos/200/300',
  },

  {
    id: 3,
    src: 'https://picsum.photos/200/300',
  },
];

export default function HeroImageSlide() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title}>What&apos;s New</CustomText>
        <CustomText style={styles.description}>
          Go ahead and try image surfing
        </CustomText>
      </View>
      <PagerView style={styles.pagerView}>
        {MOCK_IMAGES.map((image) => (
          <View key={image.id} style={styles.slide}>
            <Image source={{ uri: image.src }} style={styles.image} />
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 4,
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
  pagerView: {
    width: '100%',
    height: 288,
  },
  slide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: 288,
  },
  image: {
    width: 288,
    height: '100%',
  },
}));
