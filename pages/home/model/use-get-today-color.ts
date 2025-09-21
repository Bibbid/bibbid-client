import getTodayColor from '../api/get-today-color';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Color } from '~/entities/color';
import { queryKeys } from '~/shared/api/query-keys';
import { formatZonedTime } from '~/shared/lib';

export default function useGetTodayColor({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Color) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user:get-today-color'],
    mutationFn: async () => {
      const result = await getTodayColor();

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
    onSuccess: (data) => {
      onSuccess?.(data.todayColor);
      queryClient.invalidateQueries({
        queryKey: queryKeys.color['get-my-today-color'](
          formatZonedTime({ date: new Date() })
        ),
      });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
