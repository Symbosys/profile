// import React from "react";
// import { FileSpreadsheet, LogOut } from "lucide-react";

// const Sidebar: React.FC = () => {
//   return (
//     <aside className="w-64 bg-[#0f172a] text-white flex flex-col justify-between">
//       <div>
//         <h1 className="text-2xl font-bold px-6 py-6">Admin Panel</h1>
//         <nav className="mt-4">
//           <div className="px-6 py-3 bg-[#1e293b] flex items-center rounded-r-full cursor-pointer">
//             <FileSpreadsheet className="w-5 h-5 mr-3" />
//             <span>Profile Managing</span>
//           </div>
//         </nav>
//       </div>
//       <div className="px-6 py-4 flex items-center cursor-pointer hover:bg-[#1e293b]">
//         <LogOut className="w-5 h-5 mr-3" />
//         <span>Logout</span>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import React from "react";
import { FileSpreadsheet, Users, Settings, FolderKanban, ClipboardList } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold px-6 py-6">Admin Panel</h1>

        <nav className="mt-4 space-y-2">
          {/* Profile Managing */}
          <div className="px-6 py-3 bg-[#1e293b] flex items-center rounded-r-full cursor-pointer">
            <FileSpreadsheet className="w-5 h-5 mr-3" />
            <span>Profile Managing</span>
          </div>

          {/* Manage Models */}
          <div className="px-6 py-3 hover:bg-[#1e293b] flex items-center cursor-pointer">
            <Users className="w-5 h-5 mr-3" />
            <span>Manage Models</span>
          </div>

          {/* Manage Admin */}
          <div className="px-6 py-3 hover:bg-[#1e293b] flex items-center cursor-pointer">
            <Users className="w-5 h-5 mr-3" />
            <span>Manage Admin</span>
          </div>

          {/* Manage Application */}
          <div className="px-6 py-3 hover:bg-[#1e293b] flex items-center cursor-pointer">
            <ClipboardList className="w-5 h-5 mr-3" />
            <span>Manage Application</span>
          </div>

          {/* Manage Booking */}
          <div className="px-6 py-3 hover:bg-[#1e293b] flex items-center cursor-pointer">
            <FolderKanban className="w-5 h-5 mr-3" />
            <span>Manage Booking</span>
          </div>

          {/* Setting */}
          <div className="px-6 py-3 hover:bg-[#1e293b] flex items-center cursor-pointer">
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </div>
        </nav>
      </div>

      {/* Logout */}
      {/* <div className="px-6 py-4 flex items-center cursor-pointer hover:bg-[#1e293b]">
        <LogOut className="w-5 h-5 mr-3" />
        <span>Logout</span>
      </div> */}
    </aside>
  );
};

export default Sidebar;
