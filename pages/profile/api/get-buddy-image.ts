import { GetBuddyImageRequest } from '../model/parameters';
import { GetBuddyImageResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getBuddyImage({
  buddyCharacter,
  buddyColor,
}: GetBuddyImageRequest) {
  const json = await api
    .get('buddies/images', {
      searchParams: {
        character: buddyCharacter,
        color: buddyColor,
      },
    })
    .json();

  return parseResponse(json, GetBuddyImageResponseSchema);
}
