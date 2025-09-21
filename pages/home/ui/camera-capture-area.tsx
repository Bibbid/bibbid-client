import { useCaptureImage } from '../model';
import { formatDistanceToNow } from 'date-fns';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { StyleSheet } from 'react-native-unistyles';
import NoPhoto from '~/assets/icons/no-photo.svg';
import { TodayUploadedFeed } from '~/entities/feed';
import { Image } from '~/shared/ui/image';
import { CustomText } from '~/shared/ui/text';

interface CameraCaptureAreaProps {
  data: TodayUploadedFeed[];
  postedToday: boolean;
}

const HEIGHT = 288;

export default function CameraCaptureArea({
  data,
  postedToday,
}: CameraCaptureAreaProps) {
  const router = useRouter();

  const setImage = useCaptureImage((state) => state.setImage);

  const [permission, requestPermission] = useCameraPermissions();

  const handlePress = async () => {
    if (!permission || !permission.granted) {
      requestPermission();
    }

    const image = await ImagePicker.openCamera({
      cropping: false,
      compressImageQuality: 1,
      mediaType: 'photo',
    });

    setImage(image);

    router.push('/(authorized)/home/upload');
  };

  return data.length > 0 ? (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: data[0].image.presignedUrl }}
      />
      <View style={styles.imageOverlay}>
        <View style={styles.imageOverlayFooter}>
          <CustomText style={styles.comment}>{data[0].comment}</CustomText>
          <CustomText style={styles.timestamp}>
            {formatDistanceToNow(new Date(data[0].createdAt))}
          </CustomText>
        </View>
      </View>
    </View>
  ) : (
    <>
      {!postedToday && (
        <Pressable style={styles.container} onPress={handlePress}>
          <NoPhoto />
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.color['opacity-white-50'],
    backgroundColor: theme.color['opacity-white-8'],
    height: HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageOverlayFooter: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 14,
    rowGap: 4,
  },
  comment: {
    fontSize: theme.fontSize['sm'],
    color: 'white',
  },
  timestamp: {
    fontSize: theme.fontSize['xs'],
    color: theme.color['opacity-white-50'],
  },
}));
