
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useProfileStore } from "../store/profile";
import MedicalKitChargeDocument from "../components/documents/MedicalKitChargeDocument";

interface MedicalKitChangeProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    medicalKitFile?: File | null;
    medicalKitPreview?: string | null;
    [key: string]: unknown;
  };
}

export default function MedicalKitChange({
  nextStep,
  prevStep,
  updateData,
  formData,
}: MedicalKitChangeProps) {
  const [medicalKitPreview, setMedicalKitPreview] = useState<string | null>(formData.medicalKitPreview || null);
  const [medicalKitFile, setMedicalKitFile] = useState<File | null>(formData.medicalKitFile || null);
  const { profile, fetchProfile, loading, error } = useProfileStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const profileId = localStorage.getItem("profileId");

  const hasUploaded = Boolean(profile?.medicalKit);
  const status = profile?.medicalKitStatus || '';
  const isApproved = status === 'APPROVED';
  const canProceed = isApproved;
  const isDisabled = hasUploaded;

  useEffect(() => {
    if (profileId) {
      fetchProfile(Number(profileId));
    }
  }, [fetchProfile, profileId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setMedicalKitPreview(result);
        setMedicalKitFile(selectedFile);
        updateData("medicalKitPreview", result);
        updateData("medicalKitFile", selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!medicalKitFile) {
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
      const formData = new FormData();
      formData.append("medicalKit", medicalKitFile);

      // Send the request with FormData
      await api.put(`/profile/update/${profileId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refetch profile to update status and image
      await fetchProfile(Number(profileId));

      // Reset state
      setMedicalKitPreview(null);
      setMedicalKitFile(null);
      updateData("medicalKitPreview", null);
      updateData("medicalKitFile", null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to upload medical kit verification";
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const renderStatusMessage = () => {
    if (!hasUploaded) return null;

    if (status === 'PENDING') {
      return (
        <div className="flex items-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 rounded-lg border-l-4 border-yellow-400 shadow-md animate-fade-in">
          <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Verification Pending</span>: Awaiting administrator approval for medical kit verification.
        </div>
      );
    } else if (status === 'REJECTED') {
      return (
        <div className="flex items-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
          <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Verification Rejected</span>: The submitted medical kit verification was not approved.
        </div>
      );
    } else if (status === 'APPROVED') {
      return (
        <div className="flex items-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-green-50 to-green-100 text-green-800 rounded-lg border-l-4 border-green-400 shadow-md animate-fade-in">
          <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Verification Approved</span>: The medical kit verification has been successfully approved.
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg shadow-md animate-fade-in">
        <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
        </svg>
        <span className="font-medium">Loading Profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center p-2 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
        <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">Error</span>: {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          {!hasUploaded ? (
            <>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Upload Medical Kit Verification</label>
              <input
                type="file"
                onChange={handleFileChange}
                disabled={isDisabled}
                className="mb-4 sm:mb-6 w-full border border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-100 file:text-teal-700 file:font-medium file:hover:bg-teal-200 disabled:bg-gray-100 disabled:file:bg-gray-200 transition-all duration-300"
                accept="image/*"
              />
              {medicalKitPreview && (
                <img
                  src={medicalKitPreview}
                  alt="Preview"
                  className="mb-4 sm:mb-6 w-full max-h-[300px] rounded-lg shadow-md object-contain"
                />
              )}
              <button
                type="submit"
                disabled={isUploading || !medicalKitFile}
                className={`w-full px-4 sm:px-8 py-2 sm:py-3 rounded-lg text-white font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 ${
                  isUploading || !medicalKitFile
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95"
                }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Submit Verification"
                )}
              </button>
              {uploadError && (
                <div className="flex items-center mt-2 sm:mt-4 p-2 sm:p-4 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
                  <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Error</span>: {uploadError}
                </div>
              )}
            </>
          ) : (
            <>
              <img
                src={profile?.medicalKit?.url || ''}
                alt="Uploaded Medical Kit Verification"
                className="mb-4 sm:mb-6 w-full max-h-[300px] rounded-lg shadow-md object-contain"
              />
              {renderStatusMessage()}
            </>
          )}
        </div>

        {
          isApproved && <MedicalKitChargeDocument profile={profile}/>
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