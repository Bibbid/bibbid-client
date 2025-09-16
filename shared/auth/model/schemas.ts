import * as v from 'valibot';

export const authorizationSchema = v.object({
  isSignedIn: v.nullable(v.boolean()),
  accessToken: v.nullable(v.string()),
  refreshToken: v.nullable(v.string()),
});

export type Authorization = v.InferOutput<typeof authorizationSchema>;
