import getTodayColorFeeds from '../api/get-today-color-feeds';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getTodayColorFeedsOptions() {
  return queryOptions({
    queryKey: queryKeys.feed['get-today-color-feeds'],
    queryFn: async () => {
      const result = await getTodayColorFeeds();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
