import { Image as ExpoImage } from 'expo-image';
import { Pen } from 'lucide-react-native';
import { Modal, Pressable, View } from 'react-native';
import type { Image } from 'react-native-image-crop-picker';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import Dot from '~/assets/icons/dot-solid.svg';
import { mmkv } from '~/shared/model';
import { Button, ButtonText } from '~/shared/ui/button';
import { Chip } from '~/shared/ui/chip';
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

  const theme = useAnimatedTheme();

  const todayColorDisplayName =
    mmkv.getString('todayColorDisplayName') || 'gray';
  const todayColor = mmkv.getString('todayColorRgb') || 'gray';

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
            <View style={styles.imageOverlay}>
              <View style={styles.imageOverlayHeader}>
                <Chip
                  type="tinted"
                  label={todayColorDisplayName}
                  customColor={todayColor}
                  leftIcon={Dot}
                />
              </View>
              <View style={styles.imageOverlayFooter}>
                <Pressable style={styles.imageOverlayFooterButton}>
                  <CustomText style={styles.imageOverlayFooterButtonText}>
                    Click here to add a comment
                  </CustomText>
                  <Pen
                    size={20}
                    color={theme.value.color['opacity-white-80']}
                  />
                </Pressable>
              </View>
            </View>
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
  imageOverlay: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageOverlayHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
  },
  imageOverlayFooter: {
    width: '100%',
    padding: 16,
  },
  imageOverlayFooterButton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
  },
  imageOverlayFooterButtonText: {
    color: theme.color['opacity-white-80'],
    fontSize: theme.fontSize['sm'],
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
