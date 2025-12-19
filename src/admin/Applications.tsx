import React, { useState } from "react";
import Sidebar from "../admin/Sidebar";
import ApplicationsTable from "../admin/ApplicationsTable";
import ApplicationDetails from "../admin/ApplicationDetails";
import { Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react"; // Import Menu icon

const Applications: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Pass state and close function to Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header with Hamburger Menu */}
        <div className="md:hidden bg-white border-b p-4 flex items-center">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-md"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <span className="ml-3 font-semibold text-gray-800">Admin Panel</span>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<ApplicationsTable />} />
            <Route path=":id" element={<ApplicationDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Applications;