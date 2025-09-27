import { parseResponse } from '~/shared/api/response-parser';
import { VoidResponseSchema } from '~/shared/api/response-schemas';
import { api } from '~/shared/auth';

export default async function purchaseItem(itemId: number) {
  const json = await api.post(`shop/items/${itemId}/purchase`).json();

  return parseResponse(json, VoidResponseSchema);
}
