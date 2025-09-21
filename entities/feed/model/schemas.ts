import * as v from 'valibot';
import { ColorSchema } from '~/entities/color';
import { PresignedUrlSchema } from '~/shared/model';

export const UploaderInfoSchema = v.object({
  userUuid: v.string(),
  buddyName: v.string(),
  buddyColor: v.nullable(v.string()),
  buddyCharacter: v.nullable(v.string()),
  profileImageUrl: v.nullable(v.string()),
  buddyImage: v.nullable(PresignedUrlSchema),
  introduction: v.nullable(v.string()),
});

export type UploaderInfo = v.InferOutput<typeof UploaderInfoSchema>;

export const FeedDetailSchema = v.object({
  feedId: v.number(),
  comment: v.string(),
  image: PresignedUrlSchema,
  color: ColorSchema,
  uploader: UploaderInfoSchema,
  createdAt: v.string(),
});

export type FeedDetail = v.InferOutput<typeof FeedDetailSchema>;
