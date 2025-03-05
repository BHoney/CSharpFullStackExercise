"use client";

import axios from "axios";
import Room, { Meeting } from "./components/Room";
import ThemeToggle from './components/ThemeToggle';
import { useEffect, useState, useCallback } from "react";
import CreateMeetingSidebar from "./components/CreateMeetingSidebar";

interface Room {
  id: number;
  name: string;
  meetings: Meeting[];
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5114/public/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Create Meeting
        </button>
        <ThemeToggle />
      </div>

      <CreateMeetingSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onRefresh={fetchRooms}
        rooms={rooms}
      />

      <div className="grid gap-6">
        {rooms.map(room => (
          <Room
            key={room.id}
            roomId={room.id}
            roomName={room.name}
            onRefresh={fetchRooms}
          />
        ))}
      </div>
    </div>
  );
}
