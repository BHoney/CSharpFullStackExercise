'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import EditMeetingModal from './EditMeetingModal';

interface MeetingCardProps {
  id: string;
  roomId: number;
  startTime: Date;
  meetingName: string;
  description: string;
  onRefresh: () => void;
}

const MeetingCard: FC<MeetingCardProps> = ({
  id,
  roomId,
  startTime,
  meetingName,
  description,
  onRefresh,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-sm hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
            {/* Placeholder avatar - replace with actual user image */}
            <Image
              src={`https://avatar.iran.liara.run/public/?username=${meetingName}`}
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{meetingName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(startTime, 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {/* Placeholder attendees - replace with actual attendee data */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 relative"
              >
                <Image
                  src={`https://avatar.iran.liara.run/public/?username=${i}`}
                  alt={`Attendee ${i + 1}`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
              +2
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Edit
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <EditMeetingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        meeting={{
          id,
          roomId,
          name: meetingName,
          description,
          startTime: startTime.toISOString(),
        }}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default MeetingCard;
