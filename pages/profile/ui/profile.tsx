import getMyProfileOptions from '../model/get-my-profile-options';
import ProfileFeeds from './profile-feeds';
import { SuspenseQueries } from '@suspensive/react-query';
import { Image } from 'expo-image';
import { Sparkles } from 'lucide-react-native';
import { Suspense } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { getColorsOptions } from '~/entities/color';
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
            <View style={styles.container}>
              <View style={styles.buddyContainer}>
                <View style={styles.buddyWrapper}>
                  <Image
                    source={{
                      uri:
                        myProfile.buddyImage?.presignedUrl ??
                        FALLBACK_IMAGE_URL,
                    }}
                    style={styles.buddyImage}
                  />
                  <Button
                    variant="solid-light"
                    style={styles.buddyCustomButton}>
                    <Sparkles color="white" size={24} />
                  </Button>
                </View>
                <View style={styles.nameContainer}>
                  <CustomText style={styles.username}>
                    {myProfile.name}
                  </CustomText>
                  <CustomText style={styles.buddyName}>
                    {myProfile.buddyName}
                  </CustomText>
                </View>
              </View>
              <ProfileFeeds
                colors={colors}
                count={myProfile.collectedColorCount}
              />
            </View>
          );
        }}
      </SuspenseQueries>
    </Suspense>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    rowGap: 20,
  },
  buddyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
    paddingTop: 20,
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
