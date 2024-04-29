'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const socket = io('http://localhost:3000');

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

export const ClientPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    console.log('fetch orders');
    // Listen for new order event from the server
    socket.on('order', data => {
      console.log('New order received in Next.js:', data);
      setOrders(prev => [...prev, data]); // TODO : trigger refetch populated order
    });

    return () => {
      // Clean up event listeners
      socket.off('newOrder');
    };
  }, []);

  return (
    <div>
      <h2>New Orders:</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            {order.address.street} - {order.address.county} -{' '}
            {order.address.floor} - {order.address.postalCode} *** {order.price}
            {order.dishes.map(dish => (
              <span key={dish.dishId}>
                {dish.quantity} - {dish.dishId}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};
