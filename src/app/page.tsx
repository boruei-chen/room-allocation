'use client';
import React from 'react';
import RoomAllocation from '@/shared/components/RoomAllocation';
import { ResultRoom } from '@/shared/components/RoomAllocation/RoomAllocation.types';
import { Props } from './types';

const Page: React.FC<Props> = () => {
  const guest = { adult: 4, child: 2 };
  const rooms = [
    { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 }
  ];

  const handleChange = (result: ResultRoom[]) => {
    console.log(result);
  };

  return (
    <RoomAllocation
      guest={guest}
      rooms={rooms}
      onChange={handleChange}
    />
  );
};

export default Page;
