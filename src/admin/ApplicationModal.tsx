import React from "react";
import type { Application } from "../types/types"

interface Props {
  application: Application | null;
  onClose: () => void;
}

const ApplicationModal: React.FC<Props> = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
        <h3 className="text-xl font-semibold mb-4">Application Details</h3>
        <p><strong>Name:</strong> {application.name}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p className="mt-2 text-gray-600">{application.details}</p>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
