import { MyProfileSchema } from '~/entities/profile';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

export const GetMyProfileResponseSchema =
  GeneralResponseSchema(MyProfileSchema);
