import z from 'zod';

const paymentSchema = z.object({
  pay_type: z.string({
    invalid_type_error: 'Payment type must be a string',
    required_error: 'Payment type is required'
  }),
  pay_amount: z.number({
    invalid_type_error: 'Amount must be a positive number',
    required_error: 'Amount is required'
  }),
  pay_concept: z.string({
    invalid_type_error: 'Payment concept must be a string',
    required_error: 'Payment concept is required'
  })
});

export function validateNewPaymentInfo (object) {
  return paymentSchema.safeParse(object);
}
