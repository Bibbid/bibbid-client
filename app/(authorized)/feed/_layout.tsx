import { Stack } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export default function FeedLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{ contentStyle: styles.content, headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
  content: {
    backgroundColor: 'transparent',
    paddingBottom: 70,
  },
}));
