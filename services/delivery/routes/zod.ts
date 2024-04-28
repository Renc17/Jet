import * as z from 'zod';

export const EstablishmentSchema = z.object({
  name: z.string().min(1, 'Required'),
  type: z.string().optional(),
  landline: z.string().min(1, 'Required'),
  mobile: z.string().min(1, 'Required'),
  contactEmail: z.string().min(1, 'Required'),
  representative: z.string().min(1, 'Required'),
  address: z.object({
    street: z.string().min(1, 'Required'),
    county: z.string().min(1, 'Required'),
    postalCode: z.string().min(1, 'Required'),
    googleMapsLink: z.string().min(1, 'Required'),
  }),
  vatId: z.string().min(1, 'Required'),
  tin: z.string().min(1, 'Required'),
  logo: z.string().min(1, 'Required'),
  operatingHours: z
    .array(
      z.object({
        opening: z.string().min(1, 'Required'),
        closing: z.string().min(1, 'Required'),
      })
    )
    .optional(),
});

export const CategorySchema = z.object({
  name: z.string().min(1, 'Required'),
  dishes: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      description: z.string().optional(),
    })
  ),
});

export const MenuSchema = z.object({
  tagline: z.string().optional(),
  operatingStartDate: z.string().datetime().optional(),
  operatingEndDate: z.string().datetime().optional(),
  categories: z.array(z.string()),
});

export const OrderSchema = z.object({
  dishes: z.array(
    z.object({
      dishId: z.string(),
      quantity: z.number(),
    })
  ),
  currency: z.string(), // TODO: enum
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.object({
    street: z.string().min(1, 'Required'),
    county: z.string().min(1, 'Required'),
    postalCode: z.string().min(1, 'Required'),
    floor: z.string().min(1, 'Required'),
  }),
});
