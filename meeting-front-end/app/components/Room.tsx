'use client';

import { FC, useEffect, useState } from 'react';
import { isToday, isThisWeek, parseISO } from 'date-fns';
import MeetingCard from './MeetingCard';
import axios from 'axios';

export interface Meeting {
  id: string;
  roomId: number;
  startTime: string;
  name: string;
  description: string;
}

interface RoomProps {
  roomId: number;
  roomName: string;
  onRefresh: () => void;
}

const Room: FC<RoomProps> = ({ roomId, roomName, onRefresh }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5114/public/rooms/${roomId}`);
        if (!response.data) {
          throw new Error('Failed to fetch meetings');
        }
        console.log('API Response:', response.data);
        // Make sure we're setting the meetings array correctly
        setMeetings(Array.isArray(response.data) ? response.data : response.data.meetings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [roomId]);

  const todayMeetings = meetings.filter(meeting => {
    try {
      return meeting.startTime && isToday(parseISO(meeting.startTime));
    } catch (err) {
      console.error('Error parsing date:', meeting.startTime, err);
      return false;
    }
  });

  const thisWeekMeetings = meetings.filter(meeting => {
    try {
      return meeting.startTime && !isToday(parseISO(meeting.startTime)) && isThisWeek(parseISO(meeting.startTime));
    } catch (err) {
      console.error('Error parsing date:', meeting.startTime, err);
      return false;
    }
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{roomName}</h1>
        <div className="animate-pulse">
          <div className="h-24 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{roomName}</h1>
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">{roomName}</h1>
      
      {/* Today's Meetings */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Today</h2>
        {todayMeetings.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No meetings scheduled for today</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayMeetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                roomId={meeting.roomId}
                startTime={parseISO(meeting.startTime)}
                meetingName={meeting.name}
                description={meeting.description}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        )}
      </section>

      {/* This Week's Meetings */}
      <section>
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">This Week</h2>
        {thisWeekMeetings.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No meetings scheduled for this week</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thisWeekMeetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                roomId={meeting.roomId}
                startTime={parseISO(meeting.startTime)}
                meetingName={meeting.name}
                description={meeting.description}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Room;
