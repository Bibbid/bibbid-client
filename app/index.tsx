import { router, Stack } from 'expo-router';
import { View } from 'react-native';
import { Button, ButtonText } from '~/shared/ui/button/button';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="solid-gray"
          size="md"
          onPress={() => router.push('/foundation')}>
          <ButtonText variant="solid-gray" size="md">
            Go to Foundation
          </ButtonText>
        </Button>
      </View>
    </>
  );
}
