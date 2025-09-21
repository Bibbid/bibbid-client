import { FEED_CAROUSEL_SIZE } from '../config/feed-carousel';
import { GetHomeFeedsResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getTodayColorFeeds() {
  const json = await api
    .get('feeds/discovery/today-color', {
      searchParams: {
        count: FEED_CAROUSEL_SIZE,
      },
    })
    .json();

  return parseResponse(json, GetHomeFeedsResponseSchema);
}
