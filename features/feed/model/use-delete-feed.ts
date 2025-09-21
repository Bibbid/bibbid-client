import deleteFeed from '../api/delete-feed';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '~/shared/ui/toast';

export default function useDeleteFeed({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ['user:delete-feed'],
    mutationFn: async (feedId: number) => {
      const result = await deleteFeed(feedId);

      if (!result.success) {
        throw result.error;
      }

      return result.data;
    },
    onSuccess: () => {
      onSuccess?.();
      showToast({
        text1: 'Post deleted.',
        text2: 'Try uploading again tomorrow!',
      });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
