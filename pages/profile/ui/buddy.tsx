import getBuddyImageOptions from '../model/get-buddy-image-options';
import { UpdateBuddyForm, UpdateBuddyFormSchema } from '../model/schemas';
import useEditMyProfile from '../model/use-edit-my-profile';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { SuspenseQuery } from '@suspensive/react-query';
import { Check, X } from 'lucide-react-native';
import { Suspense, useRef, useState } from 'react';
import {
  Control,
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { getCollectedColorOptions } from '~/entities/color';
import { hexToRgba } from '~/shared/lib';
import { CustomBottomSheet } from '~/shared/ui/bottom-sheet';
import { Button, ButtonText } from '~/shared/ui/button';
import { Image } from '~/shared/ui/image';
import { Input } from '~/shared/ui/input';
import { Loading } from '~/shared/ui/loading';
import { CustomText } from '~/shared/ui/text';
import { showToast } from '~/shared/ui/toast';

const MAX_BUDDY_NAME_LENGTH = 20;

interface BuddyProps {
  buddyCharacter: string;
  buddyName: string;
  buddyColor: string;
}

export default function Buddy({
  buddyCharacter,
  buddyName: initialBuddyName,
  buddyColor: initialBuddyColor,
}: BuddyProps) {
  const methods = useForm<UpdateBuddyForm>({
    defaultValues: {
      buddyName: initialBuddyName,
      buddyColor: initialBuddyColor,
    },
    resolver: valibotResolver(UpdateBuddyFormSchema),
  });
  const { control, handleSubmit } = methods;

  const buddyName = useWatch({ control, name: 'buddyName' });
  const buddyColor = useWatch({ control, name: 'buddyColor' });

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { mutateAsync: editMyProfile } = useEditMyProfile({
    onSuccess: () => {
      showToast({
        text1: 'Profile updated successfully',
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        text1: error.message,
        type: 'error',
      });
    },
  });

  const onSubmit = handleSubmit(
    async (data) => {
      await editMyProfile({
        buddyName: data.buddyName,
        buddyColor: data.buddyColor,
      });
    },
    (error) => {
      showToast({
        text1: error.buddyName?.message ?? 'Invalid buddy name',
        type: 'error',
      });
    }
  );

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.buddyContainer}>
            <Image
              source={require('~/assets/images/background.png')}
              style={styles.buddyBackground}
            />
            <View style={styles.buddyWrapper}>
              <Suspense fallback={<Loading />}>
                <SuspenseQuery
                  {...getBuddyImageOptions({ buddyCharacter, buddyColor })}>
                  {({ data }) => (
                    <Image
                      source={{ uri: data.presignedUrl }}
                      style={styles.buddyImage}
                      contentFit="contain"
                    />
                  )}
                </SuspenseQuery>
              </Suspense>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <CustomText style={styles.label}>Name</CustomText>
            <Pressable
              style={styles.inputButton}
              onPress={() => {
                bottomSheetRef.current?.present();
              }}>
              <CustomText style={styles.inputButtonText}>
                {buddyName}
              </CustomText>
              <CustomText style={styles.inputLengthText}>
                {buddyName.length}/{MAX_BUDDY_NAME_LENGTH}
              </CustomText>
            </Pressable>
          </View>
          <View style={styles.gap} />
          <View style={styles.colorContainer}>
            <CustomText style={styles.label}>Color</CustomText>
            <ColorSelector />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button
            size="xl"
            variant="solid-light"
            style={styles.saveButton}
            onPress={onSubmit}>
            <ButtonText size="lg" variant="solid-light">
              Save
            </ButtonText>
          </Button>
        </View>
        <CustomBottomSheet ref={bottomSheetRef} index={0}>
          <BuddyNameBottomSheetContent
            control={control}
            close={() => bottomSheetRef.current?.close()}
            initialBuddyName={initialBuddyName}
          />
        </CustomBottomSheet>
      </View>
    </FormProvider>
  );
}

function BuddyNameBottomSheetContent({
  control,
  close,
  initialBuddyName,
}: {
  control: Control<UpdateBuddyForm>;
  close: () => void;
  initialBuddyName: string;
}) {
  const { bottom } = useSafeAreaInsets();

  const theme = useAnimatedTheme();

  const [buddyName, setBuddyName] = useState(initialBuddyName);

  return (
    <BottomSheetView style={styles.bottomSheetContainer}>
      <View style={[styles.bottomSheetWrapper, { paddingBottom: bottom }]}>
        <View style={styles.bottomSheetHeader}>
          <View style={styles.bottomSheetBlank} />
          <CustomText style={styles.bottomSheetTitle}>Name</CustomText>
          <Pressable onPress={() => close()}>
            <X size={24} color={theme.value.color['gray-7']} />
          </Pressable>
        </View>
        <Controller
          control={control}
          name="buddyName"
          render={({ field, fieldState }) => (
            <>
              <Input
                mode="bottom-sheet"
                placeholder="Enter your buddy name"
                value={buddyName}
                onChangeText={setBuddyName}
                showMaxLength
                maxLength={MAX_BUDDY_NAME_LENGTH}
                isError={!!fieldState.error}
                description={
                  fieldState.error?.message ??
                  'You can use letters, numbers, underscores and periods.'
                }
              />
              <Button
                size="xl"
                variant="solid-white"
                onPress={() => {
                  field.onChange(buddyName);
                  close();
                }}
                disabled={buddyName.length === 0 || !!fieldState.error}>
                <ButtonText variant="solid-white">Add</ButtonText>
              </Button>
            </>
          )}
        />
      </View>
    </BottomSheetView>
  );
}

function ColorSelector() {
  const { control } = useFormContext<UpdateBuddyForm>();

  return (
    <Controller
      control={control}
      name="buddyColor"
      render={({ field }) => (
        <View style={styles.colorPaletteContainer}>
          <SuspenseQuery {...getCollectedColorOptions()}>
            {({ data }) => (
              <>
                <View style={styles.colorPaletteHeader}>
                  <CustomText style={styles.colorPaletteTitle}>
                    Palette
                  </CustomText>
                  <CustomText style={styles.colorPaletteSubtitle}>
                    {data.length}
                  </CustomText>
                </View>
                <View style={styles.colorPalette}>
                  {data.map(({ displayName, rgbHexCode, shadowHexCode }) => {
                    const shadow = hexToRgba({
                      hex: shadowHexCode,
                      alpha: 0.2,
                    });

                    return (
                      <Pressable
                        key={displayName}
                        style={[
                          styles.color,
                          {
                            width: `${(1 / 7) * 100}%`,
                            backgroundColor: rgbHexCode,
                            boxShadow: `inset 0 -6px 6px 0 rgba(255, 255, 255, 0.16), inset 4px 4px 6px 0 ${shadow}`,
                            opacity: field.value === displayName ? 1 : 0.2,
                          },
                        ]}
                        onPress={() => {
                          field.onChange(displayName);
                        }}>
                        {field.value === displayName && (
                          <Check size={22} color="white" />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </>
            )}
          </SuspenseQuery>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  buddyContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  buddyBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.radius['lg'],
  },
  buddyWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  buddyImage: {
    width: 176,
    height: 203,
  },
  inputContainer: {
    rowGap: 8,
  },
  label: {
    color: 'white',
    fontSize: theme.fontSize['md'],
  },
  inputButton: {
    height: 44,
    width: '100%',
    backgroundColor: theme.color['gray-2'],
    borderRadius: theme.radius['md'],
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputButtonText: {
    flex: 1,
    color: 'white',
    fontSize: theme.fontSize['sm'],
  },
  inputLengthText: {
    color: theme.color['gray-5'],
    fontSize: theme.fontSize['md'],
    fontWeight: theme.fontWeight['medium'],
  },
  bottomSheetContainer: {
    paddingBottom: 20,
  },
  bottomSheetWrapper: {
    rowGap: 24,
  },
  bottomSheetHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetBlank: {
    width: 24,
    height: 24,
  },
  bottomSheetTitle: {
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['semibold'],
    color: theme.color['gray-11'],
  },
  colorContainer: {
    rowGap: 8,
  },
  colorPaletteContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 16,
    rowGap: 8,
    backgroundColor: theme.color['gray-2'],
  },
  colorPaletteHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorPaletteTitle: {
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['sm'],
  },
  colorPaletteSubtitle: {
    color: 'white',
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  colorPalette: {
    display: 'flex',
    flexDirection: 'row',
  },
  color: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
  gap: {
    width: '100%',
    height: 16,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    paddingHorizontal: 20,
  },
  saveButton: {
    width: '100%',
  },
}));
