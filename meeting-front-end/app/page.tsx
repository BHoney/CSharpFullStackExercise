"use client";

import axios from "axios";
import Room, { Meeting } from "./components/Room";
import ThemeToggle from './components/ThemeToggle';
import { useEffect, useState, useCallback } from "react";

interface Room {
  id: number;
  name: string;
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await axios.get<Room[]>('http://localhost:5114/public/rooms');
      console.log('API Response:', response.data);
      setRooms(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <div>
      <ThemeToggle />
      {rooms.map(room => (
        <Room
          key={room.id}
          roomId={room.id}
          roomName={room.name}
          onRefresh={fetchRooms}
        />
      ))}
    </div> 
  );
}
