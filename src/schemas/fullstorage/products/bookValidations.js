import z from 'zod';

const productSchema = z.object({
  bookfs_kind: z.string({
    invalid_type_error: 'kind must be a string',
    required_error: 'product kind is required'
  }),
  bookfs_amount: z.number({
    invalid_type_error: 'amount must be a number',
    required_error: 'amount is required'
  }).positive('amount must be a positive number').max(99999, 'amount must be less than or equal to 99999'),
  bookfs_price: z.number({
    invalid_type_error: 'price must be a number'
  }).max(99999, 'price must be less than or equal to 99999'),
  book_id: z.string({
    invalid_type_error: 'book_id must be a string',
    required_error: 'book_id is required'
  })
});

export function validateNewBookInfo (object) {
  return productSchema.safeParse(object);
}
