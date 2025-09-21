import createFeed from '../api/create-feed';
import type { CreateFeedRequest } from './parameters';
import { useMutation } from '@tanstack/react-query';
import type { FeedDetail } from '~/entities/feed';

export default function useCreateFeed({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: FeedDetail) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ['user:create-feed'],
    mutationFn: async (data: CreateFeedRequest) => {
      const result = await createFeed(data);

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
