import uploadFeedImage from '../api/upload-feed-image';
import { useMutation } from '@tanstack/react-query';

export default function useUploadFeedImage({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: {
    originalFileid: number;
    compressedFileid: number;
  }) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ['user:upload-feed-image'],
    mutationFn: async (blob: Blob) => {
      const result = await uploadFeedImage(blob);

      if (!result.success) {
        throw result.error;
      }

      return result.data;
    },
    onSuccess: ({ data }) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
