import * as v from 'valibot';
import { FeedDetailSchema } from '~/entities/feed';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

export const GetFeedDetailResponseSchema =
  GeneralResponseSchema(FeedDetailSchema);

export type GetFeedDetailResponse = v.InferOutput<
  typeof GetFeedDetailResponseSchema
>;
