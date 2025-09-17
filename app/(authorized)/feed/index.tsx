import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ColorPalette } from '~/pages/feed';
import { TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function Feed() {
  return (
    <View style={styles.container}>
      <TopNavigation
        left={<CustomText style={styles.title}>Be Inspired</CustomText>}
      />
      <ColorPalette />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight['semibold'],
    paddingHorizontal: 8,
  },
}));
