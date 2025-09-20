import { TokenResponseSchema } from '../model/schemas';
import { api } from './authenticated-ky.config';
import { parseResponse } from '~/shared/api/response-parser';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

export default async function reissueToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const json = await api
    .post('/auth/reissue-token', {
      json: {
        refreshToken,
      },
    })
    .json();

  return parseResponse(json, GeneralResponseSchema(TokenResponseSchema));
}
