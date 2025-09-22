import { FlashList } from '@shopify/flash-list';
import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Color, getCollectedColorOptions } from '~/entities/color';
import type { ColorFeed } from '~/entities/profile';
import { hexToRgba } from '~/shared/lib';
import { Folder } from '~/shared/ui/folder';
import { CustomText } from '~/shared/ui/text';

interface ProfileFeedsProps {
  colors: Color[];
  count: number;
}

const MOCK_DATA: ColorFeed[] = [
  {
    color: 'Red',
    feedCount: 10,
    latestFeedImages: [
      { objectKey: '1', presignedUrl: 'https://picsum.photos/200/300' },
      { objectKey: '2', presignedUrl: 'https://picsum.photos/200/300' },
      { objectKey: '3', presignedUrl: 'https://picsum.photos/200/300' },
    ],
    latestComment: 'Comment',
  },
  {
    color: 'Orange',
    feedCount: 10,
    latestFeedImages: [
      { objectKey: '1', presignedUrl: 'https://picsum.photos/200/300' },
    ],
    latestComment: 'Comment',
  },
  {
    color: 'Yellow',
    feedCount: 10,
    latestFeedImages: [
      { objectKey: '1', presignedUrl: 'https://picsum.photos/200/300' },
    ],
    latestComment: 'Comment',
  },
  {
    color: 'Green',
    feedCount: 10,
    latestFeedImages: [
      { objectKey: '1', presignedUrl: 'https://picsum.photos/200/300' },
    ],
    latestComment: 'Comment',
  },
  {
    color: 'Blue',
    feedCount: 10,
    latestFeedImages: [
      { objectKey: '1', presignedUrl: 'https://picsum.photos/200/300' },
    ],
    latestComment: 'Comment',
  },
  {
    color: 'Purple',
    feedCount: 10,
    latestFeedImages: [
      { objectKey: '1', presignedUrl: 'https://picsum.photos/200/300' },
    ],
    latestComment: 'Comment',
  },
  {
    color: 'Pink',
    feedCount: 10,
    latestFeedImages: [
      { objectKey: '1', presignedUrl: 'https://picsum.photos/200/300' },
    ],
    latestComment: 'Comment',
  },
];

export default function ProfileFeeds({ colors, count }: ProfileFeedsProps) {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>My Posts</CustomText>
      <MyColorPalette colors={colors} count={count} />
      <ColorFeeds colorFeeds={MOCK_DATA} />
    </View>
  );
}

interface MyColorPaletteProps {
  colors: Color[];
  count: number;
}

function MyColorPalette({ colors, count }: MyColorPaletteProps) {
  return (
    <View style={styles.colorPaletteContainer}>
      <View style={styles.colorPaletteHeader}>
        <CustomText style={styles.colorPaletteTitle}>Palette</CustomText>
        <CustomText style={styles.colorPaletteSubtitle}>{count}</CustomText>
      </View>
      <SuspenseQuery {...getCollectedColorOptions()}>
        {({ data }) => (
          <View style={styles.colorPalette}>
            {colors.map(({ displayName, rgbHexCode, shadowHexCode }) => {
              const shadow = hexToRgba({ hex: shadowHexCode, alpha: 0.2 });

              return (
                <View
                  key={displayName}
                  style={[
                    styles.color,
                    {
                      backgroundColor: rgbHexCode,
                      boxShadow: `inset 0 -6px 6px 0 rgba(255, 255, 255, 0.16), inset 4px 4px 6px 0 ${shadow}`,
                      opacity: data.some(
                        (color) => color.displayName === displayName
                      )
                        ? 1
                        : 0.2,
                    },
                  ]}
                />
              );
            })}
          </View>
        )}
      </SuspenseQuery>
    </View>
  );
}

interface ColorFeedsProps {
  colorFeeds: ColorFeed[];
}

function ColorFeeds({ colorFeeds }: ColorFeedsProps) {
  const router = useRouter();

  return (
    <FlashList
      data={colorFeeds}
      renderItem={({ item, index }) => {
        const isEvenColumn = index % 2 === 0;

        return (
          <Pressable
            onPress={() =>
              router.push(`/profile/color-feed?color=${item.color}`)
            }
            style={{
              paddingRight: isEvenColumn ? 4 : 0,
              paddingLeft: isEvenColumn ? 0 : 4,
            }}>
            <Folder
              title={item.color}
              images={item.latestFeedImages.map((image) => image.presignedUrl)}
              amount={item.feedCount}
              comment={item.latestComment}
            />
          </Pressable>
        );
      }}
      numColumns={2}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
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
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  colorPaletteContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 16,
    rowGap: 8,
    backgroundColor: theme.color['gray-2'],
  },
  colorPaletteHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorPaletteTitle: {
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['sm'],
  },
  colorPaletteSubtitle: {
    color: 'white',
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  colorPalette: {
    display: 'flex',
    flexDirection: 'row',
  },
  color: {
    position: 'relative',
    flex: 1,
    height: 32,
  },
  separator: {
    width: '100%',
    height: 14,
  },
}));
