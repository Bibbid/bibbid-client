import getMyTodayColor from '../api/get-my-today-color';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';
import { formatZonedTime } from '~/shared/lib';

export default function getMyTodayColorOptions() {
  return queryOptions({
    queryKey: queryKeys.color['get-my-today-color'](
      formatZonedTime({ date: new Date() })
    ),
    queryFn: async () => {
      const result = await getMyTodayColor();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
