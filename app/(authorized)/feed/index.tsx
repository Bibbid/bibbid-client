import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ColorFeeds, ColorPalette } from '~/pages/feed';
import { TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function Feed() {
  const { color } = useLocalSearchParams<{ color?: string }>();

  return (
    <View style={styles.container}>
      <View>
        <TopNavigation
          left={<CustomText style={styles.title}>Be Inspired</CustomText>}
        />
        <ColorPalette />
      </View>
      <ColorFeeds color={color} />
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
