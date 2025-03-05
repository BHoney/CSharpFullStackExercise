'use client';

import { FC } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

interface EditMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  meeting: {
    id: string;
    roomId: number;
    name: string;
    description: string;
    startTime: string;
  };
}

const EditMeetingModal: FC<EditMeetingModalProps> = ({
  isOpen,
  onClose,
  onRefresh,
  meeting,
}) => {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await axios.put(`http://localhost:5114/public/meetings/${meeting.id}`, {
        roomId: meeting.roomId,
        name: formData.get('name'),
        description: formData.get('description'),
        startTime: formData.get('startTime'),
        endTime: formData.get('startTime')  // For now, setting end time same as start time
      });
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5114/public/meetings/${meeting.id}`);
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Edit Meeting</h2>
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
              Meeting Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={meeting.name}
              className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={meeting.description}
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
              defaultValue={format(new Date(meeting.startTime), "yyyy-MM-dd'T'HH:mm")}
              className="shadow appearance-none border dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete Meeting
            </button>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeetingModal;
