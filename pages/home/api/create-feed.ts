import { CreateFeedRequest } from '../model/parameters';
import { FeedDetailSchema } from '~/entities/feed';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function createFeed(request: CreateFeedRequest) {
  const json = await api
    .post('feeds', {
      json: {
        ...request,
      },
    })
    .json();

  return parseResponse(json, FeedDetailSchema);
}
