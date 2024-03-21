import { z } from 'zod';

const magSchema = z.object({
  magName: z.string({
    invalid_type_error: 'title must be a string',
    required_error: 'book title is required'
  }),
  magAuthor: z.string({
    invalid_type_error: 'author must be a string',
    required_error: 'book author is required'
  }),
  magYear: z.string({
    invalid_type_error: 'year must be a valid year',
    required_error: 'book year is required'
  }),
  magEditorialName: z.string({
    invalid_type_error: 'editorial name must be a string',
    required_error: 'book editorial name is required'
  }),
  magEditorialId: z.string({
    invalid_type_error: 'editorial id must be a string',
    required_error: 'book editorial id is required'
  }),
  magBarcode: z.string({
    invalid_type_error: 'barcode must be a valid barcode',
    required_error: 'book barcode is required'
  }),
  magPrice: z.number({
    invalid_type_error: 'price must be a number'
  }).int().positive(),
  magSubgenreName: z.string({
    invalid_type_error: 'subgenre name must be a string',
    required_error: 'book subgenre name is required'
  }),
  magSubgenreId: z.string({
    invalid_type_error: 'subgenre id must be a string',
    required_error: 'book subgenre id is required'
  }),
  magSubgenreAbv: z.string({
    invalid_type_error: 'subgenre abvreviation must be a string',
    required_error: 'book subgenre abreviation is required'
  })
});

export function validateMag (object) {
  return magSchema.safeParse(object);
}
