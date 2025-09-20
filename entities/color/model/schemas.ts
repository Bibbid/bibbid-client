import * as v from 'valibot';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

export const colorSchema = v.object({
  displayName: v.string(),
  rgbHexCode: v.string(),
  shadowHexCode: v.string(),
});

export type Color = v.InferOutput<typeof colorSchema>;

export const GetColorsResponseSchema = GeneralResponseSchema(
  v.array(colorSchema)
);
