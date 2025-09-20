import deleteAccount from '../api/delete-account';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteAccount({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ['user:delete-account'],
    mutationFn: async () => {
      const result = await deleteAccount();

      if (!result.success) {
        throw result.error;
      }
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
