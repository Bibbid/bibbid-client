import { UploadFeedImageResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function uploadFeedImage(blob: Blob) {
  const formData = new FormData();

  formData.append('file', blob);

  console.log(formData);

  const json = await api
    .post('api/v1/files/feeds', {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .json();

  return parseResponse(json, UploadFeedImageResponseSchema);
}
