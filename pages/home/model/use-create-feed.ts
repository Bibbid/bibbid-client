import createFeed from '../api/create-feed';
import type { CreateFeedRequest } from './parameters';
import type { CreateFeedResponse } from './schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function useCreateFeed({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: CreateFeedResponse) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

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

      // 오늘 업로드한 피드 데이터 초기화
      queryClient.invalidateQueries({
        queryKey: queryKeys.home['get-today-my-feed'],
      });
      // 내 프로필 데이터 초기화
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile['get-my-profile'],
      });
      // 수집한 색상 데이터 초기화
      queryClient.invalidateQueries({
        queryKey: queryKeys.color['get-collected-color'],
      });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
