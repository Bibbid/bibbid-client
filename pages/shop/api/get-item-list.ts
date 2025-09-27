import { GetItemListResponseSchema } from '../model/schemas';
import { parseResponse } from '~/shared/api/response-parser';
import { api } from '~/shared/auth';

export default async function getItemList() {
  const json = await api.get('shop/items').json();

  return parseResponse(json, GetItemListResponseSchema);
}
