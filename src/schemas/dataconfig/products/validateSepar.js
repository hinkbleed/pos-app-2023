import { z } from 'zod';

const separSchema = z.object({
  separName: z.string({
    invalid_type_error: 'name must be a string',
    required_error: 'separator name is required'
  }),
  separMaterial: z.string({
    invalid_type_error: 'material must be a string',
    required_error: 'separator material is required'
  }),
  separPrint: z.string({
    invalid_type_error: 'print must be a string',
    required_error: 'separator print is required'
  }),
  separDescription: z.string({
    invalid_type_error: 'description must be a string',
    required_error: 'separator description name is required'
  }),
  separPrice: z.number({
    invalid_type_error: 'price must be a number'
  }).positive(),
  separBarcode: z.string({
    invalid_type_error: 'barcode must be a valid barcode',
    required_error: 'separator barcode is required'
  })
});

export function validateSepar (object) {
  return separSchema.safeParse(object);
}

const partialSeparSchema = z.object({
  separPrice: z.number({
    invalid_type_error: 'price must be a number'
  }).positive(),
  separDescription: z.string({
    invalid_type_error: 'description must be a string',
    required_error: 'separator description is required'
  })
});

export function validatePartialSepar (object) {
  return partialSeparSchema.safeParse(object);
}
