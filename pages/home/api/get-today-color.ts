import { GetTodayColorResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getTodayColor() {
  const json = await api.post('users/me/today-color').json();

  return parseResponse(json, GetTodayColorResponseSchema);
}
