import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Input } from '~/shared/ui/input';

export default function InputTest() {
  return (
    <View style={styles.container}>
      <Input
        defaultValue="Value"
        description="Description"
        showMaxLength
        maxLength={10}
      />
      <Input
        isError
        defaultValue="Value"
        description="Error"
        showMaxLength
        maxLength={10}
      />
      <Input
        editable={false}
        defaultValue="Value"
        description="Disabled"
        showMaxLength
        maxLength={10}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
}));
