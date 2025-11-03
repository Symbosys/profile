
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Download, Trash2 } from "lucide-react";
import apiClient from "../api/apiClient"; // 👈 your configured axios instance
import type { Application } from "../types/types"

const ApplicationsTable: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  // ✅ Fetch all profiles (applications)
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/profile"); // 👈 backend route
      console.log("Fetched profiles:", response.data);

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
        }));

        setApplications(apps);
      } else {
        setApplications([]);
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
    fetchApplications();
  }, []);

  // ✅ Handle View button - navigate to details route
  const navigate = useNavigate();
  const handleView = (app: Application) => {
    // Navigate to nested route /applications/:id (parent route mounts this component at /applications)
    navigate(`/${app.id}`);
  };

  // ✅ Handle Download button
  const handleDownload = async (app: Application) => {
    try {
      const response = await apiClient.get(`/profile/${app.id}`, {
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

  // ✅ Handle Delete button
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;

    try {
      await apiClient.delete(`/profile/${id}`);
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
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100 border-b">
              <th className="p-4 font-medium text-gray-600">Name</th>
              <th className="p-4 font-medium text-gray-600">Email</th>
              <th className="p-4 font-medium text-gray-600">Created</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
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
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleView(app)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDownload(app)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-red-600 hover:text-red-800"
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
      )}
    </div>
  );
};

export default ApplicationsTable;
