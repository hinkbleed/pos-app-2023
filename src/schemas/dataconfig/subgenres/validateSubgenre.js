import z from 'zod';

const subgenreSchema = z.object({
  subgenreName: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'subgenre name is required'
  }),
  subgenreAbv: z.string({
    invalid_type_error: 'abv must be a string',
    required_error: 'subgenre abv is required'
  })
});

export function validateSubgenre (object) {
  return subgenreSchema.safeParse(object);
}
