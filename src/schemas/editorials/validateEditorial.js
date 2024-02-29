import z from 'zod';

const editorialSchema = z.object({
  editName: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'providor name is required'
  })
});

export function validateEditorial (object) {
  return editorialSchema.safeParse(object);
}
