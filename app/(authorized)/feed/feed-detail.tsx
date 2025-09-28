import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import {
  getPermissionsAsync,
  requestPermissionsAsync,
} from 'expo-media-library';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MoreHorizontal } from 'lucide-react-native';
import { Suspense, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { useDownloadHighQualityImage } from '~/features/feed';
import { FeedDetail } from '~/pages/feed';
import { downloadToLibrary, hexToRgba } from '~/shared/lib';
import { Button, ButtonText } from '~/shared/ui/button';
import { Loading } from '~/shared/ui/loading';
import { NavBackButton, TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';
import { showToast } from '~/shared/ui/toast';

export default function FeedDetailScreen() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const router = useRouter();

  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  const theme = useAnimatedTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const { mutateAsync: downloadHighQualityImage, isPending } =
    useDownloadHighQualityImage({
      onSuccess: ({ data: { highQualityImage } }) => {
        downloadToLibrary({ url: highQualityImage.presignedUrl });
      },
      onError: (error) => {
        showToast({
          text1: error.message,
          type: 'error',
        });
        router.push('/(authorized)/shop');
      },
    });

  const handleDownloadHighQualityImage = async () => {
    const { status } = await getPermissionsAsync();

    if (status !== 'granted') {
      const permission = await requestPermissionsAsync();

      if (permission.status !== 'granted') {
        showToast({
          text1: 'Permission is required to save image',
          type: 'error',
        });
        return;
      }
    }

    await downloadHighQualityImage(Number(feedId));
  };

  if (!feedId) {
    return router.replace('/(authorized)/home');
  }

  return (
    <View style={styles.container}>
      <TopNavigation
        left={<NavBackButton />}
        right={
          <Pressable
            style={styles.optionButton}
            onPress={() => {
              if (isBottomSheetOpen) {
                bottomSheetRef.current?.close();
              } else {
                bottomSheetRef.current?.expand();
              }
            }}>
            <MoreHorizontal size={24} color="white" />
          </Pressable>
        }
      />
      <KeyboardAwareScrollView style={styles.scrollView}>
        <Suspense fallback={<Loading />}>
          <FeedDetail feedId={Number(feedId)} />
        </Suspense>
      </KeyboardAwareScrollView>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enableDynamicSizing
        enablePanDownToClose
        containerStyle={styles.bottomSheetContainer}
        backgroundStyle={styles.bottomSheetBackground}
        onChange={(index) => setIsBottomSheetOpen(index >= 0)}
        handleComponent={() => (
          <LinearGradient
            colors={[
              hexToRgba({ hex: theme.value.color['gray-1'], alpha: 0 }),
              hexToRgba({ hex: theme.value.color['gray-1'], alpha: 0.5 }),
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.5 }}
            style={styles.bottomSheetGradient}
          />
        )}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <Button
            size="xl"
            variant="solid-white"
            onPress={handleDownloadHighQualityImage}
            disabled={isPending}>
            <ButtonText variant="solid-white">Save Image</ButtonText>
          </Button>
          <CustomText style={styles.bottomSheetButtonDescription}>
            Get premium to save images
          </CustomText>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color['gray-1'],
    justifyContent: 'flex-start',
  },
  optionButton: {
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  bottomSheetContainer: {
    overflow: 'visible',
  },
  bottomSheetBackground: {
    backgroundColor: theme.color['gray-1'],
    borderRadius: 0,
  },
  bottomSheetContent: {
    position: 'relative',
    paddingHorizontal: 20,
    paddingBottom: 40,
    rowGap: 8,
  },
  bottomSheetGradient: {
    position: 'absolute',
    top: -24,
    left: 0,
    right: 0,
    height: 24,
    zIndex: 1,
  },
  bottomSheetButtonDescription: {
    color: theme.color['gray-5'],
    fontSize: theme.fontSize['sm'],
    textAlign: 'center',
  },
}));
