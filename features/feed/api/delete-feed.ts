import { parseResponse } from '~/shared/api/response-parser';
import { VoidResponseSchema } from '~/shared/api/response-schemas';
import { api } from '~/shared/auth';

export default async function deleteFeed(feedId: number) {
  const json = await api.delete(`feeds/${feedId}`).json();

  return parseResponse(json, VoidResponseSchema);
}
