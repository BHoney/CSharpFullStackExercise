'use client';

import { FC } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

interface Room {
  id: number;
  name: string;
}

interface CreateMeetingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  rooms: Room[];
}

const CreateMeetingSidebar: FC<CreateMeetingSidebarProps> = ({
  isOpen,
  onClose,
  onRefresh,
  rooms,
}) => {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await axios.post(`http://localhost:5114/public/meetings`, {
        roomId: parseInt(formData.get('roomId') as string),
        name: formData.get('name'),
        description: formData.get('description'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime')
      });
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const defaultStartTime = format(new Date(), "yyyy-MM-dd'T'HH:mm");
  const defaultEndTime = format(new Date(new Date().getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm");

  return (
    <>
      <div className={`fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-white">Create New Meeting</h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                Select Room
              </label>
              <select
                name="roomId"
                required
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a room...</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                Meeting Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter meeting name"
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter meeting description"
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                Start Time
              </label>
              <input
                name="startTime"
                type="datetime-local"
                required
                defaultValue={defaultStartTime}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                End Time
              </label>
              <input
                name="endTime"
                type="datetime-local"
                required
                defaultValue={defaultEndTime}
                className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Create Meeting
              </button>
            </div>
          </form>
        </div>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default CreateMeetingSidebar;
