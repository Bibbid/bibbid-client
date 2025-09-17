import * as v from 'valibot';
import { colorSchema } from '~/entities/color';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

export const GetColorsResponseSchema = GeneralResponseSchema(
  v.array(colorSchema)
);
