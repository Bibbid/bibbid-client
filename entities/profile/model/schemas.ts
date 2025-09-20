import * as v from 'valibot';
import { PresignedUrlSchema } from '~/shared/model';

export const ColorFeedSchema = v.object({
  color: v.string(),
  feedCount: v.number(),
  latestComment: v.string(),
});

export const MyProfileSchema = v.object({
  userId: v.number(),
  userUuid: v.string(),
  name: v.string(),
  buddyName: v.string(),
  buddyColor: v.nullable(v.string()),
  buddyCharacter: v.nullable(v.string()),
  profileImageUrl: v.nullable(v.string()),
  buddyImage: v.nullable(PresignedUrlSchema),
  collectedColorCount: v.number(),
  colorFeeds: v.array(ColorFeedSchema),
});

export type MyProfile = v.InferOutput<typeof MyProfileSchema>;
