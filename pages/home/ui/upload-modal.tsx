import { Image as ExpoImage } from 'expo-image';
import { Modal, View } from 'react-native';
import type { Image } from 'react-native-image-crop-picker';
import { StyleSheet } from 'react-native-unistyles';
import { Button, ButtonText } from '~/shared/ui/button';
import {
  BlankNavItem,
  NavBackButton,
  NavCenterTitle,
  TopNavigation,
} from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

interface UploadModalProps {
  image?: Image;
  onDismiss: () => void;
}

export default function UploadModal({ image, onDismiss }: UploadModalProps) {
  const visible = !!image;

  return (
    <Modal visible={visible} onDismiss={onDismiss} animationType="slide">
      <View style={styles.container}>
        <TopNavigation
          left={<NavBackButton onPress={onDismiss} />}
          center={<NavCenterTitle title="Upload" />}
          right={<BlankNavItem />}
        />
        <View style={styles.content}>
          <View>
            <CustomText style={styles.title}>{`Check\nYour Post`}</CustomText>
            <CustomText style={styles.description}>
              Edits are not allowed after upload
            </CustomText>
          </View>
          <View style={styles.imageWrapper}>
            <View style={styles.imageHeader}></View>
            <ExpoImage source={{ uri: image?.path }} style={styles.image} />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button variant="solid-gray" size="xl" onPress={onDismiss}>
            <ButtonText
              variant="solid-gray"
              size="md"
              style={styles.buttonText}>
              Upload photo
            </ButtonText>
          </Button>
          <Button variant="ghost" size="xl" onPress={onDismiss}>
            <ButtonText variant="ghost" size="md" style={styles.buttonText}>
              Retake new photo
            </ButtonText>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
  content: {
    paddingHorizontal: 20,
    rowGap: 24,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 320,
  },
  imageHeader: {
    position: 'absolute',
    top: 0,
    height: 64,
    padding: 16,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  description: {
    color: theme.color['gray-9'],
    fontSize: theme.fontSize['md'],
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 32,
    rowGap: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['md'],
  },
}));
