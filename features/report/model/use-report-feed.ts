import reportFeed from '../api/report-feed';
import type { ReportFeedRequest } from './parameters';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useReportFeed({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user:report-feed'],
    mutationFn: async (request: ReportFeedRequest) => {
      const result = await reportFeed(request);

      if (!result.success) {
        throw result.error;
      }

      return result.data;
    },
    onSuccess: () => {
      onSuccess?.();
      queryClient.clear();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
