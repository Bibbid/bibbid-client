import { StatusBar, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function HomeScreen() {
  const theme = useAnimatedTheme();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.value.color['gray-2']}
        barStyle="light-content"
      />
      <TopNavigation left={<CustomText>BBD</CustomText>} />
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
}));
