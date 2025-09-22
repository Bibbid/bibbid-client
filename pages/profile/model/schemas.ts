import * as v from 'valibot';
import { MyProfileSchema } from '~/entities/profile';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';
import { PresignedUrlSchema } from '~/shared/model';

export const GetMyProfileResponseSchema =
  GeneralResponseSchema(MyProfileSchema);

export const UpdateBuddyFormSchema = v.object({
  buddyName: v.pipe(
    v.string(),
    v.minLength(1, 'Please enter a buddy name'),
    v.maxLength(20, 'Buddy name must be 20 characters or less'),
    v.check((input) => input.trim() !== '', 'Cannot enter only spaces'),
    v.check(
      (input) =>
        !/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
          input
        ),
      'Emojis are not allowed'
    )
  ),
  buddyColor: v.string(),
});

export type UpdateBuddyForm = v.InferOutput<typeof UpdateBuddyFormSchema>;

export const GetBuddyImageResponseSchema =
  GeneralResponseSchema(PresignedUrlSchema);
