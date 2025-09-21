import getFeedDetailOptions from '../model/get-feed-detail-options';
import { SuspenseQuery } from '@suspensive/react-query';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MoreHorizontal } from 'lucide-react-native';
import { Suspense } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Chip } from '~/shared/ui/chip';
import { CustomText } from '~/shared/ui/text';

export default function FeedDetail({ feedId }: { feedId: number }) {
  return (
    <Suspense>
      <SuspenseQuery {...getFeedDetailOptions(feedId)}>
        {({ data }) => (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: data.image.presignedUrl }}
                style={styles.image}
              />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.bottomGradient}
              />
            </View>
            <View style={styles.imageFooter}>
              <View style={styles.imageFooterLeft}>
                <CustomText style={styles.imageFooterLeftText}>
                  Color of the Day
                </CustomText>
                <Chip
                  type="tinted"
                  label={data.color.displayName}
                  customColor={data.color.rgbHexCode}
                />
              </View>
              <View style={styles.imageFooterRight}>
                <CustomText style={styles.imageFooterRightText}>
                  {data.createdAt}
                </CustomText>
              </View>
            </View>
            <View style={styles.uploader}>
              <Image
                source={{ uri: data.uploader.profileImageUrl ?? '' }}
                style={styles.uploaderImage}
              />
              <View style={styles.uploaderInfo}>
                <CustomText style={styles.uploaderName}>
                  {data.uploader.buddyName}
                </CustomText>
                <CustomText style={styles.uploaderIntroduction}>
                  {data.uploader.introduction}
                </CustomText>
              </View>
              <Pressable style={styles.uploaderButton}>
                <MoreHorizontal size={24} color="white" />
              </Pressable>
            </View>
          </View>
        )}
      </SuspenseQuery>
    </Suspense>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 360,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  imageFooter: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    zIndex: 2,
  },
  imageFooterLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 2,
  },
  imageFooterLeftText: {
    color: theme.color['opacity-white-80'],
    fontSize: theme.fontSize['xs'],
  },
  imageFooterRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imageFooterRightText: {
    color: theme.color['opacity-white-50'],
    fontSize: theme.fontSize['sm'],
  },
  uploader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    height: 82,
  },
  uploaderImage: {
    width: 50,
    height: 50,
  },
  uploaderInfo: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
  },
  uploaderName: {
    fontSize: theme.fontSize['sm'],
    color: theme.color['opacity-white-80'],
  },
  uploaderIntroduction: {
    fontSize: theme.fontSize['xs'],
    color: theme.color['opacity-white-50'],
  },
  uploaderButton: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
