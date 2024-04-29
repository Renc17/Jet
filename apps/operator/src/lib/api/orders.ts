'use server';

import { axiosInstance } from './axios';

type Order = {
  _id: string;
  establishmentId: string;
  dishes: {
    dishId: string;
    quantity: number;
  }[];
  price: number;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    county: string;
    postalCode: string;
    floor: string;
  };
};

export const getOrders = async (establishmentId: string, orderId: string) => {
  type Response = Order[];
  return await axiosInstance
    .get<Response>(`/${establishmentId}/order/${orderId}`)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err.response.data.message);
    });
};
