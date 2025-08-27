import ButtonTest from './button-test';
import ChipTest from './chip-test';
import RadioTest from './radio-test';
import TabTest from './tab-test';
import { ScrollView } from 'react-native';

export default function TestPage() {
  return (
    <ScrollView
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20,
      }}>
      <ButtonTest />
      <ChipTest />
      <RadioTest />
      <TabTest />
    </ScrollView>
  );
}
