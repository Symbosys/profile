// // src/pages/ApplicationDetails.tsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import * as htmlToImage from "html-to-image";
// import download from "downloadjs";
// import {
//   ChevronLeft,
//   Download,
//   Mail,
//   CalendarDays,
//   Image as ImageIcon,
// } from "lucide-react";
// import api from "../api/api";

// interface Application {
//   id: number;
//   name: string;
//   email: string;
//   dateOfBirth: string;
//   gender: string;
//   phone: string;
//   state: string;
//   [key: string]: any;
// }

// /* --------------------------------------------------------------- */
// /*  Helpers                                                        */
// /* --------------------------------------------------------------- */
// const toTitle = (key: string) =>
//   key
//     .replace(/([A-Z])/g, " $1")
//     .replace(/_/g, " ")
//     .replace(/^./, (s) => s.toUpperCase())
//     .trim();

// const extractAllImages = (
//   obj: any
// ): { title: string; url: string; statusField: string }[] => {
//   const result: { title: string; url: string; statusField: string }[] = [];

//   const walk = (value: any, currentPath: string) => {
//     if (!value || typeof value !== "object") return;

//     if (value.url && typeof value.url === "string") {
//       const key = currentPath.split(".").pop()!;

//       // ----  FORCE THE EXACT DB FIELD ----
//       const statusField =
//         key.toLowerCase().includes("car") || key.toLowerCase().includes("card")
//           ? "carVefificationStatus"          // <-- DB column
//           : key + "Status";

//       result.push({
//         title: toTitle(key),
//         url: value.url,
//         statusField,
//       });
//       return;
//     }

//     for (const k in value) {
//       walk(value[k], currentPath ? `${currentPath}.${k}` : k);
//     }
//   };

//   walk(obj, "");
//   return result;
// };

// const getCurrentStatus = (
//   app: Application,
//   statusField: string
// ): "PENDING" | "APPROVED" | "REJECTED" => {
//   const val = app[statusField];
//   return val === "APPROVED" || val === "REJECTED" || val === "PENDING"
//     ? val
//     : "PENDING";
// };

// /* --------------------------------------------------------------- */
// const ApplicationDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [application, setApplication] = useState<Application | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [capturing, setCapturing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [savingField, setSavingField] = useState<string>("");

//   /* -------------------------- FETCH -------------------------- */
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get(`/profile/${id}`);
//         const data = res.data.data || res.data;
//         setApplication(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load application");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [id]);

//   /* ---------------------- WHOLE SECTION ---------------------- */
//   const handleDownloadScreenshot = async () => {
//     const node = document.getElementById("verification-section");
//     if (!node) return;
//     setCapturing(true);
//     try {
//       const dataUrl = await htmlToImage.toPng(node, {
//         backgroundColor: "#fff",
//         pixelRatio: 2,
//       });
//       download(dataUrl, `${application?.name.replace(/\s/g, "_")}_verification.png`);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to capture screenshot");
//     } finally {
//       setCapturing(false);
//     }
//   };

//   /* ------------------- SINGLE IMAGE DOWNLOAD ---------------- */
//   const downloadSingleImage = async (url: string, title: string) => {
//     try {
//       const img = new Image();
//       img.crossOrigin = "anonymous";
//       img.src = url;
//       await new Promise((resolve, reject) => {
//         img.onload = resolve;
//         img.onerror = reject;
//       });

//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d")!;
//       ctx.drawImage(img, 0, 0);
//       canvas.toBlob((blob) => {
//         if (blob) download(blob, `${title.replace(/\s/g, "_")}.png`);
//       });
//     } catch (e) {
//       setError("Failed to download image");
//     }
//   };

//   /* ------------------- STATUS UPDATE ----------------------- */
//   const updateStatus = async (
//     statusField: string,
//     newStatus: "PENDING" | "APPROVED" | "REJECTED"
//   ) => {
//     if (!application) return;
//     setSavingField(statusField);

//     try {
//       const payload = { [statusField]: newStatus };
//       console.log("PATCH payload →", payload);   // <-- DEBUG

//       await api.put(`/profile/update/${id}`, payload);

//       setApplication((prev) => ({
//         ...prev!,
//         [statusField]: newStatus,
//       }));
//     } catch (e: any) {
//       setError(e.message || "Failed to update status");
//       console.error("PATCH error:", e);
//     } finally {
//       setSavingField("");
//     }
//   };

//   /* ----------------------- RENDER ----------------------- */
//   if (loading) return <div className="p-8 text-center">Loading...</div>;

//   if (!application)
//     return (
//       <div className="p-8 text-center">
//         <p className="text-gray-500">No application found</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="text-blue-600 hover:underline flex items-center gap-1 mt-2"
//         >
//           <ChevronLeft size={18} /> Go Back
//         </button>
//       </div>
//     );

//   const imageFields = extractAllImages(application);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-gray-100 px-3 py-2 rounded-md"
//           >
//             <ChevronLeft size={18} /> Back
//           </button>
//           <h2 className="text-xl font-semibold text-gray-800">
//             Application Details
//           </h2>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
//         )}

//         {/* Applicant Info */}
//         <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 mb-6">
//             <div>
//               <h2 className="text-3xl font-semibold text-gray-800">
//                 {application.name.trim()}
//               </h2>
//               <p className="text-gray-500 mt-1 flex items-center gap-1">
//                 <Mail size={16} /> {application.email}
//               </p>
//             </div>
//             <p className="text-gray-500 flex items-center gap-1">
//               <CalendarDays size={16} /> {application.dateOfBirth}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <span className="font-medium text-gray-700">Phone:</span>
//               <p className="text-gray-600">{application.phone}</p>
//             </div>
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <span className="font-medium text-gray-700">State:</span>
//               <p className="text-gray-600">{application.state}</p>
//             </div>
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <span className="font-medium text-gray-700">Gender:</span>
//               <p className="text-gray-600">{application.gender}</p>
//             </div>
//           </div>
//         </div>

//         {/* Verification Section */}
//         <div
//           id="verification-section"
//           className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
//         >
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
//             <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//               <ImageIcon size={20} /> Verification Images
//             </h3>

//             <button
//               onClick={handleDownloadScreenshot}
//               disabled={capturing}
//               className={`flex items-center gap-2 px-5 py-2 rounded-md shadow transition ${
//                 capturing
//                   ? "bg-blue-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               } text-white`}
//             >
//               <Download size={18} /> {capturing ? "Capturing..." : "Download All"}
//             </button>
//           </div>

//           {imageFields.length === 0 ? (
//             <p className="text-gray-500 bg-gray-50 p-5 rounded-lg text-center">
//               No images found for this application.
//             </p>
//           ) : (
//             <div className="flex flex-col gap-6">
//               {imageFields.map((img, i) => {
//                 const status = getCurrentStatus(application, img.statusField);
//                 const isSaving = savingField === img.statusField;

//                 return (
//                   <div
//                     key={i}
//                     className="w-full bg-gray-50 p-6 rounded-lg border shadow-sm hover:shadow-md transition flex flex-col"
//                   >
//                     <h4 className="font-medium text-gray-700 mb-3 text-lg">
//                       {img.title}
//                     </h4>

//                     <div className="relative mb-4 w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
//                       <img
//                         src={img.url}
//                         alt={img.title}
//                         className="w-full h-full object-contain"
//                         onError={(e) => {
//                           const el = e.target as HTMLImageElement;
//                           el.style.display = "none";
//                           const container = el.parentElement;
//                           if (container && !container.querySelector(".placeholder")) {
//                             const placeholder = document.createElement("div");
//                             placeholder.className =
//                               "flex items-center justify-center h-full bg-gray-200 rounded-lg text-gray-500 text-sm";
//                             placeholder.textContent = "Image not available";
//                             placeholder.classList.add("placeholder");
//                             container.appendChild(placeholder);
//                           }
//                         }}
//                       />
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
//                       <select
//                         value={status}
//                         disabled={isSaving}
//                         onChange={(e) =>
//                           updateStatus(img.statusField, e.target.value as any)
//                         }
//                         className={`w-full sm:w-40 px-3 py-2 rounded border text-sm font-medium transition ${
//                           status === "APPROVED"
//                             ? "bg-green-100 text-green-800 border-green-300"
//                             : status === "REJECTED"
//                               ? "bg-red-100 text-red-800 border-red-300"
//                               : "bg-yellow-100 text-yellow-800 border-yellow-300"
//                         } ${isSaving ? "opacity-70" : ""}`}
//                       >
//                         <option value="PENDING">Pending</option>
//                         <option value="APPROVED">Approved</option>
//                         <option value="REJECTED">Rejected</option>
//                       </select>

//                       <button
//                         onClick={() => downloadSingleImage(img.url, img.title)}
//                         className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition shadow"
//                       >
//                         <Download size={16} />
//                         Download
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationDetails;



// src/pages/ApplicationDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import {
  ChevronLeft,
  Download,
  Mail,
  CalendarDays,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import api from "../api/api";

interface Application {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  state: string;
  [key: string]: any;
}

const stepsList: string[] = [
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

/* --------------------------------------------------------------- */
/*  Helpers                                                        */
/* --------------------------------------------------------------- */
const toTitle = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();

const extractAllImages = (
  obj: any
): { title: string; url: string; statusField: string }[] => {
  const result: { title: string; url: string; statusField: string }[] = [];

  const walk = (value: any, currentPath: string) => {
    if (!value || typeof value !== "object") return;

    const imageUrl = value.secure_url || value.url;
    if (imageUrl && typeof imageUrl === "string") {
      const key = currentPath.split(".").pop()!;

      // ----  FORCE THE EXACT DB FIELD ----
      let statusField = key + "Status";
      if (key.toLowerCase().includes("car") || key.toLowerCase().includes("card")) {
        statusField = "carVefificationStatus";
      } else if (key === "phoneVerification") {
        statusField = "phoneVerificationVerifiedStatus";
      } else if (key === "customerImage") {
        statusField = ""; // Customer Image has no status in DB
      }

      result.push({
        title: toTitle(key),
        url: imageUrl,
        statusField,
      });
      return;
    }

    for (const k in value) {
      walk(value[k], currentPath ? `${currentPath}.${k}` : k);
    }
  };

  walk(obj, "");
  return result;
};

const getCurrentStatus = (
  app: Application,
  statusField: string
): "PENDING" | "APPROVED" | "REJECTED" => {
  const val = app[statusField];
  return val === "APPROVED" || val === "REJECTED" || val === "PENDING"
    ? val
    : "PENDING";
};

/* --------------------------------------------------------------- */
const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savingField, setSavingField] = useState<string>("");

  /* -------------------------- FETCH -------------------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profile/${id}`);
        const data = res.data.data || res.data;
        setApplication(data);
      } catch (err: any) {
        setError(err.message || "Failed to load application");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  /* -------------------------- DELETE -------------------------- */
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    setDeleting(true);
    try {
      await api.delete(`/profile/${id}`);
      navigate(-1);
    } catch (err: any) {
      setError(err.message || "Failed to delete profile");
    } finally {
      setDeleting(false);
    }
  };

  /* ---------------------- WHOLE SECTION ---------------------- */
  const handleDownloadScreenshot = async () => {
    const node = document.getElementById("verification-section");
    if (!node) return;
    setCapturing(true);
    try {
      const dataUrl = await htmlToImage.toPng(node, {
        backgroundColor: "#fff",
        pixelRatio: 2,
      });
      download(dataUrl, `${application?.name.replace(/\s/g, "_")}_verification.png`);
    } catch (err) {
      console.error(err);
      setError("Failed to capture screenshot");
    } finally {
      setCapturing(false);
    }
  };

  /* ------------------- SINGLE IMAGE DOWNLOAD ---------------- */
  const downloadSingleImage = async (url: string, title: string) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) download(blob, `${title.replace(/\s/g, "_")}.png`);
      });
    } catch (e) {
      setError("Failed to download image");
    }
  };

  /* ------------------- STATUS UPDATE ----------------------- */
  const updateStatus = async (
    statusField: string,
    newStatus: "PENDING" | "APPROVED" | "REJECTED"
  ) => {
    if (!application) return;
    setSavingField(statusField);

    try {
      const payload = { [statusField]: newStatus };
      console.log("PATCH payload →", payload);   // <-- DEBUG

      await api.put(`/profile/update/${id}`, payload);

      setApplication((prev) => ({
        ...prev!,
        [statusField]: newStatus,
      }));
    } catch (e: any) {
      setError(e.message || "Failed to update status");
      console.error("PATCH error:", e);
    } finally {
      setSavingField("");
    }
  };

  const updateStep = async (newStep: number) => {
    if (!application) return;
    setSavingField("currentStep");
    try {
      await api.put(`/profile/update/${id}`, { currentStep: newStep });
      setApplication((prev) => ({
        ...prev!,
        currentStep: newStep,
      }));
    } catch (e: any) {
      setError(e.message || "Failed to update step");
    } finally {
      setSavingField("");
    }
  };

  /* ----------------------- RENDER ----------------------- */
  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!application)
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No application found</p>
        <button
          onClick={() => navigate("/applications")}
          className="text-blue-600 hover:underline flex items-center gap-1 mt-2"
        >
          <ChevronLeft size={18} /> Go Back
        </button>
      </div>
    );

  const imageFields = extractAllImages(application);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/applications")}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 bg-gray-100 px-3 py-2 rounded-md"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 text-red-700 hover:text-red-900 bg-red-100 px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} /> {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Application Details
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        {/* Applicant Info */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 mb-6">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {application.name.trim()}
              </h2>
              <p className="text-gray-500 mt-1 flex items-center gap-1">
                <Mail size={16} /> {application.email}
              </p>
            </div>
            <p className="text-gray-500 flex items-center gap-1">
              <CalendarDays size={16} /> {application.dateOfBirth}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Phone:</span>
              <p className="text-gray-600">{application.phone}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">State:</span>
              <p className="text-gray-600">{application.state}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Gender:</span>
              <p className="text-gray-600">{application.gender}</p>
            </div>
            <div className="p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-100 md:col-span-3 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest font-bold text-blue-800 opacity-80">User Current Step</span>
                <p className="text-lg sm:text-2xl font-bold text-blue-950">
                  {stepsList[application.currentStep] ? (
                    <span className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold shadow-md">
                        {application.currentStep + 1}
                      </span>
                      {stepsList[application.currentStep]}
                    </span>
                  ) : `Step ${application.currentStep}`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/60 p-3 sm:p-4 rounded-xl border border-blue-200/50 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Admin Control:</label>
                </div>

                <div className="relative flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={application.currentStep}
                    disabled={savingField === "currentStep"}
                    onChange={(e) => updateStep(parseInt(e.target.value))}
                    className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-blue-300 bg-white text-blue-900 text-sm font-bold shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer hover:border-blue-400"
                  >
                    {stepsList.map((step, idx) => (
                      idx === 0 ? null : (
                        <option key={idx} value={idx}>
                          {idx + 1}. {step}
                        </option>
                      )
                    ))}
                  </select>

                  {savingField === "currentStep" && (
                    <div className="absolute right-10 sm:-right-8 top-1/2 -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Section */}
        <div
          id="verification-section"
          className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ImageIcon size={20} /> Verification Images
            </h3>

            <button
              onClick={handleDownloadScreenshot}
              disabled={capturing}
              className={`flex items-center gap-2 px-5 py-2 rounded-md shadow transition ${capturing
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
            >
              <Download size={18} /> {capturing ? "Capturing..." : "Download All"}
            </button>
          </div>

          {imageFields.length === 0 ? (
            <p className="text-gray-500 bg-gray-50 p-5 rounded-lg text-center">
              No images found for this application.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {imageFields.map((img, i) => {
                const status = getCurrentStatus(application, img.statusField);
                const isSaving = savingField === img.statusField;

                return (
                  <div
                    key={i}
                    className="w-full bg-gray-50 p-6 rounded-lg border shadow-sm hover:shadow-md transition flex flex-col"
                  >
                    <h4 className="font-medium text-gray-700 mb-3 text-lg">
                      {img.title}
                    </h4>

                    <div className="relative mb-4 w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.style.display = "none";
                          const container = el.parentElement;
                          if (container && !container.querySelector(".placeholder")) {
                            const placeholder = document.createElement("div");
                            placeholder.className =
                              "flex items-center justify-center h-full bg-gray-200 rounded-lg text-gray-500 text-sm";
                            placeholder.textContent = "Image not available";
                            placeholder.classList.add("placeholder");
                            container.appendChild(placeholder);
                          }
                        }}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      {img.statusField && (
                        <select
                          value={status}
                          disabled={isSaving}
                          onChange={(e) =>
                            updateStatus(img.statusField, e.target.value as any)
                          }
                          className={`w-full sm:w-40 px-3 py-2 rounded border text-sm font-medium transition ${status === "APPROVED"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : status === "REJECTED"
                              ? "bg-red-100 text-red-800 border-red-300"
                              : "bg-yellow-100 text-yellow-800 border-yellow-300"
                            } ${isSaving ? "opacity-70" : ""}`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="APPROVED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      )}

                      <button
                        onClick={() => downloadSingleImage(img.url, img.title)}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition shadow"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;