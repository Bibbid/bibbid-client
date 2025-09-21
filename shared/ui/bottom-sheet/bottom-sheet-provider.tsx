import CustomBottomSheet from '../bottom-sheet/bottom-sheet';
import {
  bottomSheetOverlay,
  BottomSheetOverlayOptions,
} from './bottom-sheet-overlay';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

interface BottomSheetOverlayProviderProps extends PropsWithChildren {
  defaultSnapPoints?: string[];
  backdrop?: boolean;
}

export default function BottomSheetOverlayProvider({
  children,
  defaultSnapPoints = ['50%'],
  backdrop = true,
}: BottomSheetOverlayProviderProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = useState<ReactNode>(null);
  const [options, setOptions] = useState<BottomSheetOverlayOptions>({
    snapPoints: defaultSnapPoints,
  });

  useEffect(() => {
    const unsubscribe = bottomSheetOverlay.subscribe(() => {
      const newContent = bottomSheetOverlay.getContent();
      const newOptions = bottomSheetOverlay.getOptions();

      setContent(newContent);
      setOptions(newOptions);
    });

    return unsubscribe;
  }, []);

  return (
    <BottomSheetModalProvider>
      {children}
      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={options.snapPoints}
        onClose={() => {
          bottomSheetOverlay.close();
        }}>
        {content}
      </CustomBottomSheet>
    </BottomSheetModalProvider>
  );
}
