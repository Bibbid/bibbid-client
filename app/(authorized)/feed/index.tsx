import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
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
      <KeyboardAwareScrollView style={styles.scrollView}>
        <ColorFeeds color={color} />
      </KeyboardAwareScrollView>
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
  scrollView: {
    flex: 1,
  },
}));
