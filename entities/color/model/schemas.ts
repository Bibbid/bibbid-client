import * as v from 'valibot';

export const colorSchema = v.object({
  displayName: v.string(),
  rgb: v.string(),
});

export type Color = v.InferOutput<typeof colorSchema>;
