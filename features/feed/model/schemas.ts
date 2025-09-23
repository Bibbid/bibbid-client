import * as v from 'valibot';
import { FeedListItemSchema, MyFeedListItemSchema } from '~/entities/feed';
import {
  CursorResponseSchema,
  GeneralResponseSchema,
} from '~/shared/api/response-schemas';

export const GetColorFeedsResponseSchema =
  CursorResponseSchema(FeedListItemSchema);

export type GetColorFeedsResponse = v.InferOutput<
  typeof GetColorFeedsResponseSchema
>;

export const GetMyColorFeedsResponseSchema =
  CursorResponseSchema(MyFeedListItemSchema);

export type GetMyColorFeedsResponse = v.InferOutput<
  typeof GetMyColorFeedsResponseSchema
>;

export const GetMyFeedCountsResponseSchema = GeneralResponseSchema(
  v.array(
    v.object({
      color: v.string(),
      count: v.number(),
    })
  )
);
