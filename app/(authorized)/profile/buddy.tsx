import { SuspenseQuery } from '@suspensive/react-query';
import { Suspense } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { Buddy, getMyProfileOptions } from '~/pages/profile';
import { Loading } from '~/shared/ui/loading';
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

      <Suspense fallback={<Loading />}>
        <SuspenseQuery {...getMyProfileOptions()}>
          {({ data: { buddyName, buddyColor, buddyCharacter } }) => (
            <Buddy
              buddyCharacter={buddyCharacter}
              buddyName={buddyName}
              buddyColor={buddyColor}
            />
          )}
        </SuspenseQuery>
      </Suspense>
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
