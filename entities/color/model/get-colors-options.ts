import getColors from '../api/get-colors';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getColorsOptions() {
  return queryOptions({
    queryKey: queryKeys.color['get-colors'],
    queryFn: async () => {
      const result = await getColors();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
