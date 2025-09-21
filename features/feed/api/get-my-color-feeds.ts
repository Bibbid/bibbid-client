import type { GetFeedsRequest } from '../model/parameters';
import { GetColorFeedsResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getColorFeeds({
  color,
  cursor,
  size = 20,
  sort = 'createdAt',
}: GetFeedsRequest) {
  const json = await api
    .get('users/me/feeds', {
      searchParams: {
        ...(color !== 'All' && { color }),
        ...(cursor !== 0 && { cursor }),
        size,
        sort,
      },
    })
    .json();

  return parseResponse(json, GetColorFeedsResponseSchema);
}
