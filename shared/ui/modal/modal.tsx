import { Button, ButtonText } from '../button';
import { modalStyles } from './modal.styles';
import { XIcon } from 'lucide-react-native';
import {
  Pressable,
  PressableProps,
  Modal as RNModal,
  Text,
  TextProps,
  View,
  ViewProps,
  type ModalProps as RNModalProps,
} from 'react-native';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { create } from 'zustand';

type ModalContextType = {
  onAction?: () => void;
  onClose?: () => void;
};

// store 생성
const useModalStore = create<ModalContextType>(() => ({
  onAction: undefined,
  onClose: undefined,
}));

interface ModalProps extends RNModalProps {
  visible: boolean;
  onAction?: () => void;
  onClose?: () => void;
}

export function Modal({
  visible,
  onAction,
  onClose,
  children,
  ...props
}: ModalProps) {
  const theme = useAnimatedTheme();

  useModalStore.setState({ onAction, onClose });

  return (
    <RNModal visible={visible} onRequestClose={onClose} transparent {...props}>
      <View style={modalStyles.container}>
        <View style={modalStyles.content}>
          <Pressable style={modalStyles.closeButton} onPress={onClose}>
            <XIcon size={20} color={theme.value.color['gray-4']} />
          </Pressable>
          {children}
        </View>
      </View>
    </RNModal>
  );
}

interface ModalHeaderProps extends ViewProps {}

export function ModalHeader({ children, style, ...props }: ModalHeaderProps) {
  return (
    <View style={[modalStyles.header, style]} {...props}>
      {children}
    </View>
  );
}

interface ModalTitleProps extends TextProps {}

export function ModalTitle({ children, style, ...props }: ModalTitleProps) {
  return (
    <Text style={[modalStyles.title, style]} {...props}>
      {children}
    </Text>
  );
}

interface ModalDescriptionProps extends TextProps {}

export function ModalDescription({
  children,
  style,
  ...props
}: ModalDescriptionProps) {
  return (
    <Text style={[modalStyles.description, style]} {...props}>
      {children}
    </Text>
  );
}

interface ModalSubTitleProps extends TextProps {}

export function ModalSubTitle({
  children,
  style,
  ...props
}: ModalSubTitleProps) {
  return (
    <Text style={[modalStyles.subTitle, style]} {...props}>
      {children}
    </Text>
  );
}

interface ModalFooterProps extends ViewProps {}

export function ModalFooter({ children, style, ...props }: ModalFooterProps) {
  return (
    <View style={[modalStyles.footer, style]} {...props}>
      {children}
    </View>
  );
}

interface ModalActionProps extends PressableProps {
  text?: string;
}

export function ModalAction({
  children,
  style,
  text,
  ...props
}: ModalActionProps) {
  const { onAction } = useModalStore();

  return (
    <Button variant="solid-white" onPress={onAction} {...props}>
      <ButtonText variant="solid-white" size="md">
        {text}
      </ButtonText>
    </Button>
  );
}

interface ModalCancelProps extends PressableProps {
  text?: string;
}

export function ModalCancel({
  children,
  style,
  text,
  ...props
}: ModalCancelProps) {
  const { onClose } = useModalStore();

  return (
    <Button variant="outlined-white" onPress={onClose} {...props}>
      <ButtonText variant="outlined-white" size="md">
        {text}
      </ButtonText>
    </Button>
  );
}
