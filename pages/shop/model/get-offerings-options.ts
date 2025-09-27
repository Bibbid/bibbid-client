import getOfferings from '../api/get-token-purchase-list';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getOfferingsOptions() {
  return queryOptions({
    queryKey: queryKeys.shop['get-offerings'],
    queryFn: () => getOfferings(),
  });
}
