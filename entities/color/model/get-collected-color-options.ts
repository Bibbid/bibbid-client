import getCollectedColor from '../api/get-collected-color';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getCollectedColorOptions() {
  return queryOptions({
    queryKey: queryKeys.color['get-collected-color'],
    queryFn: async () => {
      const result = await getCollectedColor();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
