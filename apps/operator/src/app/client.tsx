'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const socket = io(process.env.API_BASE_URL ?? 'http://localhost:3000');

type Order = {
  _id: string;
  establishmentId: string;
  dishes: {
    _id: string;
    dishId: {
      _id: string;
      name: string;
      price: number;
    };
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

export const ClientPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    socket.on('order', data => {
      setOrders(prev => [...prev, data]); // TODO : trigger refetch populated order
    });

    return () => {
      socket.off('newOrder');
    };
  }, []);

  return (
    <div>
      <h2>New Orders:</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <div className="flex flex-col">
              <h2>Adderss</h2>
              <div>
                {order.address.street} - {order.address.county} -{' '}
                {order.address.floor} - {order.address.postalCode}
              </div>
            </div>

            <h1>TOTAL : {order.price}</h1>

            <div className="flex flex-col">
              {order.dishes.map(dish => (
                <span key={dish._id}>
                  {dish.quantity} - {dish.dishId.name} *** {dish.dishId.price}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
