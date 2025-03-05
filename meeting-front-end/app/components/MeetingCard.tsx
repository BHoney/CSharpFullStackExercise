'use client';

import { FC } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

interface MeetingCardProps {
  dateTime: Date;
  meetingName: string;
  description: string;
}

const MeetingCard: FC<MeetingCardProps> = ({
  dateTime,
  meetingName,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
          {/* Placeholder avatar - replace with actual user image */}
          <Image
            src="/placeholder-avatar.png"
            alt="User avatar"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{meetingName}</h3>
          <p className="text-sm text-gray-500">
            {format(dateTime, 'MMM d, yyyy • h:mm a')}
          </p>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm line-clamp-3 mb-4">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {/* Placeholder attendees - replace with actual attendee data */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 relative"
            >
              <Image
                src="/placeholder-avatar.png"
                alt={`Attendee ${i + 1}`}
                fill
                className="object-cover rounded-full"
              />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
            +2
          </div>
        </div>
        
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
          Join
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
