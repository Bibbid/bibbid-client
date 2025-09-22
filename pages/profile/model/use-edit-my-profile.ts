import editMyProfile from '../api/edit-my-profile';
import type { EditProfileRequest } from './parameters';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/shared/api/query-keys';

export default function useEditMyProfile({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user:edit-my-profile'],
    mutationFn: async ({ buddyName, buddyColor }: EditProfileRequest) => {
      const result = await editMyProfile({ buddyName, buddyColor });

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile['get-my-profile'],
      });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
