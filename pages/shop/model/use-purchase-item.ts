import purchaseItem from '../api/purchase-item';
import { useMutation } from '@tanstack/react-query';

export default function usePurchaseItem({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ['shop:purchase-item'],
    mutationFn: async (itemId: number) => {
      const result = await purchaseItem(itemId);

      if (!result.success) {
        throw result.error;
      }

      return result.data;
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
