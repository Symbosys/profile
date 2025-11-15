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



// Updated AdminLayout to accommodate responsive sidebar
import React from 'react';
import Sidebar from "../admin/Sidebar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 ml-0 md:ml-64 bg-gray-50 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;