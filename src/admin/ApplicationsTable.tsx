import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Download, Trash2 } from "lucide-react";
import type { Application } from "../types/types";
import api from "../api/api";

const stepsList = [
  "Profile Verification",
  "Card Verification Charge",
  "HotelBooking",
  "Medical Kit Charge",
  "Police Verification Change",
  "NOC Charge",
  "Location Verification Charge (Area)",
  "Secretary Safety Charge",
  "Joining Form Charge",
  "Enquiry Verification Charge",
  "Income GST Charge",
];

const ApplicationsTable: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const LIMIT = 10;

  const fetchApplications = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/profile?page=${page}&limit=${LIMIT}`);

      if (response.data?.data?.profiles) {
        const apps = response.data.data.profiles.map((profile: any) => ({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          created: new Date(profile.createdAt || Date.now()).toLocaleString(),
          status:
            profile.carVefificationStatus ||
            profile.medicalKitStatus ||
            profile.policeVerificationStatus ||
            "Pending",
          currentStep: profile.currentStep,
          currentStepName: stepsList[profile.currentStep] || `Step ${profile.currentStep}`,
        }));

        setApplications(apps);
        // Update pagination details from response
        const { totalPages: total, currentPage: current } = response.data.data;
        setTotalPages(total || 1);
        setCurrentPage(current || 1);
      } else {
        setApplications([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
      setError(null);
    } catch (err: any) {
      console.error("Error fetching applications:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const navigate = useNavigate();
  const handleView = (app: Application) => {
    navigate(`/${app.id}`);
  };

  const handleDownload = async (app: Application) => {
    try {
      const response = await api.get(`/profile/${app.id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${app.name}_details.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading application:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    try {
      await api.delete(`/profile/${id}`);
      setApplications((prev) => prev.filter((app) => app.id !== id));
      alert("Profile deleted successfully");
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">All Applications</h2>

      {loading ? (
        <p className="text-gray-500">Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        /* Added responsive wrapper here */
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse whitespace-nowrap">
            <thead>
              <tr className="text-left bg-gray-100 border-b">
                <th className="p-4 font-medium text-gray-600">Name</th>
                <th className="p-4 font-medium text-gray-600">Email</th>
                <th className="p-4 font-medium text-gray-600">Created</th>
                <th className="p-4 font-medium text-gray-600">Status</th>
                <th className="p-4 font-bold text-blue-600">Current Step</th>
                <th className="p-4 font-medium text-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">{app.name}</td>
                    <td className="p-4">{app.email}</td>
                    <td className="p-4">{app.created}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${app.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-blue-700">{app.currentStep + 1}. {app.currentStepName}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${((app.currentStep + 1) / 11) * 100}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 flex justify-center gap-3">
                      <button
                        onClick={() => handleView(app)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDownload(app)}
                        className="text-green-600 hover:text-green-800"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {applications.length > 0 && !loading && !error && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTable;