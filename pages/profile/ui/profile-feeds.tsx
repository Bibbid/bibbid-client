import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Color } from '~/entities/color';
import { CustomText } from '~/shared/ui/text';

interface ProfileFeedsProps {
  colors: Color[];
  count: number;
}

export default function ProfileFeeds({ colors, count }: ProfileFeedsProps) {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>My Posts</CustomText>
      <MyColorPalette colors={colors} count={count} />
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
      <View style={styles.colorPalette}>
        {colors.map((color) => (
          <View
            style={[
              styles.color,
              {
                backgroundColor: color.rgbHexCode,
                boxShadow:
                  'inset 0 -6px 6px 0 rgba(255, 255, 255, 0.16), inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2)',
              },
            ]}
            key={color.displayName}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: 90,
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
}));
