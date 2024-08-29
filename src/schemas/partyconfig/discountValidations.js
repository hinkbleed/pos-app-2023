import z from 'zod';

const productSchema = z.object({
  discount_amount: z.number({
    invalid_type_error: 'amount must be a number',
    required_error: 'amount is required'
  }).positive('amount must be a positive number').max(99999, 'amount must be less than or equal to 99999'),
  discount_kind: z.string({
    invalid_type_error: 'discount_kind must be a string',
    required_error: 'discount_kind is required'
  })
});

export function validateDiscountInfo (object) {
  return productSchema.safeParse(object);
}

const productPartialSchema = z.object({
  discount_amount: z.number({
    invalid_type_error: 'amount must be a number'
  }).max(99999, 'amount must be less than or equal to 99999'),
  discount_kind: z.string({
    invalid_type_error: 'discount_kind must be a string'
  })
});

export function validateDiscountPartialInfo (object) {
  return productPartialSchema.safeParse(object);
}
