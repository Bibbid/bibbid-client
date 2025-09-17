import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ColorPalette } from '~/pages/feed';
import { MasonryGrid, MasonryGridItem } from '~/shared/ui/masonry-grid';
import { TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

const TEST_DATA = [
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
  {
    id: 4,
    src: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    src: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    src: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    src: 'https://picsum.photos/200/300',
  },
  {
    id: 8,
    src: 'https://picsum.photos/200/300',
  },
  {
    id: 9,
    src: 'https://picsum.photos/200/300',
  },
  {
    id: 10,
    src: 'https://picsum.photos/200/300',
  },
];

export default function Feed() {
  return (
    <View style={styles.container}>
      <View>
        <TopNavigation
          left={<CustomText style={styles.title}>Be Inspired</CustomText>}
        />
        <ColorPalette />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <MasonryGrid
          data={TEST_DATA}
          renderItem={({ item, index }) => (
            <MasonryGridItem
              item={item}
              index={index}
              total={TEST_DATA.length}
            />
          )}
        />
      </ScrollView>
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
