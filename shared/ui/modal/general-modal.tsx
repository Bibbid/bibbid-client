import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalSubTitle,
  ModalTitle,
} from './modal';
import { generalModalStyles } from './modal.styles';
import { View } from 'react-native';
import { Image } from '~/shared/ui/image';

interface GeneralModalProps {
  visible: boolean;
  title: string;
  image?: string;
  subTitle?: string;
  description?: string;
  actionText?: string;
  showCancelButton?: boolean;
  disableActionButton?: boolean;
  onClose: () => void;
  onAction: () => void;
}

export default function GeneralModal({
  visible,
  title,
  image,
  subTitle,
  description,
  actionText,
  showCancelButton = true,
  disableActionButton = false,
  onClose,
  onAction,
}: GeneralModalProps) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <View style={generalModalStyles.content}>
        {image && <Image source={image} style={generalModalStyles.image} />}
        <View style={generalModalStyles.descriptionWrapper}>
          {subTitle && <ModalSubTitle>{subTitle}</ModalSubTitle>}
          {description && <ModalDescription>{description}</ModalDescription>}
        </View>
      </View>
      <ModalFooter style={generalModalStyles.footer}>
        {showCancelButton && (
          <ModalCancel
            text="Cancel"
            onPress={onClose}
            style={generalModalStyles.button}
            textStyle={generalModalStyles.cancelButtonText}
          />
        )}
        <ModalAction
          text={actionText}
          onPress={onAction}
          style={generalModalStyles.button}
          textStyle={generalModalStyles.actionButtonText}
          disabled={disableActionButton}
        />
      </ModalFooter>
    </Modal>
  );
}
