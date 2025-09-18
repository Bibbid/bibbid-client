import getTodayColor from '../api/get-today-color';
import { useMutation } from '@tanstack/react-query';
import { Color } from '~/entities/color';

export default function useGetTodayColor({
  onSuccess,
}: {
  onSuccess?: (data: Color) => void;
}) {
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
      onSuccess?.(data.color);
    },
  });
}
