
// src/components/HotelBooking.tsx
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useProfileStore } from "../store/profile";
import HotelBookingChargeNotice from "../components/documents/HotelBookingChargeNotice";
import QRPaymentDisplay from "../components/shared/QrCode";
interface HotelBookingProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    hotelBookingFile?: File | null;
    hotelBookingPreview?: string | null;
    [key: string]: unknown;
  };
}
export default function HotelBooking({
  nextStep,
  prevStep,
  updateData,
  formData,
}: HotelBookingProps) {
  const [hotelBookingPreview, setHotelBookingPreview] = useState<string | null>(formData.hotelBookingPreview || null);
  const [hotelBookingFile, setHotelBookingFile] = useState<File | null>(formData.hotelBookingFile || null);
  const { profile, fetchProfile, loading, error } = useProfileStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const profileId = localStorage.getItem("profileId");
  // ---------- STATUS ----------
  const hasUploaded = Boolean(profile?.hotelBooking);
  const status = profile?.hotelBookingStatus || ""; // <-- exact DB field
  const isApproved = status === "APPROVED";
  const canProceed = isApproved;
  const isDisabled = hasUploaded;
  useEffect(() => {
    if (profileId) fetchProfile(Number(profileId));
  }, [fetchProfile, profileId]);
  // ---------- FILE PREVIEW ----------
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setHotelBookingPreview(result);
      setHotelBookingFile(selectedFile);
      updateData("hotelBookingPreview", result);
      updateData("hotelBookingFile", selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };
  // ---------- UPLOAD ----------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!hotelBookingFile) {
      setUploadError("Please select a file");
      return;
    }
    if (!profileId) {
      setUploadError("Profile ID is missing");
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("hotelBooking", hotelBookingFile); // <-- backend expects this key
      await api.put(`/profile/update/${profileId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchProfile(Number(profileId));
      // reset UI
      setHotelBookingPreview(null);
      setHotelBookingFile(null);
      updateData("hotelBookingPreview", null);
      updateData("hotelBookingFile", null);
    } catch (err: any) {
      setUploadError(err.response?.data?.message || "Failed to upload hotel booking");
    } finally {
      setIsUploading(false);
    }
  };
  // ---------- STATUS MESSAGE ----------
  const renderStatusMessage = () => {
    if (!hasUploaded) return null;
    const messages = {
      PENDING: {
        bg: "from-yellow-50 to-yellow-100",
        border: "border-yellow-400",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
        text: "Hotel Booking Pending: Awaiting administrator approval for hotel booking.",
      },
      REJECTED: {
        bg: "from-red-50 to-red-100",
        border: "border-red-400",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
        text: "Hotel Booking Rejected: The submitted hotel booking was not approved.",
      },
      APPROVED: {
        bg: "from-green-50 to-green-100",
        border: "border-green-400",
        icon: (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M5 13l4 4L19 7" />
        ),
        text: "Hotel Booking Approved: The hotel booking has been successfully approved.",
      },
    };
    const cfg = messages[status as keyof typeof messages];
    if (!cfg) return null;
    return (
      <div className={`flex items-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r ${cfg.bg} text-${cfg.border.includes('yellow') ? 'yellow' : cfg.border.includes('red') ? 'red' : 'green'}-800 rounded-lg border-l-4 ${cfg.border} shadow-md animate-fade-in`}>
        <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {cfg.icon}
        </svg>
        <span className="font-medium">{cfg.text.split(":")[0]}</span>: {cfg.text.split(":")[1]}
      </div>
    );
  };
  // ---------- RENDER ----------
  if (loading) return <div className="flex items-center justify-center p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg shadow-md animate-fade-in">
    <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
    </svg>
    <span className="font-medium">Loading Profile...</span>
  </div>;
  if (error) return <div className="flex items-center p-2 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
    <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="font-medium">Error</span>: {error}
  </div>;
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          {!hasUploaded ? (
            <>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Upload Hotel Booking
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                disabled={isDisabled}
                className="mb-4 sm:mb-6 w-full border border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-100 file:text-teal-700 file:font-medium file:hover:bg-teal-200 disabled:bg-gray-100 disabled:file:bg-gray-200 transition-all duration-300"
                accept="image/*"
              />
              {hotelBookingPreview && (
                <img
                  src={hotelBookingPreview}
                  alt="Preview"
                  className="mb-4 sm:mb-6 w-full max-h-[300px] rounded-lg shadow-md object-contain"
                />
              )}
              <button
                type="submit"
                disabled={isUploading || !hotelBookingFile}
                className={`w-full px-4 sm:px-8 py-2 sm:py-3 rounded-lg text-white font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 ${
                  isUploading || !hotelBookingFile
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95"
                }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Submit Hotel Booking"
                )}
              </button>
              {uploadError && (
                <div className="flex items-center mt-2 sm:mt-4 p-2 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
                  <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Error</span>: {uploadError}
                </div>
              )}
            </>
          ) : (
            <>
              <img
                src={profile?.hotelBooking?.url || ""}
                alt="Uploaded Hotel Booking"
                className="mb-4 sm:mb-6 w-full max-h-[300px] rounded-lg shadow-md object-contain"
              />
              {renderStatusMessage()}
            </>
          )}
        </div>
        
        {
          isApproved ? <HotelBookingChargeNotice profile={profile} /> : <QRPaymentDisplay />
        }

        <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-8 gap-2 sm:gap-4">
          <button
            className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-slate-200 rounded-lg text-slate-800 font-semibold text-base sm:text-lg shadow-md transition-all duration-300 hover:bg-slate-300 hover:shadow-lg active:scale-95"
            onClick={prevStep}
            type="button"
          >
            Previous
          </button>
          <button
            className={`w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold text-base sm:text-lg shadow-md transition-all duration-300 ${
              canProceed
                ? "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={nextStep}
            disabled={!canProceed}
            type="button"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
} 