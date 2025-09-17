import { failure, success } from './create-result';
import { ErrorResponse, ErrorResponseSchema } from './response-schemas';
import { Result } from './result-type';
import * as v from 'valibot';

export const parseResponse: <T extends v.GenericSchema>(
  json: unknown,
  schema: T
) => Result<v.InferOutput<T>, ErrorResponse> = (json, schema) => {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    console.log('--- JSON ---');
    console.log(json);
    console.log('------------');
  }

  const parsed = v.safeParse(schema, json);

  console.log('[INFO] safe parse result ', parsed);

  if (!parsed.success) {
    const error = v.safeParse(ErrorResponseSchema, json);

    if (!error.success) {
      if (isDev) {
        console.log('--- PARSE ERROR ---');
        console.log(error);
        console.log('------------');
      }

      return failure({
        code: '500',
        message: 'SafeParseError',
      });
    }

    return failure({ ...error.output });
  }

  return success(parsed.output);
};
