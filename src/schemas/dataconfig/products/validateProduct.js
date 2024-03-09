import z from 'zod';

const providorSchema = z.object({
  provName: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'providor name is required'
  }),
  provResp: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'providor responsible is required'
  }),
  provNumber: z.string({
    invalid_type_error: 'providor number must be a string'
  })
});

export function validateProvidor (object) {
  return providorSchema.safeParse(object);
}
