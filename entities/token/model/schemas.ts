import * as v from 'valibot';
import { GeneralResponseSchema } from '~/shared/api/response-schemas';

export const TokenSchema = v.object({
  tokenCount: v.number(),
});

export type Token = v.InferOutput<typeof TokenSchema>;

export const GetMyTokensResponseSchema = GeneralResponseSchema(TokenSchema);
