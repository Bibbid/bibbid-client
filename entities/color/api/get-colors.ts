import { GetColorsResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getColors() {
  const json = await api.get('colors').json();

  return parseResponse(json, GetColorsResponseSchema);
}
