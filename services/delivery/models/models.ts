import { Schema } from 'mongoose';

export const establishment = new Schema({
  operating: { type: Boolean, required: true, default: false },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['Restaurant', 'FastFood'],
    default: 'Restaurant',
  },
  landline: { type: String, required: true },
  mobile: { type: String, required: true },
  contactEmail: { type: String, required: true },
  representative: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    county: { type: String, required: true },
    postalCode: { type: String, required: true },
    googleMapsLink: { type: String, required: true },
  },
  vatId: { type: String, required: true },
  tin: { type: String, required: true },
  logo: { type: String, required: true },
  openingHours: [
    {
      opening: { type: String, required: true },
      closing: { type: String, required: true },
    },
  ],
});
establishment.index({ name: 1 }, { unique: true });

export const menu = new Schema({
  establishmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Establishment',
    required: true,
  },
  tagline: String,
  operatingPeriod: {
    startDate: Date,
    endDate: Date,
  },
  categories: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    validate: [
      (val: Array<{ _id: string }>) => val.length >= 3,
      'Menu must have at least 3 categories',
    ],
  },
});

export const category = new Schema({
  establishmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Establishment',
    required: true,
  },
  name: {
    type: String,
    enum: [
      'Starters',
      'Salads',
      'Pasta',
      'Meat',
      'Rizoto',
      'Fish',
      'Chicken',
      'Burger',
      'Soft Drinks',
      'Wines',
    ],
  },
  dishes: {
    type: [
      new Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: String,
      }),
    ],
    validate: [
      (
        val: Array<{
          name: string;
          price: number;
          description?: string;
        }>
      ) => val.length >= 2,
      'Category must have at least 2 dishes',
    ],
  },
});

export const schemas = {
  Establishment: establishment,
  Category: category,
  Menu: menu,
};
