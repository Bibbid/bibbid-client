import reportUser from '../api/report-user';
import type { ReportUserRequest } from './parameters';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useReportUser({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user:report-user'],
    mutationFn: async (request: ReportUserRequest) => {
      const result = await reportUser(request);

      if (!result.success) {
        throw result.error;
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.clear();
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
