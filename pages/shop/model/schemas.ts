import * as v from 'valibot';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';
import { PresignedUrlSchema } from '~/shared/model';

export const ItemSchema = v.object({
  itemId: v.number(),
  itemImage: v.nullable(PresignedUrlSchema),
  name: v.string(),
  description: v.string(),
  price: v.number(),
  myCount: v.number(),
});

export type Item = v.InferOutput<typeof ItemSchema>;

export const GetItemListResponseSchema = GeneralResponseSchema(
  v.array(ItemSchema)
);

export type GetItemListResponse = v.InferOutput<
  typeof GetItemListResponseSchema
>;
