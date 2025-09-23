import { GetMyFeedCountsResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getMyFeedCounts() {
  const json = await api.get('users/me/feeds/color-counts').json();

  return parseResponse(json, GetMyFeedCountsResponseSchema);
}
