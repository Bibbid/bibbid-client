import { useCaptureImage } from '../model';
import { CreateFeedForm, CreateFeedFormSchema } from '../model/schemas';
import useCreateFeed from '../model/use-create-feed';
import useUploadFeedImage from '../model/use-upload-feed-image';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { File } from 'expo-file-system/next';
import { useRouter } from 'expo-router';
import { Pen, X } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  Control,
  Controller,
  FormProvider,
  useForm,
  useWatch,
} from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import Dot from '~/assets/icons/dot-solid.svg';
import { useTodayColor } from '~/entities/color';
import { CustomBottomSheet } from '~/shared/ui/bottom-sheet';
import { Button, ButtonText } from '~/shared/ui/button';
import { Chip } from '~/shared/ui/chip';
import { Image as CustomImage } from '~/shared/ui/image';
import { Input } from '~/shared/ui/input';
import {
  BlankNavItem,
  NavBackButton,
  NavCenterTitle,
  TopNavigation,
} from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';
import { showToast } from '~/shared/ui/toast';

export default function UploadSection() {
  const router = useRouter();

  const image = useCaptureImage((state) => state.image);
  const resetImage = useCaptureImage((state) => state.resetImage);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const method = useForm<CreateFeedForm>({
    defaultValues: {
      comment: '',
    },
    resolver: valibotResolver(CreateFeedFormSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = method;

  const comment = useWatch({ control, name: 'comment' });

  const { mutateAsync: createFeed } = useCreateFeed({
    onSuccess: () => {
      showToast({
        text1: 'Feed created successfully',
        type: 'success',
      });
      resetImage();
      router.push('/(authorized)/home/upload-successful');
    },
    onError: (error) => {
      showToast({
        text1: error.message,
        type: 'error',
      });
    },
  });

  const { mutateAsync: uploadFeedImage } = useUploadFeedImage({
    onSuccess: () => {},
    onError: (error) => {
      showToast({
        text1: error.message,
        type: 'error',
      });
    },
  });

  const { displayName, rgbHexCode } = useTodayColor();

  const onSubmit = handleSubmit(
    async (data) => {
      if (!image || !image.path) {
        return;
      }

      const file = new File(image.path);

      const { data: uploadFeedImageData } = await uploadFeedImage(file);
      const { originalFileId, compressedFileId } = uploadFeedImageData;

      await createFeed({
        ...data,
        originalFileId,
        compressedFileId,
      });
    },
    (error) => {
      showToast({
        text1: error.comment?.message ?? 'Invalid comment',
        type: 'error',
      });
    }
  );

  return (
    <FormProvider {...method}>
      <View style={styles.container}>
        <TopNavigation
          left={<NavBackButton />}
          center={<NavCenterTitle title="Upload" />}
          right={<BlankNavItem />}
        />
        <View style={styles.content}>
          <View>
            <CustomText style={styles.title}>{`Check\nYour Post`}</CustomText>
            <CustomText style={styles.description}>
              Edits are not allowed after upload
            </CustomText>
          </View>
          <View style={styles.imageWrapper}>
            <View style={styles.imageOverlay}>
              <View style={styles.imageOverlayHeader}>
                <Chip
                  type="tinted"
                  label={displayName}
                  customColor={rgbHexCode}
                  leftIcon={Dot}
                />
              </View>
              <CommentEditButton
                comment={comment}
                onPress={() => {
                  bottomSheetRef.current?.present();
                }}
              />
            </View>
            <CustomImage source={{ uri: image?.path }} style={styles.image} />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            variant="solid-gray"
            size="xl"
            onPress={onSubmit}
            disabled={!isValid || isSubmitting}>
            <ButtonText
              variant="solid-gray"
              size="md"
              style={styles.buttonText}
              disabled={!isValid || isSubmitting}>
              Upload photo
            </ButtonText>
          </Button>
          <Button variant="ghost" size="xl">
            <ButtonText variant="ghost" size="md" style={styles.buttonText}>
              Retake new photo
            </ButtonText>
          </Button>
        </View>
      </View>
      <CustomBottomSheet index={0} ref={bottomSheetRef}>
        <BottomSheetContent
          control={control}
          initialComment={comment}
          close={() => {
            bottomSheetRef.current?.close();
          }}
        />
      </CustomBottomSheet>
    </FormProvider>
  );
}

interface CommentEditButtonProps {
  comment?: string;
  onPress: () => void;
}

function CommentEditButton({ comment, onPress }: CommentEditButtonProps) {
  const theme = useAnimatedTheme();

  return (
    <View style={styles.imageOverlayFooter}>
      <Pressable style={styles.imageOverlayFooterButton} onPress={onPress}>
        <CustomText style={styles.imageOverlayFooterButtonText}>
          {comment ? comment : 'Click here to add a comment'}
        </CustomText>
        <Pen size={20} color={theme.value.color['opacity-white-80']} />
      </Pressable>
    </View>
  );
}

function BottomSheetContent({
  initialComment,
  control,
  close,
}: {
  initialComment?: string;
  control: Control<CreateFeedForm>;
  close: () => void;
}) {
  const [comment, setComment] = useState(initialComment ?? '');

  const theme = useAnimatedTheme();

  return (
    <BottomSheetView style={styles.bottomSheetContainer}>
      <View style={styles.bottomSheetHeader}>
        <View style={styles.bottomSheetHeaderLeft} />
        <CustomText style={styles.bottomSheetTitle}>Comment</CustomText>
        <Pressable onPress={() => close()}>
          <X size={24} color={theme.value.color['gray-7']} />
        </Pressable>
      </View>
      <Controller
        control={control}
        name="comment"
        render={({ field, fieldState }) => (
          <>
            <Input
              mode="bottom-sheet"
              placeholder="Enter your comment"
              value={comment}
              onChangeText={setComment}
              showMaxLength
              maxLength={20}
              isError={!!fieldState.error}
              description={fieldState.error?.message}
            />
            <Button
              variant="solid-white"
              size="xl"
              onPress={() => {
                field.onChange(comment);
                close();
              }}>
              <ButtonText variant="solid-white">Add</ButtonText>
            </Button>
          </>
        )}
      />
    </BottomSheetView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: theme.color['gray-1'],
  },
  content: {
    paddingHorizontal: 20,
    rowGap: 24,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 320,
  },
  imageOverlay: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageOverlayHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
  },
  imageOverlayFooter: {
    width: '100%',
    padding: 16,
  },
  imageOverlayFooterButton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
  },
  imageOverlayFooterButtonText: {
    color: theme.color['opacity-white-80'],
    fontSize: theme.fontSize['sm'],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  description: {
    color: theme.color['gray-9'],
    fontSize: theme.fontSize['md'],
  },
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    bottom: 32,
    rowGap: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['md'],
  },
  bottomSheetContainer: {
    rowGap: 24,
    paddingBottom: 20,
  },
  bottomSheetHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetHeaderLeft: {
    width: 24,
    height: 24,
  },
  bottomSheetTitle: {
    flex: 1,
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['semibold'],
    textAlign: 'center',
  },
}));
