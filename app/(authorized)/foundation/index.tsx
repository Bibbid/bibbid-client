import { X } from 'lucide-react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TestPage } from '~/pages/test';
import { useAuth } from '~/shared/auth';
import { Button } from '~/shared/ui/button';
import { TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function Foundation() {
  const { signOut } = useAuth();

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <TopNavigation
        left={
          <CustomText style={{ color: 'white', fontSize: 16 }}>Left</CustomText>
        }
        center={
          <CustomText style={{ color: 'white', fontSize: 16 }}>
            Foundation
          </CustomText>
        }
        right={
          <Button onPress={() => signOut()}>
            <X />
          </Button>
        }
      />
      <TestPage />
    </View>
  );
}
