import { format } from 'date-fns';
import { Siren } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import type { PresignedUrl } from '~/shared/model';
import { Image } from '~/shared/ui/image';
import { Modal, ModalHeader, ModalTitle } from '~/shared/ui/modal';
import { CustomText } from '~/shared/ui/text';

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  profileImage: PresignedUrl;
  name: string;
  createdAt: string;
}

export default function ProfileModal({
  visible,
  onClose,
  profileImage,
  name,
  createdAt,
}: ProfileModalProps) {
  const theme = useAnimatedTheme();

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <ModalHeader style={styles.header}>
          <ModalTitle style={styles.title}>Profile</ModalTitle>
          <Pressable style={styles.reportButton}>
            <Siren size={24} color={theme.value.color['gray-7']} />
          </Pressable>
        </ModalHeader>
        <Image
          source={{ uri: profileImage.presignedUrl }}
          style={styles.profileImage}
          contentFit="contain"
        />
        <View style={styles.infoContainer}>
          <CustomText style={styles.name}>{name}</CustomText>
          <CustomText style={styles.createdAt}>
            Since {format(createdAt, 'yyyy-MM-dd')}
          </CustomText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 12,
  },
  header: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  reportButton: {
    position: 'absolute',
    right: 32,
    top: 0,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 4,
  },
  name: {
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['lg'],
    fontWeight: theme.fontWeight['medium'],
  },
  createdAt: {
    color: theme.color['gray-7'],
    fontSize: theme.fontSize['md'],
  },
}));
