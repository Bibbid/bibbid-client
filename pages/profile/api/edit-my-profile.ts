import type { EditProfileRequest } from '../model/parameters';
import { GetMyProfileResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function editMyProfile({
  buddyName,
  buddyColor,
}: EditProfileRequest) {
  const json = await api
    .patch('users/me', {
      json: {
        buddyName,
        buddyColor,
      },
    })
    .json();

  return parseResponse(json, GetMyProfileResponseSchema);
}
