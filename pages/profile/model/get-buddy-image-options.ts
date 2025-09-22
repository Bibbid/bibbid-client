import getBuddyImage from '../api/get-buddy-image';
import type { GetBuddyImageRequest } from './parameters';
import { queryOptions } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function getBuddyImageOptions({
  buddyCharacter,
  buddyColor,
}: GetBuddyImageRequest) {
  return queryOptions({
    queryKey: queryKeys.profile['get-buddy-image'](buddyCharacter, buddyColor),
    queryFn: async () => {
      const result = await getBuddyImage({ buddyCharacter, buddyColor });

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
  });
}
