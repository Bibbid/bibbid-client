import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { MoreHorizontal } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Dot from '~/assets/icons/dot-solid.svg';
import { Color } from '~/entities/color';
import { PresignedUrl } from '~/shared/model';
import { Chip } from '~/shared/ui/chip';
import { Image } from '~/shared/ui/image';
import { CustomText } from '~/shared/ui/text';

interface FeedInfoProps {
  image: PresignedUrl;
  color: Color;
  profileImage: PresignedUrl;
  createdAt: string;
  name: string;
  description: string;
}

export default function FeedInfo({
  image,
  color,
  profileImage,
  createdAt,
  name,
  description,
}: FeedInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image.presignedUrl }} style={styles.image} />
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
              label={color.displayName}
              customColor={color.rgbHexCode}
            />
          </View>
          <View style={styles.imageFooterRight}>
            <CustomText style={styles.imageFooterRightText}>
              {format(createdAt, 'yyyy-MM-dd')}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={styles.uploader}>
        <Image
          source={{ uri: profileImage.presignedUrl }}
          style={styles.uploaderImage}
          contentFit="contain"
        />
        <View style={styles.uploaderInfo}>
          <CustomText style={styles.uploaderName} numberOfLines={1}>
            {name}
          </CustomText>
          <CustomText style={styles.uploaderIntroduction} numberOfLines={1}>
            {description}
          </CustomText>
        </View>
        <Pressable style={styles.uploaderButton}>
          <MoreHorizontal size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
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
}));
