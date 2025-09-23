import type { ReportUserRequest } from '../model/parameters';
import { parseResponse } from '~/shared/api/response-parser';
import { VoidResponseSchema } from '~/shared/api/response-schemas';
import { api } from '~/shared/auth';

export default async function reportUser(request: ReportUserRequest) {
  const json = await api.post('reports/user', {
    json: {
      ...request,
    },
  });

  return parseResponse(json, VoidResponseSchema);
}
