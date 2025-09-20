import * as v from 'valibot';

export const PresignedUrlSchema = v.object({
  objectKey: v.string(),
  presignedUrl: v.string(),
});

export type PresignedUrl = v.InferOutput<typeof PresignedUrlSchema>;
