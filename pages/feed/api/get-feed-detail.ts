import { GetFeedDetailResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getFeedDetail(feedId: number) {
  const json = await api.get(`feeds/${feedId}`).json();

  return parseResponse(json, GetFeedDetailResponseSchema);
}
