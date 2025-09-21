import getTodayMyFeed from '../api/get-today-my-feed';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getTodayMyFeedOptions() {
  return queryOptions({
    queryKey: queryKeys.feed['get-today-my-feed'],
    queryFn: async () => {
      const result = await getTodayMyFeed();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
