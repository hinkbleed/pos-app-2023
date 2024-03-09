import z from 'zod';

const genreSchema = z.object({
  genreName: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'genre name is required'
  }),
  genreAbv: z.string({
    invalid_type_error: 'abv must be a string',
    required_error: 'genre abv is required'
  })
});

export function validateGenre (object) {
  return genreSchema.safeParse(object);
}
