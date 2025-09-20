import { parseResponse } from '~/shared/api/response-parser';
import { VoidResponseSchema } from '~/shared/api/response-schemas';
import { api } from '~/shared/auth';

export default async function deleteAccount() {
  const json = await api.delete('users/me').json();

  return parseResponse(json, VoidResponseSchema);
}
