import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from './modal';
import { confirmModalStyles } from './modal.styles';

interface ConfirmModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  actionText?: string;
  onClose: () => void;
  onAction: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  description,
  actionText = 'Action',
  onClose,
  onAction,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={false}>
      <ModalHeader>
        {title && <ModalTitle>{title}</ModalTitle>}
        {description && <ModalDescription>{description}</ModalDescription>}
      </ModalHeader>
      <ModalFooter>
        <ModalCancel
          text="Cancel"
          onPress={onClose}
          textStyle={confirmModalStyles.cancelButtonText}
        />
        <ModalAction
          text={actionText}
          onPress={onAction}
          textStyle={confirmModalStyles.actionButtonText}
        />
      </ModalFooter>
    </Modal>
  );
}
