import getRandomFeeds from '../api/get-random-feeds';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getRandomFeedsOptions() {
  return queryOptions({
    queryKey: queryKeys.feed['get-random-feeds'],
    queryFn: async () => {
      const result = await getRandomFeeds();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
