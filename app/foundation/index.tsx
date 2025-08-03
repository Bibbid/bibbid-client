import { View } from 'react-native';
import { Button, ButtonText } from '~/shared/ui/button';

export default function Foundation() {
  return (
    <View
      style={{
        flex: 1,
        rowGap: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button variant="solid-gray" size="md">
          <ButtonText variant="solid-gray" size="md">
            Button
          </ButtonText>
        </Button>
        <Button variant="solid-light" size="md">
          <ButtonText variant="solid-light" size="md">
            Button
          </ButtonText>
        </Button>
        <Button variant="solid-white" size="md">
          <ButtonText variant="solid-white" size="md">
            Button
          </ButtonText>
        </Button>
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button variant="outlined-gray" size="md">
          <ButtonText variant="outlined-gray" size="md">
            Button
          </ButtonText>
        </Button>
        <Button variant="outlined-white" size="md">
          <ButtonText variant="outlined-white" size="md">
            Button
          </ButtonText>
        </Button>
        <Button variant="ghost" size="md">
          <ButtonText variant="ghost" size="md">
            Button
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}
