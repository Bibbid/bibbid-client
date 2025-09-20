import useGetTodayColor from '../model/use-get-today-color';
import { format } from 'date-fns';
import { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Dot from '~/assets/icons/dot-solid.svg';
import { Color } from '~/entities/color';
import { mmkv } from '~/shared/model';
import { Button, ButtonText } from '~/shared/ui/button';
import { Chip } from '~/shared/ui/chip';
import { CustomText } from '~/shared/ui/text';

export default function GetTodayColorSection() {
  const [todayColor, setTodayColor] = useState<Color>({
    displayName: mmkv.getString('todayColorDisplayName') || '???',
    rgbHexCode: mmkv.getString('todayColorRgb') || 'white',
  });

  const { mutateAsync } = useGetTodayColor({
    onSuccess: (data) => {
      mmkv.set('todayColorDisplayName', data.displayName);
      mmkv.set('todayColorRgb', data.rgbHexCode);
      mmkv.set('todayColorDate', format(new Date(), 'yyyy-MM-dd'));
      setTodayColor(data);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <CustomText style={styles.title}>Today&apos;s Color</CustomText>
        <Chip
          type="tinted"
          label={todayColor.displayName}
          leftIcon={Dot}
          customColor={todayColor.rgbHexCode}
        />
      </View>
      <View style={styles.right}>
        <Button variant="solid-white" onPress={() => mutateAsync()}>
          <ButtonText variant="solid-white" style={styles.buttonText}>
            Get Color
          </ButtonText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    backgroundColor: theme.color['opacity-white-16'],
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    padding: 16,
    borderRadius: theme.radius['xs'],
    border: `solid 1px ${theme.color['opacity-white-16']}`,
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
