import * as v from 'valibot';
import { FeedDetailSchema, FeedListItemSchema } from '~/entities/feed';
import {
  CursorResponseSchema,
  GeneralResponseSchema,
} from '~/shared/api/response-schemas';

export const GetColorFeedsResponseSchema =
  CursorResponseSchema(FeedListItemSchema);

export type GetColorFeedsResponse = v.InferOutput<
  typeof GetColorFeedsResponseSchema
>;

export const GetFeedDetailResponseSchema =
  GeneralResponseSchema(FeedDetailSchema);

export type GetFeedDetailResponse = v.InferOutput<
  typeof GetFeedDetailResponseSchema
>;
