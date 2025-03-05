'use client';

import { FC, useEffect, useState } from 'react';
import { isToday, isThisWeek, parseISO } from 'date-fns';
import MeetingCard from './MeetingCard';

export interface Meeting {
  id: string;
  dateTime: string;
  name: string;
  description: string;
}

interface RoomProps {
  roomId: number;
  roomName: string;
}

const Room: FC<RoomProps> = ({ roomId, roomName }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5114/api/rooms/${roomId}/meetings`);
        if (!response.ok) {
          throw new Error('Failed to fetch meetings');
        }
        const data = await response.json();
        setMeetings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [roomId]);

  const todayMeetings = meetings.filter(meeting => 
    isToday(parseISO(meeting.dateTime))
  );

  const thisWeekMeetings = meetings.filter(meeting => 
    !isToday(parseISO(meeting.dateTime)) && isThisWeek(parseISO(meeting.dateTime))
  );

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
      <h1 className="text-2xl font-bold mb-6">{roomName}</h1>
      
      {/* Today's Meetings */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Today</h2>
        {todayMeetings.length === 0 ? (
          <p className="text-gray-500">No meetings scheduled for today</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayMeetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                dateTime={parseISO(meeting.dateTime)}
                meetingName={meeting.name}
                description={meeting.description}
              />
            ))}
          </div>
        )}
      </section>

      {/* This Week's Meetings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">This Week</h2>
        {thisWeekMeetings.length === 0 ? (
          <p className="text-gray-500">No meetings scheduled for this week</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thisWeekMeetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                dateTime={parseISO(meeting.dateTime)}
                meetingName={meeting.name}
                description={meeting.description}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Room;
