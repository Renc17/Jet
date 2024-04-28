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

export const dish = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: String,
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
    unique: true,
  },
  dishes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Dish', required: true }],
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

export const order = new Schema({
  establishmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Establishment',
    required: true,
  },
  dishes: [
    {
      dishId: { type: Schema.Types.ObjectId, ref: 'Dish', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  price: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    county: { type: String, required: true },
    postalCode: { type: String, required: true },
    floor: { type: String, required: true },
  },
});

export const schemas = {
  Establishment: establishment,
  Dish: dish,
  Category: category,
  Menu: menu,
  Order: order,
};
