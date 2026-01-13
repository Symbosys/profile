import { CreditCard, FileSpreadsheet, QrCode, X } from "lucide-react"; // Added specific icons
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Get current route

  // Navigation helper
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  // Define menu items configuration
  const menuItems = [
    {
      name: "Profile Managing",
      path: "/applications",
      icon: FileSpreadsheet,
    },
    {
      name: "Manage Qr",
      path: "/qr",
      icon: QrCode, // Changed to QrCode icon for better UX (optional)
    },
    {
      name: "Manage Payment Fee",
      path: "/manage-payment-fee",
      icon: CreditCard, // Changed to CreditCard icon for better UX (optional)
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-[#0f172a] text-white flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div>
          <div className="flex items-center justify-between px-6 py-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-[#1e293b] rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-4 space-y-2">
            {menuItems.map((item) => {
              // Check if the current URL starts with the item path (handles nested routes like /applications/1)
              const isActive = location.pathname.startsWith(item.path);

              return (
                <div
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    px-6 py-3 flex items-center cursor-pointer transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#1e293b] text-white border-l-4 border-blue-500" // Active Style
                        : "hover:bg-[#1e293b]/50 text-gray-400 hover:text-white border-l-4 border-transparent" // Inactive Style
                    }
                  `}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "text-blue-400" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;