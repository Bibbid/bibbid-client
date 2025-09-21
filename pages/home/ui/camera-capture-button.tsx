import { useCaptureImage } from '../model';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { StyleSheet } from 'react-native-unistyles';
import NoPhoto from '~/assets/icons/no-photo.svg';

const HEIGHT = 288;

export default function CameraCaptureButton() {
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

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <NoPhoto />
    </Pressable>
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
}));
