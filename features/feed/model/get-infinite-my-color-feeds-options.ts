import getMyColorFeeds from '../api/get-my-color-feeds';
import type { GetFeedsRequest } from './parameters';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getInfiniteMyColorFeedsOptions({
  color,
  cursor = 0,
  size,
  sort,
}: GetFeedsRequest) {
  return infiniteQueryOptions({
    queryKey: queryKeys.feed['get-infinite-my-color-feeds'](color),
    queryFn: async ({ pageParam }) => {
      const result = await getMyColorFeeds({
        color,
        cursor: pageParam,
        size,
        sort,
      });

      if (!result.success) {
        throw result.error;
      }

      return result.data.data.data;
    },
    initialPageParam: cursor,
    getNextPageParam: (lastPage) => {
      return lastPage.at(-1)?.feedId ?? undefined;
    },
  });
}
