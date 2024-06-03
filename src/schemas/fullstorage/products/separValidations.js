import z from 'zod';

const productSchema = z.object({
  separfs_amount: z.number({
    invalid_type_error: 'amount must be a number',
    required_error: 'amount is required'
  }).positive('amount must be a positive number').max(99999, 'amount must be less than or equal to 99999'),
  separfs_price: z.number({
    invalid_type_error: 'price must be a number',
    required_error: 'price is required'
  }).positive('price must be a positive number').max(99999, 'price must be less than or equal to 99999'),
  separ_id: z.string({
    invalid_type_error: 'separ_id must be a string',
    required_error: 'separ_id is required'
  })
});

export function validateNewSeparInfo (object) {
  return productSchema.safeParse(object);
}
