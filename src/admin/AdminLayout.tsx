// import ManagePaymentFee from "../admin/ManagePaymentFee";
// import Sidebar from "../admin/Sidebar";
// import { Outlet } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 bg-gray-100 min-h-screen p-6">
//         <Outlet />  {/* Page content loads here */}
//         <ManagePaymentFee/>
//       </div>

//     </div>
//   );
// };

// export default AdminLayout;



import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Ensure this path points to your Sidebar component
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 1. Sidebar Component 
        We pass the open state and close handler so the sidebar 
        knows when to slide in/out on mobile.
      */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* 2. Main Content Wrapper 
        This div takes the remaining width.
      */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden bg-white border-b p-4 flex items-center shadow-sm z-10 sticky top-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
            aria-label="Open Sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-3 font-semibold text-gray-800">Admin Panel</span>
        </div>

        {/* 3. Page Content 
          This is where QRCodeManager (or any other page) gets rendered.
          overflow-auto ensures only this part scrolls, keeping the sidebar fixed.
        */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;