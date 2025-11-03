import React from "react";
import { FileSpreadsheet, LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold px-6 py-6">Profile Managing</h1>
        <nav className="mt-4">
          <div className="px-6 py-3 bg-[#1e293b] flex items-center rounded-r-full cursor-pointer">
            <FileSpreadsheet className="w-5 h-5 mr-3" />
            <span>Applications</span>
          </div>
        </nav>
      </div>
      <div className="px-6 py-4 flex items-center cursor-pointer hover:bg-[#1e293b]">
        <LogOut className="w-5 h-5 mr-3" />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
