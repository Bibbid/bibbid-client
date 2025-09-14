import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TestPage } from '~/pages/test';
import { TopNavigation } from '~/shared/ui/navigation';

export default function Foundation() {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <TopNavigation
        left={<Text style={{ color: 'white', fontSize: 16 }}>Left</Text>}
        center={
          <Text style={{ color: 'white', fontSize: 16 }}>Foundation</Text>
        }
        right={<Text style={{ color: 'white', fontSize: 16 }}>Right</Text>}
      />
      <TestPage />
    </View>
  );
}
