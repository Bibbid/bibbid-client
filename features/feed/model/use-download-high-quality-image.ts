import downloadHighQualityImage from '../api/download-high-quality-image';
import type { DownloadHighQualityImageResponse } from './schemas';
import { useMutation } from '@tanstack/react-query';

export default function useDownloadHighQualityImage({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: DownloadHighQualityImageResponse) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ['feed:download-high-quality-image'],
    mutationFn: async (feedId: number) => {
      const result = await downloadHighQualityImage(feedId);

      if (!result.success) {
        throw result.error;
      }

      return result.data;
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
