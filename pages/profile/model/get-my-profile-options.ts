import getMyProfile from '../api/get-my-profile';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getMyProfileOptions() {
  return queryOptions({
    queryKey: queryKeys.profile['get-my-profile'],
    queryFn: async () => {
      const result = await getMyProfile();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
