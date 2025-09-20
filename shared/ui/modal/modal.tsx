import { Button, ButtonText } from '../button';
import { CustomText } from '../text';
import { modalStyles } from './modal.styles';
import { XIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import {
  Pressable,
  PressableProps,
  Modal as RNModal,
  type TextProps,
  View,
  type ViewProps,
  type ModalProps as RNModalProps,
  TextStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

interface ModalProps extends RNModalProps {
  visible: boolean;
  showCloseButton?: boolean;
  onAction?: () => void;
  onClose?: () => void;
}

export function Modal({
  visible,
  onAction,
  onClose,
  children,
  showCloseButton = true,
  ...props
}: ModalProps) {
  const theme = useAnimatedTheme();

  const animationProgress = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animationProgress.value,
        [0, 1],
        ['transparent', theme.value.color['opacity-black-80']]
      ),
    };
  });

  useEffect(() => {
    animationProgress.value = withTiming(visible ? 1 : 0, { duration: 200 });
  }, [visible, animationProgress]);

  return (
    <RNModal visible={visible} onRequestClose={onClose} transparent {...props}>
      <Animated.View style={[modalStyles.container, animatedContainerStyle]}>
        <View style={modalStyles.content}>
          {showCloseButton && (
            <Pressable
              style={modalStyles.closeButton}
              onPress={() => onClose?.()}>
              <XIcon size={20} color={theme.value.color['gray-4']} />
            </Pressable>
          )}
          {children}
        </View>
      </Animated.View>
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
    <CustomText style={[modalStyles.title, style]} {...props}>
      {children}
    </CustomText>
  );
}

interface ModalDescriptionProps extends TextProps {}

export function ModalDescription({
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

export function ModalSubTitle({
  children,
  style,
  ...props
}: ModalSubTitleProps) {
  return (
    <CustomText style={[modalStyles.subTitle, style]} {...props}>
      {children}
    </CustomText>
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
  textStyle?: TextStyle;
}

export function ModalAction({
  children,
  style,
  text,
  textStyle,
  ...props
}: ModalActionProps) {
  return (
    <Button variant="solid-white" {...props}>
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

export function ModalCancel({
  children,
  style,
  text,
  textStyle,
  ...props
}: ModalCancelProps) {
  return (
    <Button variant="outlined-white" {...props}>
      <ButtonText variant="outlined-white" size="md" style={textStyle}>
        {text}
      </ButtonText>
    </Button>
  );
}
