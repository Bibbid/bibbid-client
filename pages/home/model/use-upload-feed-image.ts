import uploadFeedImage from '../api/upload-feed-image';
import { useMutation } from '@tanstack/react-query';
import { File } from 'expo-file-system/next';

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
    mutationFn: async (file: File) => {
      const result = await uploadFeedImage(file);

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
