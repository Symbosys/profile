// import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
// import { useProfileStore } from "../store/profile";
// import api from "../api/api";

// export type RefundFormData = {
//   name?: string;
//   dob?: string;
//   state?: string;
//   phone?: string;
//   address?: string;
//   upi?: string;
//   gender?: string;
// };

// interface Props {
//   formData: RefundFormData;
//   updateData: (key: string, value: unknown) => void;
//   prevStep: () => void;
//   nextStep: () => void;
//   onSubmit: (e?: FormEvent) => void;
//   disabledStep?: boolean;
// }

// export default function CreateRefundStep({
//   formData,
//   updateData,
//   prevStep,
//   nextStep,
//   onSubmit,
//   disabledStep = false,
// }: Props) {
//   const [local, setLocal] = useState<RefundFormData>({
//     name: formData.name || "",
//     dob: formData.dob || "",
//     state: formData.state || "",
//     phone: formData.phone || "",
//     address: formData.address || "",
//     upi: formData.upi || "",
//     gender: formData.gender || "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
//   const [serverError, setServerError] = useState<Record<string, string>>({});
//   const [formError, setFormError] = useState<string | null>(null); // Track form validation errors

//   const { profile, fetchProfile, loading, error } = useProfileStore();
//   const profileId = localStorage.getItem("profileId");

//   // Check if profile has required fields filled
//   const isPrefilled = Boolean(
//     profile?.name &&
//     profile?.phone &&
//     profile?.upi &&
//     profile?.gender
//   );

//   // Check if all required fields are filled in local state
//   const isAllFilled = Boolean(
//     local.name?.trim() &&
//     local.phone?.trim() &&
//     local.upi?.trim() &&
//     local.gender?.trim()
//   );

//   // Next button should be enabled only if prefilled OR successfully submitted
//   const canProceedToNext = isPrefilled || isSubmitted;

//   // Inputs and submit button are disabled if prefilled or successfully submitted
//   const isDisabled = disabledStep || isPrefilled || isSubmitted;

//   // Fetch profile on mount
//   useEffect(() => {
//     if (profileId) {
//       fetchProfile(Number(profileId));
//     }
//   }, [fetchProfile, profileId]);

//   // Prefill form with profile data
//   useEffect(() => {
//     if (profile) {
//       const updatedLocal = {
//         name: profile.name || "",
//         dob: profile.dateOfBirth || "",
//         state: profile.state || "",
//         phone: profile.phone || "",
//         address: profile.address || "",
//         upi: profile.upi || "",
//         gender: profile.gender || "",
//       };
//       setLocal(updatedLocal);
//       // Update parent formData
//       Object.entries(updatedLocal).forEach(([k, v]) => updateData(k, v));
//     }
//   }, [profile, updateData]);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setLocal((prev) => ({ ...prev, [name]: value }));
//     updateData(name, value);
//     // Clear server error for this field when user starts typing
//     setServerError((prev) => ({ ...prev, [name]: "" }));
//     setFormError(null); // Clear form error on input change
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!isAllFilled) {
//       setFormError("Please fill required fields: Name, Phone, UPI, Gender");
//       return;
//     }

//     if (!profileId) {
//       setFormError("Profile ID is missing");
//       return;
//     }

//     try {
//       // Prepare payload for backend, matching updateProfileSchema
//       const payload = {
//         name: local.name,
//         dateOfBirth: local.dob,
//         state: local.state,
//         phone: local.phone,
//         address: local.address,
//         upi: local.upi,
//         gender: local.gender,
//       };

//       // Send update request to backend
//       await api.put(`/profile/update/${profileId}`, payload);

//       // Clear any previous errors
//       setServerError({});
//       setFormError(null);

//       // Mark as submitted to disable inputs and submit button
//       setIsSubmitted(true);

//       // Update parent formData and trigger onSubmit
//       Object.entries(local).forEach(([k, v]) => updateData(k, v));
//       onSubmit(e);
//     } catch (err: any) {
//       if (err.response?.data?.errors) {
//         // Handle Zod validation errors
//         const zodErrors = err.response.data.errors.reduce(
//           (acc: Record<string, string>, error: any) => {
//             const field = error.path[0]; // e.g., "name", "phone"
//             acc[field] = error.message;
//             return acc;
//           },
//           {}
//         );
//         setServerError(zodErrors);
//         setFormError(null);
//       } else {
//         setServerError({});
//         setFormError(err.response?.data?.message || "Failed to update profile");
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl transition-all duration-300">
//       {loading && (
//         <div className="flex items-center justify-center p-4 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg shadow-md">
//           <svg className="w-6 h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
//           </svg>
//           <span className="font-medium">Loading Profile...</span>
//         </div>
//       )}
//       {error && (
//         <div className="flex items-center p-4 mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
//           <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span className="font-medium">Error</span>: {error}
//         </div>
//       )}
//       {formError && (
//         <div className="flex items-center p-4 mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
//           <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span className="font-medium">Error</span>: {formError}
//         </div>
//       )}
//       <div className="grid grid-cols-1 gap-6">
//         {/* Form Inputs */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-800">Name *</label>
//           <input
//             name="name"
//             value={local.name}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             placeholder="Full name"
//             required
//           />
//           {serverError.name && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.name}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">Date of Birth</label>
//           <input
//             type="date"
//             name="dob"
//             value={String(local.dob || "")}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//           />
//           {serverError.dateOfBirth && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.dateOfBirth}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">State</label>
//           <input
//             name="state"
//             value={local.state}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             placeholder="State"
//           />
//           {serverError.state && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.state}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">Phone Number *</label>
//           <input
//             name="phone"
//             value={local.phone}
//             onChange={handleChange}
//             pattern="\d{10}"
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             placeholder="10-digit number"
//             required
//           />
//           {serverError.phone && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.phone}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">Gender *</label>
//           <select
//             name="gender"
//             value={local.gender}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="MALE">Male</option>
//             <option value="FEMALE">Female</option>
//             <option value="OTHER">Other</option>
//           </select>
//           {serverError.gender && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.gender}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">Address</label>
//           <textarea
//             name="address"
//             value={local.address}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200 resize-y"
//             rows={4}
//             placeholder="Full address"
//           />
//           {serverError.address && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.address}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">UPI ID *</label>
//           <input
//             name="upi"
//             value={local.upi}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             placeholder="example@upi"
//             required
//           />
//           {serverError.upi && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.upi}
//             </div>
//           )}
//         </div>

//         {/* Submit button centered */}
//         <div className="flex justify-center mt-6">
//           <button
//             type="submit"
//             disabled={isDisabled}
//             className={`px-8 py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition-all duration-300 ${
//               isDisabled
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95"
//             }`}
//           >
//             Submit
//           </button>
//         </div>

//         {/* Previous / Next buttons below Submit */}
//         <div className="flex justify-between mt-6 gap-4">
//           <button
//             type="button"
//             onClick={prevStep}
//             className="flex-1 px-6 py-3 bg-slate-200 rounded-lg text-slate-800 font-semibold shadow-md hover:bg-slate-300 hover:shadow-lg transition-all duration-200 active:scale-95"
//           >
//             Previous
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               Object.entries(local).forEach(([k, v]) => updateData(k, v));
//               nextStep();
//             }}
//             disabled={!canProceedToNext}
//             className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
//               !canProceedToNext
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }



import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useProfileStore } from "../store/profile";
import api from "../api/api";

export type RefundFormData = {
  name?: string;
  dob?: string;
  state?: string;
  phone?: string;
  address?: string;
  upi?: string;
  gender?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  bankName?: string;
};

interface Props {
  formData: RefundFormData;
  updateData: (key: string, value: unknown) => void;
  prevStep: () => void;
  nextStep: () => void;
  onSubmit: (e?: FormEvent) => void;
  disabledStep?: boolean;
}

export default function CreateRefundStep({
  formData,
  updateData,
  prevStep,
  nextStep,
  onSubmit,
  disabledStep = false,
}: Props) {
  const [local, setLocal] = useState<RefundFormData>({
    name: formData.name || "",
    dob: formData.dob || "",
    state: formData.state || "",
    phone: formData.phone || "",
    address: formData.address || "",
    upi: formData.upi || "",
    gender: formData.gender || "",
    bankAccountNumber: formData.bankAccountNumber || "",
    ifscCode: formData.ifscCode || "",
    bankName: formData.bankName || "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const [serverError, setServerError] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null); // Track form validation errors

  const { profile, fetchProfile, loading, error } = useProfileStore();
  const profileId = localStorage.getItem("profileId");

  // Check if profile has required fields filled
  const isPrefilled = Boolean(
    profile?.name &&
    profile?.phone &&
    profile?.upi &&
    profile?.gender
  );

  // Check if all required fields are filled in local state
  const isAllFilled = Boolean(
    local.name?.trim() &&
    local.phone?.trim() &&
    local.upi?.trim() &&
    local.gender?.trim()
  );

  // Next button should be enabled only if prefilled OR successfully submitted
  const canProceedToNext = isPrefilled || isSubmitted;

  // Inputs and submit button are disabled if prefilled or successfully submitted
  const isDisabled = disabledStep || isPrefilled || isSubmitted;

  // Fetch profile on mount
  useEffect(() => {
    if (profileId) {
      fetchProfile(Number(profileId));
    }
  }, [fetchProfile, profileId]);

  // Prefill form with profile data
  useEffect(() => {
    if (profile) {
      const updatedLocal = {
        name: profile.name || "",
        dob: profile.dateOfBirth || "",
        state: profile.state || "",
        phone: profile.phone || "",
        address: profile.address || "",
        upi: profile.upi || "",
        gender: profile.gender || "",
        bankAccountNumber: profile.bankAccountNumber || "",
        ifscCode: profile.ifscCode || "",
        bankName: profile.bankName || "",
      };
      setLocal(updatedLocal);
      // Update parent formData
      Object.entries(updatedLocal).forEach(([k, v]) => updateData(k, v));
    }
  }, [profile, updateData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocal((prev) => ({ ...prev, [name]: value }));
    updateData(name, value);
    // Clear server error for this field when user starts typing
    setServerError((prev) => ({ ...prev, [name]: "" }));
    setFormError(null); // Clear form error on input change
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAllFilled) {
      setFormError("Please fill required fields: Name, Phone, UPI, Gender");
      return;
    }

    if (!profileId) {
      setFormError("Profile ID is missing");
      return;
    }

    try {
      // Prepare payload for backend, matching updateProfileSchema
      const payload = {
        name: local.name,
        dateOfBirth: local.dob,
        state: local.state,
        phone: local.phone,
        address: local.address,
        upi: local.upi,
        gender: local.gender,
        bankAccountNumber: local.bankAccountNumber,
        ifscCode: local.ifscCode,
        bankName: local.bankName,
      };

      // Send update request to backend
      await api.put(`/profile/update/${profileId}`, payload);

      // Clear any previous errors
      setServerError({});
      setFormError(null);

      // Mark as submitted to disable inputs and submit button
      setIsSubmitted(true);

      // Update parent formData and trigger onSubmit
      Object.entries(local).forEach(([k, v]) => updateData(k, v));
      onSubmit(e);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        // Handle Zod validation errors
        const zodErrors = err.response.data.errors.reduce(
          (acc: Record<string, string>, error: any) => {
            const field = error.path[0]; // e.g., "name", "phone"
            acc[field] = error.message;
            return acc;
          },
          {}
        );
        setServerError(zodErrors);
        setFormError(null);
      } else {
        setServerError({});
        setFormError(err.response?.data?.message || "Failed to update profile");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl transition-all duration-300">
      {loading && (
        <div className="flex items-center justify-center p-4 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg shadow-md">
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
      {formError && (
        <div className="flex items-center p-4 mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
          <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Error</span>: {formError}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6">
        {/* Form Inputs */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">Name *</label>
          <input
            name="name"
            value={local.name}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
            placeholder="Full name"
            required
          />
          {serverError.name && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.name}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={String(local.dob || "")}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
          />
          {serverError.dateOfBirth && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.dateOfBirth}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">State</label>
          <input
            name="state"
            value={local.state}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
            placeholder="State"
          />
          {serverError.state && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.state}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">Phone Number *</label>
          <input
            name="phone"
            value={local.phone}
            onChange={handleChange}
            pattern="\d{10}"
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
            placeholder="10-digit number"
            required
          />
          {serverError.phone && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.phone}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">Gender *</label>
          <select
            name="gender"
            value={local.gender}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {serverError.gender && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.gender}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">Address</label>
          <textarea
            name="address"
            value={local.address}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200 resize-y"
            rows={4}
            placeholder="Full address"
          />
          {serverError.address && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.address}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">UPI ID (Optional)</label>
          <input
            name="upi"
            value={local.upi}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
            placeholder="example@upi"
          />
          {serverError.upi && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.upi}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">Bank Name *</label>
          <input
            name="bankName"
            value={local.bankName}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
            placeholder="Bank Name"
          />
          {serverError.bankName && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.bankName}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">Bank Account Number *</label>
          <input
            name="bankAccountNumber"
            value={local.bankAccountNumber}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
            placeholder="Account Number"
          />
          {serverError.bankAccountNumber && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.bankAccountNumber}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800">IFSC Code *</label>
          <input
            name="ifscCode"
            value={local.ifscCode}
            onChange={handleChange}
            disabled={isDisabled}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
            placeholder="IFSC Code"
          />
          {serverError.ifscCode && (
            <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {serverError.ifscCode}
            </div>
          )}
        </div>

        {/* Submit button centered */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isDisabled}
            className={`px-8 py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition-all duration-300 ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95"
            }`}
          >
            Submit
          </button>
        </div>

        {/* Previous / Next buttons below Submit */}
        <div className="flex justify-between mt-6 gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 px-6 py-3 bg-slate-200 rounded-lg text-slate-800 font-semibold shadow-md hover:bg-slate-300 hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => {
              Object.entries(local).forEach(([k, v]) => updateData(k, v));
              nextStep();
            }}
            disabled={!canProceedToNext}
            className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
              !canProceedToNext
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}