import { GetCollectedColorResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getCollectedColor() {
  const json = await api.get('users/me/colors').json();

  return parseResponse(json, GetCollectedColorResponseSchema);
}
