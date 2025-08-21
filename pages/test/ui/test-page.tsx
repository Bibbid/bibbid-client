import ButtonTest from './button-test';
import ChipTest from './chip-test';
import { View } from 'react-native';

export default function TestPage() {
  return (
    <View style={{ flex: 1 }}>
      <ButtonTest />
      <ChipTest />
    </View>
  );
}
