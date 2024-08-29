import z from 'zod';

const productSchema = z.object({
  fs_id: z.string({
    invalid_type_error: 'kind must be a string',
    required_error: 'product kind is required'
  }),
  party_id: z.string({
    invalid_type_error: 'party_id must be a string',
    required_error: 'party_id is required'
  }),
  amount: z.number({
    invalid_type_error: 'amount must be a number',
    required_error: 'amount is required'
  }).positive('amount must be a positive number').max(99999, 'amount must be less than or equal to 99999'),
  party_price: z.number({
    invalid_type_error: 'price must be a number'
  }).max(99999, 'price must be less than or equal to 99999')
});

export function validateMagazineToPartyInfo (object) {
  return productSchema.safeParse(object);
}

const productPartialSchema = z.object({
  fs_id: z.string({
    invalid_type_error: 'kind must be a string',
    required_error: 'product kind is required'
  }),
  party_id: z.string({
    invalid_type_error: 'party_id must be a string',
    required_error: 'party_id is required'
  }),
  amount: z.number({
    invalid_type_error: 'amount must be a number'
  }).max(99999, 'amount must be less than or equal to 99999'),
  party_price: z.number({
    invalid_type_error: 'price must be a number'
  }).max(99999, 'price must be less than or equal to 99999')
});

export function validateMagazineToPartyPartialInfo (object) {
  return productPartialSchema.safeParse(object);
}
