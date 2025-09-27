import { GetMyTokensResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getMyTokens() {
  const json = await api.get('users/me/tokens').json();

  return parseResponse(json, GetMyTokensResponseSchema);
}
