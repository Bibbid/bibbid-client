import { bottomSheetStyles } from './bottom-sheet.styles';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  type BottomSheetBackdropProps,
  type BottomSheetProps,
} from '@gorhom/bottom-sheet';
import { useCallback, type RefObject } from 'react';

interface CustomBottomSheetProps extends BottomSheetProps {
  ref: RefObject<BottomSheetModal | null>;
}

export default function CustomBottomSheet({
  ref,
  style,
  backgroundStyle,
  handleStyle,
  handleIndicatorStyle,
  backdropComponent,
  enablePanDownToClose = true,
  ...props
}: CustomBottomSheetProps) {
  const renderBackdrop = useCallback(
    ({ style, ...props }: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={-1}
      style={[bottomSheetStyles.container, style]}
      backgroundStyle={[bottomSheetStyles.background, backgroundStyle]}
      handleStyle={[bottomSheetStyles.handle, handleStyle]}
      handleIndicatorStyle={[
        bottomSheetStyles.handleIndicator,
        handleIndicatorStyle,
      ]}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      backdropComponent={backdropComponent || renderBackdrop}
      enablePanDownToClose={enablePanDownToClose}
      {...props}
    />
  );
}
