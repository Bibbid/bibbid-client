import * as v from 'valibot';
import { FeedListItemSchema } from '~/entities/feed';
import { CursorResponseSchema } from '~/shared/api/response-schemas';

export const GetColorFeedsResponseSchema =
  CursorResponseSchema(FeedListItemSchema);

export type GetColorFeedsResponse = v.InferOutput<
  typeof GetColorFeedsResponseSchema
>;
