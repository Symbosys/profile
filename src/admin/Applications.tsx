
import React from "react";
import Sidebar from "../admin/Sidebar"
import ApplicationsTable from "../admin/ApplicationsTable"
import ApplicationDetails from "../admin/ApplicationDetails"
import { Routes, Route } from "react-router-dom";

const Applications: React.FC = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={<ApplicationsTable />}
          />
          <Route
            path=":id"
            element={<ApplicationDetails />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Applications;
