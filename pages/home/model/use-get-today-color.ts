import getTodayColor from '../api/get-today-color';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Color } from '~/entities/color';
import { queryKeys } from '~/shared/api/query-keys';

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
          format(new Date(), 'yyyy-MM-dd')
        ),
      });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
