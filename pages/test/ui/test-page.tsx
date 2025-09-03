import ButtonTest from './button-test';
import ChipTest from './chip-test';
import InputTest from './input-test';
import RadioTest from './radio-test';
import TabTest from './tab-test';
import { ScrollView } from 'react-native';
import { Button, ButtonText } from '~/shared/ui/button';
import { showToast } from '~/shared/ui/toast';

export default function TestPage() {
  return (
    <ScrollView
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        rowGap: 20,
      }}>
      <ButtonTest />
      <ChipTest />
      <RadioTest />
      <TabTest />
      <InputTest />
      <Button onPress={() => showToast({ text1: 'Hello', text2: 'World' })}>
        <ButtonText>FIRE TOAST!</ButtonText>
      </Button>
    </ScrollView>
  );
}
