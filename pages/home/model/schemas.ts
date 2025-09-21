import * as v from 'valibot';
import { ColorSchema } from '~/entities/color';
import {
  FeedDetailSchema,
  FeedListItemSchema,
  TodayUploadedFeedSchema,
} from '~/entities/feed';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

export const GetTodayColorResponseSchema = GeneralResponseSchema(
  v.object({
    todayColor: ColorSchema,
  })
);

export const CreateFeedFormSchema = v.pipe(
  v.object({
    comment: v.pipe(
      v.string(),
      v.minLength(1, 'Comment must be at least 1 character'),
      v.maxLength(20, 'Comment must be 20 characters or less')
    ),
  })
);

export type CreateFeedForm = v.InferOutput<typeof CreateFeedFormSchema>;

export const CreateFeedResponseSchema = GeneralResponseSchema(FeedDetailSchema);

export type CreateFeedResponse = v.InferOutput<typeof CreateFeedResponseSchema>;

export const UploadFeedImageResponseSchema = GeneralResponseSchema(
  v.object({
    compressedFileId: v.number(),
    originalFileId: v.number(),
  })
);

export type UploadFeedImageResponse = v.InferOutput<
  typeof UploadFeedImageResponseSchema
>;

export const GetHomeFeedsResponseSchema = GeneralResponseSchema(
  v.array(FeedListItemSchema)
);

export const GetTodayMyFeedResponseSchema = GeneralResponseSchema(
  v.object({ feed: v.array(TodayUploadedFeedSchema), postedToday: v.boolean() })
);
