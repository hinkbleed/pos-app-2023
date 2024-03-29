import z from 'zod';

const productSchema = z.object({
  name: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'product name is required'
  }),
  barcodes: z.array(
    z.number({
      invalid_type_error: 'barcode must be a number'
    }).int().positive().max(99999999999999)
  ),
  providor: z.string({
    invalid_type_error: 'providor must be a string',
    required_error: 'product providor must be selected'
  }),
  editorial: z.string({
    invalid_type_error: 'product editorial must be a string',
    required_error: 'product editorial is required'
  }),
  year: z.number({
    invalid_type_error: 'year must be a number'
  }).int().positive().max(2025),
  author1: z.string({
    invalid_type_error: 'author1 must be a string',
    required_error: 'author1 is required'
  }),
  kind: z.string({
    invalid_type_error: 'kind must be a string',
    required_error: 'product kind must be selected'
  }),
  price: z.number().positive().max(99999)
});

export function validateProduct (object) {
  return productSchema.safeParse(object);
}

export function validatePartialProduct (object) {
  return productSchema.partial().safeParse(object);
}
