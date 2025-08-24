import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { TabButton, TabButtonGroup } from '~/shared/ui/tabs/tabs';

export default function TabTest() {
  return (
    <View style={styles.container}>
      <TabButtonGroup>
        <TabButton value="1" label="Tab 1" />
        <TabButton value="2" label="Tab 2" />
        <TabButton value="3" label="Tab 3" />
      </TabButtonGroup>
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
