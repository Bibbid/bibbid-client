import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { Buddy } from '~/pages/profile';
import {
  NavBackButton,
  NavCenterTitle,
  TopNavigation,
} from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function BuddyScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TopNavigation
        left={<NavBackButton />}
        center={<NavCenterTitle title="Buddy" />}
        right={
          <Pressable style={styles.saveButton}>
            <CustomText style={styles.saveButtonText}>Save</CustomText>
          </Pressable>
        }
      />
      <Buddy />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  saveButton: {
    height: '100%',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: theme.fontSize['xs'],
    fontWeight: theme.fontWeight['semibold'],
  },
}));
