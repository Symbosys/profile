import { useState, useEffect, type FormEvent } from "react";
import api from "../api/api";
import { useProfileStore } from "../store/profile";

interface EmailVerificationProps {
  nextStep: () => void;
  prevStep?: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    email?: string;
    otp?: string;
    [key: string]: unknown;
  };
}

export default function EmailVerification({
  nextStep,
  prevStep,
  updateData,
  formData,
}: EmailVerificationProps) {
  const [email, setEmail] = useState(formData.email || "");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Track OTP sent success

  const { profile, loading, error: profileError, fetchProfile } = useProfileStore();
  const profileId = localStorage.getItem("profileId");

  useEffect(() => {
    if (profileId) {
      fetchProfile(Number(profileId));
    }
  }, [fetchProfile, profileId]);

  // Update email input if profile exists
  useEffect(() => {
    if (profile && profile.email) {
      setEmail(profile.email);
      updateData("email", profile.email);
    }
  }, [profile, updateData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (!otpSent) {
        // Send OTP request
        const response = await api.post("/otp/request", { email });
        updateData("email", email);
        setOtpSent(true);
        setSuccessMessage(response.data.message || "OTP sent to your email!");
      } else {
        // Verify OTP
        const response = await api.post("/otp/verify", { email, otp });
        localStorage.setItem("profileId", response.data.data.profile.id);
        updateData("otp", otp);
        updateData("profile", response.data.data.profile); // Store profile data
        nextStep();
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if form should be disabled
  const isFormDisabled = !!profile || isLoading;

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl transition-all duration-300">
      {/* Messages */}
      {loading && (
        <div className="flex items-center justify-center p-4 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg shadow-md animate-fade-in">
          <svg className="w-6 h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
          </svg>
          <span className="font-medium">Loading Profile...</span>
        </div>
      )}
      {error && (
        <div className="flex items-center p-4 mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
          <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Error</span>: {error}
        </div>
      )}
      {profileError && (
        <div className="flex items-center p-4 mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
          <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Profile Error</span>: {profileError}
        </div>
      )}
      {successMessage && (
        <div className="flex items-center p-4 mb-6 bg-gradient-to-r from-green-50 to-green-100 text-green-800 rounded-lg border-l-4 border-green-400 shadow-md animate-fade-in">
          <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Success</span>: {successMessage}
        </div>
      )}
      {profile && (
        <div className="flex items-center p-4 mb-6 bg-gradient-to-r from-green-50 to-green-100 text-green-800 rounded-lg border-l-4 border-green-400 shadow-md animate-fade-in">
          <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Email Verified</span>: Your email has already been verified.
        </div>
      )}
      {!profile && !loading && !error && !profileError && !successMessage && (
        <div className="flex items-center p-4 mb-6 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 rounded-lg border-l-4 border-yellow-400 shadow-md animate-fade-in">
          <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Action Required</span>: Please verify your email address.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full"
      >
        {/* Email Input + Send OTP Button */}
        <div className="flex w-full items-center gap-4">
          <label className="block text-sm font-semibold text-gray-800 sr-only">Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            disabled={isFormDisabled}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300"
            required
          />
          {!otpSent && (
            <button
              type="submit"
              disabled={isFormDisabled}
              className={`px-8 py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition-all duration-300 ${
                isFormDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          )}
        </div>

        {/* OTP Input + Verify Button */}
        {otpSent && (
          <div className="flex w-full items-center gap-4">
            <label className="block text-sm font-semibold text-gray-800 sr-only">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={isFormDisabled}
              className="flex-1 border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300"
              required
            />
            <button
              type="submit"
              disabled={isFormDisabled}
              className={`px-8 py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition-all duration-300 ${
                isFormDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        )}

        {/* Previous / Next Buttons */}
        <div className="flex justify-between w-full mt-8 gap-4">
          {prevStep && (
            <button
              type="button"
              onClick={prevStep}
              disabled={isLoading}
              className={`flex-1 px-6 py-3 rounded-lg text-slate-800 font-semibold text-lg shadow-md transition-all duration-300 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-200 hover:bg-slate-300 hover:shadow-lg active:scale-95"
              }`}
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={nextStep}
            disabled={isLoading || !profile}
            className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-md transition-all duration-300 ${
              isLoading || !profile
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}