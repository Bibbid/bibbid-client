import { masonryGridStyles } from './masonry-grid.styles';
import {
  FlashList,
  type FlashListProps,
  type ListRenderItem,
} from '@shopify/flash-list';
import { Image, type ImageStyle } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { View, type StyleProp } from 'react-native';

interface MasonryGridProps<TItem extends BaseMasonryGridItemProps>
  extends FlashListProps<TItem> {
  data: TItem[];
  renderItem: ListRenderItem<TItem>;
}

interface BaseMasonryGridItemProps {
  src: string;
}

export function MasonryGrid<TItem extends BaseMasonryGridItemProps>({
  data,
  renderItem,
  ...props
}: MasonryGridProps<TItem>) {
  return (
    <FlashList
      masonry
      data={data}
      renderItem={renderItem}
      numColumns={2}
      optimizeItemArrangement={false}
      contentContainerStyle={masonryGridStyles.container}
      ItemSeparatorComponent={() => (
        <View style={masonryGridStyles.separator} />
      )}
      {...props}
    />
  );
}

interface MasonryGridItemProps<TItem extends BaseMasonryGridItemProps> {
  index: number;
  total: number;
  item: TItem;
  style?: StyleProp<ImageStyle>;
}

export function MasonryGridItem<TItem extends BaseMasonryGridItemProps>({
  item,
  index,
  style,
  total,
}: MasonryGridItemProps<TItem>) {
  const isEvenColumn = index % 2 === 0;

  const getHeight = useCallback(() => {
    return index === total - 2 || index === 1 ? 156 : 206;
  }, [index, total]);

  return (
    <View
      style={[
        isEvenColumn ? { paddingRight: 4 } : { paddingLeft: 4 },
        masonryGridStyles.imageContainer,
      ]}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        style={masonryGridStyles.topGradient}
      />
      <Image
        source={{ uri: item.src }}
        style={[
          masonryGridStyles.image,
          {
            height: getHeight(),
          },
          style,
        ]}
        contentFit="cover"
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0 }}
        style={masonryGridStyles.bottomGradient}
      />
    </View>
  );
}
