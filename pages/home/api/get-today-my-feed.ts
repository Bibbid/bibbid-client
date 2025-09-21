import { GetTodayMyFeedResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getTodayMyFeed() {
  const json = await api.get('users/me/feeds/today').json();

  return parseResponse(json, GetTodayMyFeedResponseSchema);
}
