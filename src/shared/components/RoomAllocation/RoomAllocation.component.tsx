import React, { useRef, useState, useEffect } from 'react';
import Alert from '@/shared/components/Alert/Alert.component';
import CustomInputNumber from '@/shared/components/Custom/CustomInputNumber';
import { Props, Guest, Room, ResultRoom } from './RoomAllocation.types';
import * as S from './RoomAllocation.styles';

const RoomAllocation: React.FC<Props> = (props) => {
  const roomsInfoRef = useRef<Room[]>([]);
  const [roomsState, setRoomsState] = useState<ResultRoom[]>([]);

  useEffect(() => {
    const defaultRooms = getDefaultRoomAllocation(props.guest, props.rooms);
    setRoomsState(defaultRooms);
  }, [props.guest, props.rooms]);

  useEffect(() => {
    props.onChange(roomsState);
  }, [props, roomsState]);

  const getDefaultRoomAllocation = (guest: Guest, rooms: Room[]): ResultRoom[] => {
    rooms.sort((a, b) => {
      const allSumA = a.adultPrice + a.childPrice + a.roomPrice;
      const allSumB = b.adultPrice + b.childPrice + b.roomPrice;
      if (allSumA !== allSumB) {
        return allSumA - allSumB;
      }
      const adultChildSumA = a.adultPrice + a.childPrice;
      const adultChildSumB = b.adultPrice + b.childPrice;
      return adultChildSumA - adultChildSumB;
    });

    const defaultRooms: ResultRoom[] = [];
    let remainingAdult = guest.adult;
    let remainingChild = guest.child;

    for (const room of rooms) {
      const maxAdult = Math.min(room.capacity, remainingAdult);
      const maxChild = Math.min(room.capacity, remainingChild);
      const allocatedAdult = Math.min(maxAdult, room.capacity - maxChild);
      const allocatedChild = allocatedAdult === 0 && maxChild > 0 ? 0 : maxChild;
      const totalPrice = (allocatedAdult !== 0 || allocatedChild !== 0)
        ? room.roomPrice + (allocatedAdult * room.adultPrice) + (allocatedChild * room.childPrice)
        : 0;

      remainingAdult -= allocatedAdult;
      remainingChild -= allocatedChild;

      defaultRooms.push({
        adult: allocatedAdult,
        child: allocatedChild,
        price: totalPrice
      });
    }

    roomsInfoRef.current = rooms;
    return defaultRooms;
  };

  const getUnallocatedGuest = () => {
    const allocatedGuest = roomsState.reduce((acc, curr) => ({
      adult: acc.adult + curr.adult,
      child: acc.child + curr.child
    }), { adult: 0, child: 0 });
    const unallocatedGuest = {
      adult: props.guest.adult >= allocatedGuest.adult ? props.guest.adult - allocatedGuest.adult : 0,
      child: props.guest.child >= allocatedGuest.child ? props.guest.child - allocatedGuest.child : 0
    };
    return unallocatedGuest;
  };

  const getAdultFieldMax = (index: number) => {
    return props.guest.adult - roomsState.filter((_, i) => i !== index).reduce((acc, curr) => acc + curr.adult, 0);
  };

  const getChildFieldMax = (index: number) => {
    return props.guest.child - roomsState.filter((_, i) => i !== index).reduce((acc, curr) => acc + curr.child, 0);
  };

  const setTargetRoomAdult = (index: number, value: number) => {
    setRoomsState((prevState) => {
      const state = [...prevState];
      const targetRoomInfo = roomsInfoRef.current[index];
      const adult = value;
      const child = state[index].child;
      const price = (adult !== 0 || child !== 0)
        ? targetRoomInfo.roomPrice + (adult * targetRoomInfo.adultPrice) + (child * targetRoomInfo.childPrice)
        : 0;
      state[index] = { ...state[index], adult, price };
      return state;
    });
  };

  const setTargetRoomChild = (index: number, value: number) => {
    setRoomsState((prevState) => {
      const state = [...prevState];
      const targetRoomInfo = roomsInfoRef.current[index];
      const adult = state[index].adult;
      const child = value;
      const price = (adult !== 0 || child !== 0)
        ? targetRoomInfo.roomPrice + (adult * targetRoomInfo.adultPrice) + (child * targetRoomInfo.childPrice)
        : 0;
      state[index] = { ...state[index], adult, child, price };
      return state;
    });
  };

  const handleAdultFieldChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setTargetRoomAdult(index, +event.target.value);
  };

  const handleAdultFieldBlur = (event: React.FocusEvent<HTMLInputElement>, index: number) => {
    setTargetRoomAdult(index, +event.target.value);
  };

  const handleChildFieldChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setTargetRoomChild(index, +event.target.value);
  };

  const handleChildFieldBlur = (event: React.FocusEvent<HTMLInputElement>, index: number) => {
    setTargetRoomChild(index, +event.target.value);
  };

  return (
    <S.RoomAllocation>
      <S.RoomAllocation.Title>住客人數：{props.guest.adult} 位大人，{props.guest.child} 位小孩 / {props.rooms.length} 房</S.RoomAllocation.Title>
      <Alert>{`尚未分配人數：${getUnallocatedGuest().adult} 位大人，${getUnallocatedGuest().child} 位小孩`}</Alert>
      <S.RoomAllocation.Content>
        {roomsState.map((data, index) => (
          <S.RoomAllocation.Block key={index}>
            <S.RoomAllocation.BlockTitle>房間：{data.adult + data.child} 人</S.RoomAllocation.BlockTitle>
            <S.RoomAllocation.BlockContent>
              <S.RoomAllocation.BlockRow>
                <S.RoomAllocation.BlockText>
                  <span>大人</span>
                  <span>年齡 20+</span>
                </S.RoomAllocation.BlockText>
                <CustomInputNumber
                  name={`room.${index}.adult`}
                  max={getUnallocatedGuest().adult === 0 ? getAdultFieldMax(index) : undefined}
                  min={0}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleAdultFieldChange(event, index)}
                  onBlur={(event: React.FocusEvent<HTMLInputElement>) => handleAdultFieldBlur(event, index)}
                  value={data.adult}
                />
              </S.RoomAllocation.BlockRow>
              <S.RoomAllocation.BlockRow>
                <S.RoomAllocation.BlockText>
                  <span>小孩</span>
                </S.RoomAllocation.BlockText>
                <CustomInputNumber
                  name={`room.${index}.child`}
                  max={getUnallocatedGuest().child === 0 ? getChildFieldMax(index) : undefined}
                  min={0}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChildFieldChange(event, index)}
                  onBlur={(event: React.FocusEvent<HTMLInputElement>) => handleChildFieldBlur(event, index)}
                  value={data.child}
                />
              </S.RoomAllocation.BlockRow>
            </S.RoomAllocation.BlockContent>
          </S.RoomAllocation.Block>
        ))}
      </S.RoomAllocation.Content>
    </S.RoomAllocation>
  );
};

export default RoomAllocation;
