import z from 'zod';

const productSchema = z.object({
  id: z.string({
    invalid_type_error: 'Product ID must be a string',
    required_error: 'Product ID is required'
  }),
  barcode: z.string({
    invalid_type_error: 'Barcode must be a string',
    required_error: 'Barcode is required'
  }),
  type: z.string({
    invalid_type_error: 'Product type must be a string',
    required_error: 'Product type is required'
  }),
  name: z.string({
    invalid_type_error: 'Product name must be a string',
    required_error: 'Product name is required'
  }),
  productInfo: z.string({
    invalid_type_error: 'Product info must be a string',
    required_error: 'Product Info is required'
  }),
  price: z.number({
    required_error: 'Price is required'
  }),
  amount: z.number().positive({
    invalid_type_error: 'Amount must be a positive number',
    required_error: 'Amount is required'
  }),
  subtotal: z.number().positive({
    invalid_type_error: 'Subtotal must be a positive number',
    required_error: 'Subtotal is required'
  }),
  discount: z.number().min(0, {
    invalid_type_error: 'Discount must be a number and cannot be negative'
  })
});

const paymentSchema = z.object({
  total: z.number().min(0, {
    invalid_type_error: 'Total amount must be a number and cannot be negative',
    required_error: 'Total amount is required'
  }),
  card: z.number().min(0, {
    invalid_type_error: 'Card amount must be a number and cannot be negative',
    required_error: 'Card amount is required'
  }),
  transfer: z.number().min(0, {
    invalid_type_error: 'transfer amount must be a number and cannot be negative',
    required_error: 'Transfer amount is required'
  }),
  cash: z.number().min(0, {
    invalid_type_error: 'Cash amount must be a number and cannot be negative',
    required_error: 'Cash amount is required'
  })
});

const ticketSchema = z.object({
  products: z.array(productSchema).nonempty({ message: 'At least one product is required' }),
  payment: paymentSchema
});

export function validateNewTicketInfo (object) {
  return ticketSchema.safeParse(object);
}
