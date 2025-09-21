import { GetMyTodayColorResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getMyTodayColor() {
  const json = await api.get('users/me/today-color').json();

  return parseResponse(json, GetMyTodayColorResponseSchema);
}
