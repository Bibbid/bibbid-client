import getItemList from '../api/get-item-list';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getItemListOptions() {
  return queryOptions({
    queryKey: queryKeys.shop['get-item-list'],
    queryFn: async () => {
      const result = await getItemList();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
