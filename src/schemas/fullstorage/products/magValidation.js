import z from 'zod';

const productSchema = z.object({
  magfs_amount: z.number({
    invalid_type_error: 'amount must be a number',
    required_error: 'amount is required'
  }).positive('amount must be a positive number').max(99999, 'amount must be less than or equal to 99999'),
  magfs_price: z.number({
    invalid_type_error: 'price must be a number'
  }).max(99999, 'price must be less than or equal to 99999'),
  mag_id: z.string({
    invalid_type_error: 'mag_id must be a string',
    required_error: 'mag_id is required'
  })
});

export function validateNewMagInfo (object) {
  return productSchema.safeParse(object);
}
