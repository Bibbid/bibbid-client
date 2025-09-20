import getMyTokens from '../api/get-my-tokens';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getMyTokensOptions() {
  return queryOptions({
    queryKey: queryKeys.token['get-my-tokens'],
    queryFn: async () => {
      const result = await getMyTokens();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
