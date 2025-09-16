import { ScrollView, View } from 'react-native';
import { MasonryGrid } from '~/shared/ui/masonry-grid';
import { MasonryGridItem } from '~/shared/ui/masonry-grid/masonry-grid';
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

export default function TestMasonryGridPage() {
  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        left={
          <CustomText style={{ color: 'white', fontSize: 16 }}>Left</CustomText>
        }
        center={
          <CustomText style={{ color: 'white', fontSize: 16 }}>
            Foundation
          </CustomText>
        }
        right={
          <CustomText style={{ color: 'white', fontSize: 16 }}>
            Right
          </CustomText>
        }
      />
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
