import changeName from '../api/change-name';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MyProfile } from '~/entities/profile';
import { queryKeys } from '~/shared/api/query-keys';

export default function useChangeName({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['user:change-name'],
    mutationFn: async ({ name }: { name: string }) => {
      const result = await changeName({ name });

      if (!result.success) {
        throw result.error;
      }

      return result.data.data;
    },
    onSuccess: (_, { name }) => {
      queryClient.setQueryData(
        queryKeys.profile['get-my-profile'],
        (old: MyProfile) => {
          return {
            ...old,
            name,
          };
        }
      );

      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
