import { Schema } from 'mongoose';

// const operatingHours = new Schema({
//   opening: { type: String, require: true },
//   closing: { type: String, require: true },
// });

export const establishment = new Schema({
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
  vatId: { type: String, require: true },
  tin: { type: String, required: true },
  logo: { type: String, require: true },
  //   openingHours: [operatingHours],
  openingHours: [
    {
      opening: { type: String, require: true },
      closing: { type: String, require: true },
    },
  ],
});

export const menu = new Schema({
  establishment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Establishment',
    require: true,
  },
  tagline: String,
  status: {
    type: String,
    enum: ['draft', 'operating'],
    default: 'draft',
  },
  operatingStartDate: Date,
  operatingEndDate: Date,
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      require: true,
    },
  ],
});
menu.index({ operatingStartDate: 1, operatingEndDate: 1 }, { unique: true });

const dish = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  description: String,
});

export const category = new Schema({
  establishment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Establishment',
    require: true,
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
  dishes: [dish],
});

export const schemas = {
  Establishment: establishment,
  Category: category,
  Menu: menu,
};
