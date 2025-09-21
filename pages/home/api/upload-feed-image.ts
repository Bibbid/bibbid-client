import { UploadFeedImageResponseSchema } from '../model/schemas';
import { File } from 'expo-file-system/next';
import { fetch } from 'expo/fetch';
import { parseResponse } from '~/shared/api/response-parser';
import { useAuthStore } from '~/shared/auth';

export default async function uploadFeedImage(file: File) {
  const formData = new FormData();

  const accessToken = useAuthStore.getState().accessToken;
  const refreshToken = useAuthStore.getState().refreshToken;

  formData.append('file', file.blob());

  const json = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}api/v1/files/feeds`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken ?? refreshToken}`,
      },
      body: formData,
    }
  ).then((response) => response.json());

  return parseResponse(json, UploadFeedImageResponseSchema);
}
