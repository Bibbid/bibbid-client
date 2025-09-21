import getFeedDetail from '../api/get-feed-detail';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getFeedDetailOptions(feedId: number) {
  return queryOptions({
    queryKey: queryKeys.feed['get-feed-detail'](feedId),
    queryFn: async () => {
      const result = await getFeedDetail(feedId);

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
