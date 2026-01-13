
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useProfileStore } from "../store/profile";
import JoiningLetterDocument from "../components/documents/JoiningLetterDocument";
import QRPaymentDisplay from "../components/shared/QrCode";
import { usePaymentStore } from "../hook/useFee";

interface JoiningFormChangeProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    joiningFile?: File | null;
    joiningPreview?: string | null;
    [key: string]: unknown;
  };
  isAdminApproved?: boolean;
}

export default function JoiningFormChange({
  nextStep,
  prevStep,
  updateData,
  formData,
  isAdminApproved = false,
}: JoiningFormChangeProps) {
  const [joiningPreview, setJoiningPreview] = useState<string | null>(formData.joiningPreview || null);
  const [joiningFile, setJoiningFile] = useState<File | null>(formData.joiningFile || null);
  const { profile, fetchProfile, loading, error } = useProfileStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const profileId = localStorage.getItem("profileId");

  const hasUploaded = Boolean(profile?.joiningFromChange);
  const status = profile?.joiningFromChangeStatus || '';
  const isApproved = status === 'APPROVED';
  const canProceed = isApproved;
  const isDisabled = hasUploaded;

  const { fees, fetchFees } = usePaymentStore()


  useEffect(() => {
    if (profileId) {
      fetchProfile(Number(profileId));
    }
    fetchFees();
  }, [fetchProfile, profileId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setJoiningPreview(result);
        setJoiningFile(selectedFile);
        updateData("joiningPreview", result);
        updateData("joiningFile", selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!joiningFile) {
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
      formData.append("joiningFromChange", joiningFile);

      // Send the request with FormData
      await api.put(`/profile/update/${profileId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refetch profile to update status and image
      await fetchProfile(Number(profileId));

      // Reset state
      setJoiningPreview(null);
      setJoiningFile(null);
      updateData("joiningPreview", null);
      updateData("joiningFile", null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to upload joining form verification";
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const renderStatusMessage = () => {
    if (!hasUploaded) return null;

    if (status === 'PENDING') {
      return (
        <div style={{ padding: "1rem", backgroundColor: "#fef3c7", border: "1px solid #fcd34d", borderRadius: "0.5rem", display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <svg style={{ width: "1.25rem", height: "1.25rem", color: "#d97706", flexShrink: 0, marginTop: "0.125rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#92400e", margin: "0 0 0.25rem 0" }}>Verification Pending</p>
            <p style={{ fontSize: "0.85rem", color: "#b45309", margin: "0" }}>Awaiting administrator approval for joining form verification.</p>
          </div>
        </div>
      );
    } else if (status === 'REJECTED') {
      return (
        <div style={{ padding: "1rem", backgroundColor: "#fee2e2", border: "1px solid #fecaca", borderRadius: "0.5rem", display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <svg style={{ width: "1.25rem", height: "1.25rem", color: "#dc2626", flexShrink: 0, marginTop: "0.125rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#991b1b", margin: "0 0 0.25rem 0" }}>Verification Rejected</p>
            <p style={{ fontSize: "0.85rem", color: "#7f1d1d", margin: "0" }}>The submitted joining form verification was not approved.</p>
          </div>
        </div>
      );
    } else if (status === 'APPROVED') {
      return (
        <div style={{ padding: "1rem", backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: "0.5rem", display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <svg style={{ width: "1.25rem", height: "1.25rem", color: "#16a34a", flexShrink: 0, marginTop: "0.125rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#166534", margin: "0 0 0.25rem 0" }}>Verification Approved</p>
            <p style={{ fontSize: "0.85rem", color: "#15803d", margin: "0" }}>The joining form verification has been successfully approved.</p>
          </div>
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div style={{ width: "100%", maxWidth: "56rem", margin: "2rem auto", padding: "0.5rem" }}>
        <div style={{ padding: "1.5rem", backgroundColor: "#eff6ff", border: "2px solid #93c5fd", borderRadius: "0.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <svg style={{ width: "1.5rem", height: "1.5rem", color: "#1e40af", animation: "spin 1s linear infinite", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
          </svg>
          <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1e40af" }}>Loading Profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: "100%", maxWidth: "56rem", margin: "2rem auto", padding: "0.5rem" }}>
        <div style={{ padding: "1.5rem", backgroundColor: "#fee2e2", border: "2px solid #fecaca", borderRadius: "0.5rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <svg style={{ width: "1.5rem", height: "1.5rem", color: "#dc2626", flexShrink: 0, marginTop: "0.125rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p style={{ fontSize: "0.95rem", fontWeight: "600", color: "#991b1b", margin: "0 0 0.25rem 0" }}>Error</p>
            <p style={{ fontSize: "0.85rem", color: "#7f1d1d", margin: "0" }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", backgroundColor: "#f3f4f6", paddingTop: "1rem", paddingBottom: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "56rem", margin: "0 auto", padding: "0.5rem" }}>
        <div style={{ backgroundColor: "white", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", border: "2px solid #d1d5db", borderRadius: "0.75rem", overflow: "hidden" }}>
          {/* Header Section */}
          <div style={{ background: "linear-gradient(to right, #1e40af, #1e3a8a)", color: "white", padding: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", margin: "0 0 0.5rem 0" }}>Joining Letter Verification</h1>
            <p style={{ fontSize: "0.9rem", margin: "0", opacity: "0.9" }}>Upload and verify your joining letter document</p>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
            {/* Upload Section */}
            {!hasUploaded ? (
              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "1rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>
                  📄 Upload Joining Letter
                </label>
                <div style={{
                  position: "relative",
                  border: "2px dashed #93c5fd",
                  borderRadius: "0.5rem",
                  padding: "2rem",
                  textAlign: "center",
                  backgroundColor: "#eff6ff",
                  transition: "all 0.3s ease"
                }}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={isDisabled}
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      opacity: "0",
                      cursor: isDisabled ? "not-allowed" : "pointer"
                    }}
                    accept="image/*"
                  />
                  <div style={{ pointerEvents: "none" }}>
                    <svg style={{ width: "2.5rem", height: "2.5rem", margin: "0 auto 0.5rem", color: "#3b82f6" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <p style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1f2937", margin: "0.5rem 0 0.25rem 0" }}>
                      {joiningFile ? joiningFile.name : "Click to upload or drag and drop"}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0" }}>PNG, JPG or PDF (Max 10MB)</p>
                  </div>
                </div>

                {joiningPreview && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937", marginBottom: "0.75rem" }}>Preview:</p>
                    <img
                      src={joiningPreview}
                      alt="Preview"
                      style={{ width: "100%", maxHeight: "300px", borderRadius: "0.5rem", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", objectFit: "contain" }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploading || !joiningFile}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1.5rem",
                    marginTop: "1.5rem",
                    backgroundColor: isUploading || !joiningFile ? "#d1d5db" : "#1e40af",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "600",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: isUploading || !joiningFile ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                  onMouseEnter={(e) => {
                    if (!isUploading && joiningFile) {
                      e.currentTarget.style.backgroundColor = "#1e3a8a";
                      e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isUploading && joiningFile) {
                      e.currentTarget.style.backgroundColor = "#1e40af";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {isUploading ? (
                    <>
                      <svg style={{ width: "1.25rem", height: "1.25rem", animation: "spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg style={{ width: "1.25rem", height: "1.25rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Submit Verification
                    </>
                  )}
                </button>

                {uploadError && (
                  <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#fee2e2", border: "1px solid #fecaca", borderRadius: "0.5rem", display: "flex", gap: "0.75rem" }}>
                    <svg style={{ width: "1.25rem", height: "1.25rem", color: "#dc2626", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#991b1b", margin: "0 0 0.25rem 0" }}>Error</p>
                      <p style={{ fontSize: "0.85rem", color: "#7f1d1d", margin: "0" }}>{uploadError}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>Uploaded Document:</p>
                <img
                  src={profile?.joiningFromChange?.url || ''}
                  alt="Uploaded Joining Letter"
                  style={{ width: "100%", maxHeight: "400px", borderRadius: "0.5rem", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", objectFit: "contain", marginBottom: "1.5rem" }}
                />
                {renderStatusMessage()}
              </div>
            )}

            {/* Payment Section */}
            {!isApproved && (
              <div style={{ padding: "1.5rem", backgroundColor: "#eff6ff", border: "2px solid #93c5fd", borderRadius: "0.5rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <svg style={{ width: "1.5rem", height: "1.5rem", color: "#1e40af", flexShrink: 0, marginTop: "0.25rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1f2937", margin: "0 0 0.5rem 0" }}>Payment Required</h3>
                    <p style={{ fontSize: "0.85rem", color: "#374151", margin: "0 0 0.75rem 0" }}>Complete the payment to proceed with joining letter verification</p>
                    <div style={{ padding: "1rem", backgroundColor: "white", borderRadius: "0.375rem", border: "1px solid #d1d5db", textAlign: "center" }}>
                      <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0 0 0.25rem 0" }}>Amount Due</p>
                      <p style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1e40af", margin: "0" }}>₹{fees?.joiningFromFee}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Document or QR Display */}
            <div style={{ marginBottom: "2rem" }}>
              {isApproved ? (
                <JoiningLetterDocument profile={profile} fee={fees} />
              ) : (
                <QRPaymentDisplay />
              )}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <button
                type="button"
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontSize: "1rem",
                  fontWeight: "600",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onClick={prevStep}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                ← Previous
              </button>
              <button
                type="button"
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: canProceed && isAdminApproved ? "#10b981" : "#d1d5db",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: canProceed && isAdminApproved ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease"
                }}
                onClick={nextStep}
                disabled={!canProceed || !isAdminApproved}
                onMouseEnter={(e) => {
                  if (canProceed && isAdminApproved) {
                    e.currentTarget.style.backgroundColor = "#059669";
                    e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (canProceed && isAdminApproved) {
                    e.currentTarget.style.backgroundColor = "#10b981";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                Next →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}