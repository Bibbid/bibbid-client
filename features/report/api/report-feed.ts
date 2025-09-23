import type { ReportFeedRequest } from '../model/parameters';
import { parseResponse } from '~/shared/api/response-parser';
import { VoidResponseSchema } from '~/shared/api/response-schemas';
import { api } from '~/shared/auth';

export default async function reportFeed(request: ReportFeedRequest) {
  const json = await api
    .post('reports/feed', {
      json: {
        ...request,
      },
    })
    .json();

  return parseResponse(json, VoidResponseSchema);
}
