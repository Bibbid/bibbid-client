import { parseResponse } from '~/shared/api/response-parser';
import { VoidResponseSchema } from '~/shared/api/response-schemas';
import { api } from '~/shared/auth';

export default async function changeName({ name }: { name: string }) {
  const json = await api
    .put('users/me/name', {
      json: {
        name,
      },
    })
    .json();

  return parseResponse(json, VoidResponseSchema);
}
