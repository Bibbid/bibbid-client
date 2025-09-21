import * as v from 'valibot';
import { ColorSchema } from '~/entities/color';
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

export const UploadFeedImageResponseSchema = GeneralResponseSchema(
  v.object({
    compressedFileId: v.number(),
    originalFileId: v.number(),
  })
);

export type UploadFeedImageResponse = v.InferOutput<
  typeof UploadFeedImageResponseSchema
>;
