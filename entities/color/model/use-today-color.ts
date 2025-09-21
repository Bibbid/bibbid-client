import getMyTodayColorOptions from './get-my-today-color-options';
import { Color } from './schemas';
import { useQuery } from '@tanstack/react-query';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';

export default function useTodayColor(): Color & { hasTodayColor: boolean } {
  const theme = useAnimatedTheme();

  const todayColor = useQuery(getMyTodayColorOptions());

  return todayColor.data
    ? {
        displayName: todayColor.data.todayColor.displayName,
        rgbHexCode: todayColor.data.todayColor.rgbHexCode,
        shadowHexCode: todayColor.data.todayColor.shadowHexCode,
        hasTodayColor: true,
      }
    : {
        displayName: '???',
        rgbHexCode: theme.value.color['gray-1'],
        shadowHexCode: 'black',
        hasTodayColor: false,
      };
}
