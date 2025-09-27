import { Button, ButtonText } from '../button';
import { CustomText } from '../text';
import { modalStyles } from './modal.styles';
import { XIcon } from 'lucide-react-native';
import { PropsWithChildren } from 'react';
import {
  Pressable,
  PressableProps,
  type TextProps,
  View,
  type ViewProps,
  TextStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

interface CustomModalProps extends PropsWithChildren {
  visible: boolean;
  showCloseButton?: boolean;
  onAction?: () => void;
  onClose?: () => void;
}

function CustomModal({
  visible,
  onAction,
  onClose,
  children,
  showCloseButton = true,
}: CustomModalProps) {
  const theme = useAnimatedTheme();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={modalStyles.container}>
      <View style={modalStyles.content}>
        {showCloseButton && (
          <Pressable
            style={modalStyles.closeButton}
            onPress={() => onClose?.()}>
            <XIcon size={24} color={theme.value.color['gray-7']} />
          </Pressable>
        )}
        {children}
      </View>
    </Modal>
  );
}

interface ModalHeaderProps extends ViewProps {}

function ModalHeader({ children, style, ...props }: ModalHeaderProps) {
  return (
    <View style={[modalStyles.header, style]} {...props}>
      {children}
    </View>
  );
}

interface ModalTitleProps extends TextProps {}

function ModalTitle({ children, style, ...props }: ModalTitleProps) {
  return (
    <CustomText style={[modalStyles.title, style]} {...props}>
      {children}
    </CustomText>
  );
}

interface ModalDescriptionProps extends TextProps {}

function ModalDescription({
  children,
  style,
  ...props
}: ModalDescriptionProps) {
  return (
    <CustomText style={[modalStyles.description, style]} {...props}>
      {children}
    </CustomText>
  );
}

interface ModalSubTitleProps extends TextProps {}

function ModalSubTitle({ children, style, ...props }: ModalSubTitleProps) {
  return (
    <CustomText style={[modalStyles.subTitle, style]} {...props}>
      {children}
    </CustomText>
  );
}

interface ModalFooterProps extends ViewProps {}

function ModalFooter({ children, style, ...props }: ModalFooterProps) {
  return (
    <View style={[modalStyles.footer, style]} {...props}>
      {children}
    </View>
  );
}

interface ModalActionProps extends PressableProps {
  text?: string;
  textStyle?: TextStyle;
}

function ModalAction({
  children,
  style,
  text,
  textStyle,
  ...props
}: ModalActionProps) {
  return (
    <Button size="xl" variant="solid-white" style={style} {...props}>
      <ButtonText variant="solid-white" size="md" style={textStyle}>
        {text}
      </ButtonText>
    </Button>
  );
}

interface ModalCancelProps extends PressableProps {
  text?: string;
  textStyle?: TextStyle;
}

function ModalCancel({
  children,
  style,
  text,
  textStyle,
  ...props
}: ModalCancelProps) {
  return (
    <Button size="xl" variant="outlined-white" style={style} {...props}>
      <ButtonText variant="outlined-white" size="md" style={textStyle}>
        {text}
      </ButtonText>
    </Button>
  );
}

export {
  CustomModal as Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalSubTitle,
  ModalFooter,
  ModalAction,
  ModalCancel,
};
