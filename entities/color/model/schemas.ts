import * as v from 'valibot';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

export const ColorSchema = v.object({
  displayName: v.string(),
  rgbHexCode: v.string(),
  shadowHexCode: v.string(),
});

export type Color = v.InferOutput<typeof ColorSchema>;

export const GetColorsResponseSchema = GeneralResponseSchema(
  v.array(ColorSchema)
);
