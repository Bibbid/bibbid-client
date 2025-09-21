import { UploadFeedImageResponseSchema } from '../model/schemas';
import { File } from 'expo-file-system/next';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function uploadFeedImage(file: File) {
  const formData = new FormData();

  const base64 = file.base64();

  formData.append('file', base64);

  const response = await api.post('api/v1/files/feeds', {
    body: formData,
  });

  const json = await response.json();

  return parseResponse(json, UploadFeedImageResponseSchema);
}
