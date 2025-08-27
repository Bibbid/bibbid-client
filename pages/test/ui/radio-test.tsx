import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { RadioButton, RadioButtonGroup } from '~/shared/ui/radio';

export default function RadioTest() {
  return (
    <View style={styles.container}>
      <RadioButtonGroup>
        <RadioButton value="1" label="Radio 1" />
        <RadioButton value="2" label="Radio 2" />
        <RadioButton value="3" label="Radio 3" />
        <RadioButton value="4" label="Radio 4" disabled />
      </RadioButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
}));
