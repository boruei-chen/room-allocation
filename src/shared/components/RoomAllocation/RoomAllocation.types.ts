export interface Props {
  guest: Guest;
  rooms: Room[];
  onChange: (result: ResultRoom[]) => void;
}

export interface Guest {
  adult: number;
  child: number;
}

export interface Room {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
}

export interface ResultRoom {
  adult: number;
  child: number;
  price: number;
}
