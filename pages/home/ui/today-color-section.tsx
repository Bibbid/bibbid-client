import getTodayMyFeedOptions from '../model/get-today-my-feed-options';
import useGetTodayColor from '../model/use-get-today-color';
import CameraCaptureArea from './camera-capture-area';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { SuspenseQuery } from '@suspensive/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MoreHorizontal, RefreshCcw, Trash2 } from 'lucide-react-native';
import { overlay } from 'overlay-kit';
import { useRef } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import Dot from '~/assets/icons/dot-solid.svg';
import { type Color, useTodayColor } from '~/entities/color';
import { type TodayUploadedFeed } from '~/entities/feed';
import { useDeleteFeed } from '~/features/feed';
import { queryKeys } from '~/shared/api/query-keys';
import { hexToRgba } from '~/shared/lib';
import { CustomBottomSheet } from '~/shared/ui/bottom-sheet';
import { Button, ButtonText } from '~/shared/ui/button';
import { Chip } from '~/shared/ui/chip';
import { GeneralModal } from '~/shared/ui/modal';
import { CustomText } from '~/shared/ui/text';
import { showToast } from '~/shared/ui/toast';

export default function TodayColorSection() {
  return (
    <SuspenseQuery {...getTodayMyFeedOptions()}>
      {({ data }) => (
        <TodayColor data={data.feed} postedToday={data.postedToday} />
      )}
    </SuspenseQuery>
  );
}

function TodayColor({
  data,
  postedToday,
}: {
  data: TodayUploadedFeed[];
  postedToday: boolean;
}) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteFeed } = useDeleteFeed({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.feed['get-today-my-feed'],
      });
      bottomSheetRef.current?.close();
    },
    onError: (error: Error) => {
      showToast({ text1: error.message, type: 'error' });
    },
  });

  const { displayName, rgbHexCode, hasTodayColor } = useTodayColor();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={[
          rgbHexCode,
          hexToRgba({
            hex: rgbHexCode,
            alpha: 0,
          }),
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
      />
      <View style={styles.content}>
        <View
          style={[
            styles.header,
            { alignItems: hasTodayColor ? 'center' : 'flex-end' },
          ]}>
          <View style={styles.left}>
            <CustomText style={styles.title}>Today&apos;s Color</CustomText>
            <Chip
              type="tinted"
              label={displayName}
              leftIcon={Dot}
              customColor={hasTodayColor ? rgbHexCode : 'white'}
              style={{ width: hasTodayColor ? 'auto' : 62 }}
            />
          </View>
          <View style={styles.right}>
            {hasTodayColor ? (
              <>
                {postedToday ? (
                  <RemoveTodayFeedButton
                    onPress={() => bottomSheetRef.current?.present()}
                  />
                ) : (
                  <ChangeTodayColorButton onSuccess={() => {}} />
                )}
              </>
            ) : (
              <GetTodayColorButton onSuccess={() => {}} />
            )}
          </View>
        </View>
        {hasTodayColor && (
          <CameraCaptureArea data={data} postedToday={postedToday} />
        )}
      </View>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['50%']} index={0}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={[{ paddingBottom: bottom }, styles.bottomSheetContent]}>
            <Pressable
              style={styles.bottomSheetMenu}
              onPress={() => {
                overlay.open(({ isOpen, close }) => (
                  <GeneralModal
                    visible={isOpen}
                    image={require('~/assets/images/delete.png')}
                    title="Confirm"
                    subTitle="Delete this post?"
                    description="You cannot upload a post with the same color today."
                    actionText="Delete"
                    onClose={close}
                    onAction={() => {
                      deleteFeed(data[0].feedId);
                      close();
                    }}
                  />
                ));
              }}>
              <Trash2 size={20} color="white" />
              <CustomText style={styles.bottomSheetText}>
                Delete Post
              </CustomText>
            </Pressable>
            <Button size="xl" onPress={() => bottomSheetRef.current?.close()}>
              <ButtonText style={styles.bottomSheetButtonText}>
                close
              </ButtonText>
            </Button>
          </View>
        </BottomSheetView>
      </CustomBottomSheet>
    </View>
  );
}

interface ChangeTodayColorButtonProps {
  onSuccess: (data: Color) => void;
}

function ChangeTodayColorButton({ onSuccess }: ChangeTodayColorButtonProps) {
  return (
    <Pressable>
      <RefreshCcw size={24} color="white" />
    </Pressable>
  );
}

interface GetTodayColorButtonProps {
  onSuccess: (data: Color) => void;
}

function GetTodayColorButton({ onSuccess }: GetTodayColorButtonProps) {
  const router = useRouter();

  const { mutateAsync } = useGetTodayColor({
    onSuccess: (data) => {
      onSuccess(data);
      router.push('/(authorized)/home/today-color');
    },
  });

  return (
    <Button variant="solid-white" onPress={() => mutateAsync()}>
      <ButtonText variant="solid-white" style={styles.buttonText}>
        Get Color
      </ButtonText>
    </Button>
  );
}

function RemoveTodayFeedButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <MoreHorizontal size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    elevation: 1,
    paddingHorizontal: 20,
  },
  gradient: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 486,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
    backgroundColor: theme.color['opacity-white-16'],
    width: '100%',
    padding: 16,
    borderRadius: theme.radius['xs'],
    border: `solid 1px ${theme.color['opacity-white-16']}`,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 2,
  },
  title: {
    fontSize: theme.fontSize['xs'],
    color: 'white',
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
  },
  buttonText: {
    fontWeight: theme.fontWeight['semibold'],
  },
  bottomSheetContainer: {
    paddingBottom: 20,
  },
  bottomSheetContent: {
    rowGap: 24,
  },
  bottomSheetMenu: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
    paddingVertical: 14.5,
  },
  bottomSheetText: {
    color: 'white',
    fontSize: theme.fontSize['lg'],
  },
  bottomSheetButton: {
    width: '100%',
  },
  bottomSheetButtonText: {
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['md'],
    color: 'white',
  },
}));
