import getMyFeedCounts from '../api/get-my-feed-counts';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getMyFeedCountsOptions() {
  return queryOptions({
    queryKey: queryKeys.profile['get-my-feed-counts'],
    queryFn: async () => {
      const result = await getMyFeedCounts();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
