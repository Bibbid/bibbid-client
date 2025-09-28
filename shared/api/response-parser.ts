import { failure, success } from './create-result';
import { ErrorResponse, ErrorResponseSchema } from './response-schemas';
import { Result } from './result-type';
import { getLogger } from '@logtape/logtape';
import * as v from 'valibot';

const logger = getLogger('bibbid');

export const parseResponse: <T extends v.GenericSchema>(
  json: unknown,
  schema: T
) => Result<v.InferOutput<T>, ErrorResponse> = (json, schema) => {
  logger.debug({ json });

  const parsed = v.safeParse(schema, json);

  logger.info({ parsed });

  if (!parsed.success) {
    const error = v.safeParse(ErrorResponseSchema, json);

    if (!error.success) {
      logger.error({ error });

      return failure({
        code: '500',
        message: 'SafeParseError',
      });
    }

    return failure({ ...error.output });
  }

  return success(parsed.output);
};
