import getColors from '../api/get-colors';
import { feedQueryKeys } from './query-keys';
import { queryOptions } from '@tanstack/react-query';

export default function getColorsOptions() {
  return queryOptions({
    queryKey: feedQueryKeys['get-colors'],
    queryFn: async () => {
      const result = await getColors();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
