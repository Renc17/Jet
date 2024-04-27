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
  establishment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Establishment',
    required: true,
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
      required: true,
    },
  ],
});
menu.index({ operatingStartDate: 1, operatingEndDate: 1 }, { unique: true });

interface Category {
  establishmentId: Schema.Types.ObjectId;
  name: string;
  dishes: {
    name: string;
    price: number;
    description?: string;
  }[];
}

export const category = new Schema<Category>({
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
      ) => val.length >= 3,
      'Category must have at least 3 dishes',
    ],
  },
});

export const schemas = {
  Establishment: establishment,
  Category: category,
  Menu: menu,
};
