import useGetTodayColor from '../model/use-get-today-color';
import CameraCaptureButton from './camera-capture-button';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { RefreshCcw } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Dot from '~/assets/icons/dot-solid.svg';
import { Color } from '~/entities/color';
import { mmkv } from '~/shared/model';
import { Button, ButtonText } from '~/shared/ui/button';
import { Chip } from '~/shared/ui/chip';
import { CustomText } from '~/shared/ui/text';

export default function TodayColorSection() {
  const [todayColor, setTodayColor] = useState<Color>({
    displayName: mmkv.getString('todayColorDisplayName') || '???',
    rgbHexCode: mmkv.getString('todayColorRgb') || 'white',
  });

  const hasTodayColor =
    todayColor.displayName !== '???' && todayColor.rgbHexCode !== 'white';

  const handleSuccess = (data: Color) => {
    mmkv.set('todayColorDisplayName', data.displayName);
    mmkv.set('todayColorRgb', data.rgbHexCode);
    mmkv.set('todayColorDate', format(new Date(), 'yyyy-MM-dd'));
    setTodayColor(data);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { alignItems: hasTodayColor ? 'center' : 'flex-end' },
        ]}>
        <View style={styles.left}>
          <CustomText style={styles.title}>Today&apos;s Color</CustomText>
          <Chip
            type="tinted"
            label={todayColor.displayName}
            leftIcon={Dot}
            customColor={todayColor.rgbHexCode}
            style={{ width: hasTodayColor ? 'auto' : 62 }}
          />
        </View>
        <View style={styles.right}>
          {hasTodayColor ? (
            <ChangeTodayColorButton onSuccess={handleSuccess} />
          ) : (
            <GetTodayColorButton onSuccess={handleSuccess} />
          )}
        </View>
      </View>
      {hasTodayColor && <CameraCaptureButton />}
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

const styles = StyleSheet.create((theme) => ({
  container: {
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
}));
