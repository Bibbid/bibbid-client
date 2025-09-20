import { GetMyProfileResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getMyProfile() {
  const json = await api.get('users/me').json();

  return parseResponse(json, GetMyProfileResponseSchema);
}
