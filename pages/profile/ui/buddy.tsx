import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { X } from 'lucide-react-native';
import { useRef } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { CustomBottomSheet } from '~/shared/ui/bottom-sheet';
import { Button, ButtonText } from '~/shared/ui/button';
import { Input } from '~/shared/ui/input';
import { CustomText } from '~/shared/ui/text';

export default function Buddy() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  const theme = useAnimatedTheme();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.buddyContainer}>
          <Image
            source={require('~/assets/images/background.png')}
            style={styles.buddyBackground}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomText style={styles.inputLabel}>Name</CustomText>
          <Pressable
            style={styles.inputButton}
            onPress={() => {
              bottomSheetRef.current?.present();
            }}>
            <CustomText style={styles.inputButtonText}>Select</CustomText>
            <CustomText style={styles.inputLengthText}>0/20</CustomText>
          </Pressable>
        </View>
      </ScrollView>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['50%']} index={0}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={[styles.bottomSheetWrapper, { paddingBottom: bottom }]}>
            <View style={styles.bottomSheetHeader}>
              <View style={styles.bottomSheetBlank} />
              <CustomText style={styles.bottomSheetTitle}>Name</CustomText>
              <Pressable onPress={() => bottomSheetRef.current?.close()}>
                <X size={24} color={theme.value.color['gray-7']} />
              </Pressable>
            </View>
            <>
              <Input mode="bottom-sheet" />
              <Button size="xl" variant="solid-white">
                <ButtonText variant="solid-white">Add</ButtonText>
              </Button>
            </>
          </View>
        </BottomSheetView>
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  inputContainer: {
    rowGap: 8,
  },
  inputLabel: {
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
}));
