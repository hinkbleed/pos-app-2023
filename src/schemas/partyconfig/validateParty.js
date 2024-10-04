import { z } from 'zod';

const partySchema = z.object({
  party_name: z.string({
    required_error: 'party name is required'
  }),
  party_startDate: z.string({
    invalid_type_error: 'start date must be a valid date',
    required_error: 'start date is required'
  }),
  party_endDate: z.string({
    invalid_type_error: 'end date must be a valid date',
    required_error: 'en date is required'
  }),
  party_place: z.string({
    required_error: 'party place is required'
  }),
  party_street: z.string({
    required_error: 'party street is required'
  }),
  party_adressNumber: z.string({
    required_Error: 'party number is required'
  }),
  party_city: z.string({
    required_error: 'party city is required'
  }),
  party_postalCode: z.string({
    required_error: 'party postal code is required'
  })
});

export function validateParty (object) {
  return partySchema.safeParse(object);
}
