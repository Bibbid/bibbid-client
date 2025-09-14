import { bottomSheetStyles } from './bottom-sheet.styles';
import BottomSheet, { type BottomSheetProps } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

interface CustomBottomSheetProps extends BottomSheetProps {
  ref: RefObject<BottomSheet | null>;
}

export default function CustomBottomSheet({
  ref,
  style,
  backgroundStyle,
  handleStyle,
  handleIndicatorStyle,
  ...props
}: CustomBottomSheetProps) {
  return (
    <BottomSheet
      ref={ref}
      index={0}
      {...props}
      style={[bottomSheetStyles.container, style]}
      backgroundStyle={[bottomSheetStyles.background, backgroundStyle]}
      handleStyle={[bottomSheetStyles.handle, handleStyle]}
      handleIndicatorStyle={[
        bottomSheetStyles.handleIndicator,
        handleIndicatorStyle,
      ]}
      enablePanDownToClose
    />
  );
}
