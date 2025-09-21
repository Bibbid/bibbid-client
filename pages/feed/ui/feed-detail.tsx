import getFeedDetailOptions from '../model/get-feed-detail-options';
import ColorFeeds from './color-feeds';
import { SuspenseQuery } from '@suspensive/react-query';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { MoreHorizontal } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Dot from '~/assets/icons/dot-solid.svg';
import { Chip } from '~/shared/ui/chip';
import { Image } from '~/shared/ui/image';
import { CustomText } from '~/shared/ui/text';

export default function FeedDetail({ feedId }: { feedId: number }) {
  return (
    <SuspenseQuery {...getFeedDetailOptions(feedId)}>
      {({ data }) => (
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: data.image.presignedUrl }}
              style={styles.image}
            />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              style={styles.bottomGradient}
            />
            <View style={styles.imageFooter}>
              <View style={styles.imageFooterLeft}>
                <CustomText style={styles.imageFooterLeftText}>
                  Color of the Day
                </CustomText>
                <Chip
                  type="tinted"
                  leftIcon={Dot}
                  label={data.color.displayName}
                  customColor={data.color.rgbHexCode}
                />
              </View>
              <View style={styles.imageFooterRight}>
                <CustomText style={styles.imageFooterRightText}>
                  {format(data.createdAt, 'yyyy-MM-dd')}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={styles.uploader}>
            <Image
              source={{ uri: data.uploader.buddyImage.presignedUrl }}
              style={styles.uploaderImage}
              contentFit="contain"
            />
            <View style={styles.uploaderInfo}>
              <CustomText style={styles.uploaderName} numberOfLines={1}>
                {data.uploader.buddyName}
              </CustomText>
              <CustomText style={styles.uploaderIntroduction} numberOfLines={1}>
                {data.uploader.introduction}
              </CustomText>
            </View>
            <Pressable style={styles.uploaderButton}>
              <MoreHorizontal size={24} color="white" />
            </Pressable>
          </View>
          <View style={styles.otherFeedsContainer}>
            <CustomText style={styles.otherFeedsTitle}>
              More {data.color.displayName}
            </CustomText>
            <ColorFeeds color={data.color.displayName} />
          </View>
        </ScrollView>
      )}
    </SuspenseQuery>
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
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    alignItems: 'flex-start',
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
  otherFeedsContainer: {
    flex: 1,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
  },
  otherFeedsTitle: {
    paddingHorizontal: 20,
    color: 'white',
    fontSize: theme.fontSize['md'],
    fontWeight: theme.fontWeight['medium'],
  },
}));
