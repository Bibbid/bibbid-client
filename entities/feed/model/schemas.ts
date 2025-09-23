import * as v from 'valibot';
import { ColorSchema } from '~/entities/color';
import { PresignedUrlSchema } from '~/shared/model';

export const UploaderInfoSchema = v.object({
  buddyCharacter: v.string(),
  buddyColor: v.string(),
  buddyImage: PresignedUrlSchema,
  buddyName: v.string(),
  introduction: v.nullable(v.string()),
  profileImageUrl: v.nullable(v.string()),
  userUuid: v.string(),
});

export type UploaderInfo = v.InferOutput<typeof UploaderInfoSchema>;

export const FeedDetailSchema = v.object({
  color: ColorSchema,
  comment: v.string(),
  createdAt: v.string(),
  feedId: v.number(),
  image: PresignedUrlSchema,
  uploader: UploaderInfoSchema,
});

export type FeedDetail = v.InferOutput<typeof FeedDetailSchema>;

export const TodayUploadedFeedSchema = v.object({
  feedId: v.number(),
  color: ColorSchema,
  image: PresignedUrlSchema,
  comment: v.string(),
  createdAt: v.string(),
});

export type TodayUploadedFeed = v.InferOutput<typeof TodayUploadedFeedSchema>;

export const MyFeedListItemSchema = v.object({
  feedId: v.number(),
  image: PresignedUrlSchema,
  color: ColorSchema,
  uploader: UploaderInfoSchema,
  createdAt: v.string(),
});

export type MyFeedListItem = v.InferOutput<typeof MyFeedListItemSchema>;

export const FeedListItemSchema = v.object({
  ...MyFeedListItemSchema.entries,
  isMine: v.boolean(),
});

export type FeedListItem = v.InferOutput<typeof FeedListItemSchema>;
