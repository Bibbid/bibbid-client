import * as v from 'valibot';

export const GeneralResponseSchema = <T extends v.GenericSchema>(schema: T) =>
  v.object({
    data: schema,
  });

export const VoidResponseSchema = GeneralResponseSchema(
  v.union([v.null(), v.undefined()])
);

export const CursorResponseSchema = <T extends v.GenericSchema>(schema: T) =>
  v.object({
    data: v.object({
      data: v.array(schema),
      cursorInfo: v.object({
        nextCursor: v.nullable(v.number()),
        hasNext: v.boolean(),
      }),
    }),
  });

export type VoidResponse = v.InferOutput<typeof VoidResponseSchema>;

export const ErrorResponseSchema = v.object({
  code: v.string(),
  message: v.string(),
});

export type ErrorResponse = v.InferOutput<typeof ErrorResponseSchema>;
