import z from 'zod';

const employeeSchema = z.object({
  employName: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'employee name is required'
  }),
  employLastname: z.string({
    invalid_type_error: 'lastname must be a string',
    required_error: 'employee lastname is required'
  }),
  employNumber: z.string({
    invalid_type_error: 'employee number must be a string'
  }),
  employAlias: z.string({
    invalid_type_error: 'alias must be a string'
  })
});

export function validateEmployee (object) {
  return employeeSchema.safeParse(object);
}
