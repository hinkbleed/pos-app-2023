import { z } from 'zod';

const bookSchema = z.object({
  bookName: z.string({
    invalid_type_error: 'title must be a string',
    required_error: 'book title is required'
  }),
  bookAuthor: z.string({
    invalid_type_error: 'author must be a string',
    required_error: 'book author is required'
  }),
  bookYear: z.string({
    invalid_type_error: 'year must be a valid year',
    required_error: 'book year is required'
  }),
  bookEditorialName: z.string({
    invalid_type_error: 'editorial name must be a string',
    required_error: 'book editorial name is required'
  }),
  bookEditorialId: z.string({
    invalid_type_error: 'editorial id must be a string',
    required_error: 'book editorial id is required'
  }),
  bookBarcode: z.string({
    invalid_type_error: 'barcode must be a valid barcode',
    required_error: 'book barcode is required'
  }),
  bookPrice: z.number({
    invalid_type_error: 'price must be a number'
  }).int().positive(),
  bookGenreName: z.string({
    invalid_type_error: 'genre name must be a string',
    required_error: 'book genre name is required'
  }),
  bookGenreId: z.string({
    invalid_type_error: 'genre id must be a string',
    required_error: 'book genre id is required'
  }),
  bookGenreAbv: z.string({
    invalid_type_error: 'genre abvreviation must be a string',
    required_error: 'book genre abreviation is required'
  }),
  bookSubgenreName: z.string({
    invalid_type_error: 'subgenre name must be a string',
    required_error: 'book subgenre name is required'
  }),
  bookSubgenreId: z.string({
    invalid_type_error: 'subgenre id must be a string',
    required_error: 'book subgenre id is required'
  }),
  bookSubgenreAbv: z.string({
    invalid_type_error: 'subgenre abvreviation must be a string',
    required_error: 'book subgenre abreviation is required'
  })
});

export function validateBook (object) {
  return bookSchema.safeParse(object);
}
