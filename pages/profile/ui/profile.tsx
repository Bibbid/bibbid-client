import getMyProfileOptions from '../model/get-my-profile-options';
import ProfileFeeds from './profile-feeds';
import { SuspenseQueries } from '@suspensive/react-query';
import { Image } from 'expo-image';
import { Suspense } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Sparkles from '~/assets/icons/sparkles.svg';
import { getColorsOptions } from '~/entities/color';
import type { MyProfile } from '~/entities/profile';
import { Button } from '~/shared/ui/button';
import { CustomText } from '~/shared/ui/text';

const FALLBACK_IMAGE_URL = 'https://placehold.co/100x100';

export default function Profile() {
  return (
    <Suspense>
      <SuspenseQueries queries={[getMyProfileOptions(), getColorsOptions()]}>
        {([myProfileData, colorsData]) => {
          const { data: myProfile } = myProfileData;
          const { data: colors } = colorsData;

          return (
            <ScrollView style={styles.container}>
              <BuddySection myProfile={myProfile} />
              <ProfileFeeds
                colors={colors}
                count={myProfile.collectedColorCount}
              />
            </ScrollView>
          );
        }}
      </SuspenseQueries>
    </Suspense>
  );
}

function BuddySection({ myProfile }: { myProfile: MyProfile }) {
  return (
    <View style={styles.buddyContainer}>
      <View style={styles.buddyWrapper}>
        <Image
          source={{
            uri: myProfile.buddyImage?.presignedUrl ?? FALLBACK_IMAGE_URL,
          }}
          style={styles.buddyImage}
        />
        <Button variant="solid-light" style={styles.buddyCustomButton}>
          <Sparkles />
        </Button>
      </View>
      <View style={styles.nameContainer}>
        <CustomText style={styles.username}>{myProfile.name}</CustomText>
        <CustomText style={styles.buddyName}>{myProfile.buddyName}</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buddyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
    paddingVertical: 20,
  },
  buddyWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  buddyImage: {
    width: '100%',
    height: '100%',
  },
  buddyCustomButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    padding: 8,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    color: 'white',
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['2xl'],
  },
  buddyName: {
    color: theme.color['gray-6'],
    fontSize: theme.fontSize['lg'],
  },
}));
