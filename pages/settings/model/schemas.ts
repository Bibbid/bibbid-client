import * as v from 'valibot';

export const ChangeNameRequestSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1, 'Please enter a username'),
    v.maxLength(20, 'Username must be 20 characters or less'),
    v.regex(
      /^[a-zA-Z0-9._]+$/,
      'Only alphanumeric characters, underscores, and periods are allowed'
    ),
    v.check((input) => input.trim() !== '', 'Cannot enter only spaces'),
    v.check(
      (input) =>
        !/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
          input
        ),
      'Emojis are not allowed'
    )
  ),
});

export type ChangeNameRequest = v.InferOutput<typeof ChangeNameRequestSchema>;
