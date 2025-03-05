"use client";

import Room, { Meeting } from "./components/Room";
import { useEffect, useState } from "react";

interface Room {
  id: number;
  name: string;
  meetings: Meeting[];
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5114/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
    console.log(rooms.length);
  }, []);

  return (
    <div>
    {rooms.map(room => (
    <Room
      roomId={room.id}
      roomName={room.name}
    />
    ))}</div>
  );
}
