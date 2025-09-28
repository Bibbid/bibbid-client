import { DownloadHighQualityImageResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function downloadHighQualityImage(feedId: number) {
  const json = await api.post(`feeds/${feedId}/image/original`).json();

  return parseResponse(json, DownloadHighQualityImageResponseSchema);
}
