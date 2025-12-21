

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
//   bankAccountNumber?: string;
//   ifscCode?: string;
//   bankName?: string;
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
//     bankAccountNumber: formData.bankAccountNumber || "",
//     ifscCode: formData.ifscCode || "",
//     bankName: formData.bankName || "",
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
//         bankAccountNumber: profile.bankAccountNumber || "",
//         ifscCode: profile.ifscCode || "",
//         bankName: profile.bankName || "",
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
//         bankAccountNumber: local.bankAccountNumber,
//         ifscCode: local.ifscCode,
//         bankName: local.bankName,
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
//     <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg mx-auto p-4 sm:p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl transition-all duration-300">
//       {loading && (
//         <div className="flex items-center justify-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg shadow-md">
//           <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
//           </svg>
//           <span className="font-medium">Loading Profile...</span>
//         </div>
//       )}
//       {error && (
//         <div className="flex items-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
//           <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span className="font-medium">Error</span>: {error}
//         </div>
//       )}
//       {formError && (
//         <div className="flex items-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
//           <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span className="font-medium">Error</span>: {formError}
//         </div>
//       )}
//       <div className="grid grid-cols-1 gap-4 sm:gap-6">
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
//           <label className="block text-sm font-semibold text-gray-800">UPI ID (Optional)</label>
//           <input
//             name="upi"
//             value={local.upi}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             placeholder="example@upi"
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

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">Bank Name *</label>
//           <input
//             name="bankName"
//             value={local.bankName}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             placeholder="Bank Name"
//           />
//           {serverError.bankName && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.bankName}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">Bank Account Number *</label>
//           <input
//             name="bankAccountNumber"
//             value={local.bankAccountNumber}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             placeholder="Account Number"
//           />
//           {serverError.bankAccountNumber && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.bankAccountNumber}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-semibold text-gray-800">IFSC Code *</label>
//           <input
//             name="ifscCode"
//             value={local.ifscCode}
//             onChange={handleChange}
//             disabled={isDisabled}
//             className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 transition-all duration-200"
//             placeholder="IFSC Code"
//           />
//           {serverError.ifscCode && (
//             <div className="flex items-center mt-1 text-red-600 text-sm animate-fade-in">
//               <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {serverError.ifscCode}
//             </div>
//           )}
//         </div>


//         {/* Submit button centered */}
//         <div className="flex justify-center mt-4 sm:mt-6">
//           <button
//             type="submit"
//             disabled={isDisabled}
//             className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-white font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 ${
//               isDisabled
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95"
//             }`}
//           >
//             Submit
//           </button>
//         </div>

//         {/* Previous / Next buttons below Submit */}
//         <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-6 gap-2 sm:gap-4">
//           <button
//             type="button"
//             onClick={prevStep}
//             className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-slate-200 rounded-lg text-slate-800 font-semibold text-base sm:text-lg shadow-md hover:bg-slate-300 hover:shadow-lg transition-all duration-200 active:scale-95"
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
//             className={`w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold text-base sm:text-lg shadow-md transition-all duration-300 ${
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


import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useProfileStore } from "../store/profile";
import api from "../api/api";

export type RefundFormData = {
  email?: string;
  name?: string;
  dob?: string;
  state?: string;
  phone?: string;
  address?: string;
  gender?: string;
  customerImage?: File | FileList | null; // Accepts File (from parent state) or FileList (from input)
};

interface Props {
  formData: RefundFormData;
  updateData: (key: string, value: unknown) => void;
  prevStep: () => void;
  nextStep: () => void;
  onSubmit: (e?: any) => void;
  disabledStep?: boolean;
}

export default function CreateRefundStep({
  formData,
  updateData,
  prevStep,
  nextStep,
  onSubmit, // Note: This might be less used now if we handle submit internally
  disabledStep = false,
}: Props) {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RefundFormData>({
    mode: "onChange",
    defaultValues: {
      email: formData.email || "",
      name: formData.name || "",
      dob: formData.dob || "",
      state: formData.state || "",
      phone: formData.phone || "",
      address: formData.address || "",
      gender: formData.gender || "",
    },
  });

  const [_, setServerError] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { profile, fetchProfile, loading: profileLoading, error: profileError } = useProfileStore();
  const profileId = localStorage.getItem("profileId");

  // Sync RHF values to parent state (optional, but keeps formData up to date)
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        // Handle file separately if needed or just pass value
        if (name === 'customerImage') {
          const img = value.customerImage;
          if (img instanceof FileList && img.length > 0) {
            updateData(name, img[0]);
          } else if (img instanceof File) {
            updateData(name, img);
          }
        } else {
          updateData(name, value[name as keyof RefundFormData]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateData]);

  // Fetch profile on mount
  useEffect(() => {
    if (profileId) {
      fetchProfile(Number(profileId));
    }
  }, [fetchProfile, profileId]);

  // Prefill form with profile data
  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email || "",
        name: profile.name || "",
        dob: profile.dateOfBirth || "",
        state: profile.state || "",
        phone: profile.phone || "",
        address: profile.address || "",
        gender: profile.gender || "",

        // Image is usually not prefilled as a File object
      });

      // Also update parent
      if (profile.email) updateData("email", profile.email);
      if (profile.name) updateData("name", profile.name);
      if (profile.dateOfBirth) updateData("dob", profile.dateOfBirth);
      if (profile.state) updateData("state", profile.state);
      if (profile.phone) updateData("phone", profile.phone);
      if (profile.address) updateData("address", profile.address);
      if (profile.gender) updateData("gender", profile.gender);
    }
  }, [profile, reset, updateData]);

  const onFormSubmit: SubmitHandler<RefundFormData> = async (data) => {
    setServerError({});
    setGeneralError(null);

    try {
      // Prepare payload for backend
      const formDataPayload = new FormData();
      formDataPayload.append("email", data.email || "");
      formDataPayload.append("name", data.name || "");
      formDataPayload.append("phone", data.phone || "");
      formDataPayload.append("state", data.state || "");
      formDataPayload.append("gender", data.gender || "");
      formDataPayload.append("address", data.address || "");
      if (data.dob) formDataPayload.append("dateOfBirth", data.dob);

      // Handle File
      if (data.customerImage instanceof FileList && data.customerImage.length > 0) {
        formDataPayload.append('customerImage', data.customerImage[0]);
      } else if (data.customerImage instanceof File) {
        formDataPayload.append('customerImage', data.customerImage);
      }

      const response = await api.post(`/profile/create`, formDataPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log(response.data);

      if (response.data.data?.data?.id) {
        localStorage.setItem("profileId", response.data.data?.data?.id);
        fetchProfile(response.data.data?.data?.id);
      }

      // Logic to proceed
      if (onSubmit) onSubmit(); // Trigger parent submit logic if valid
      nextStep();

    } catch (err: any) {
      if (err.response?.data?.errors) {
        // Assuming backend returns array of validation errors
        // We can try to map them to fields manually if needed
        setGeneralError("Validation failed. Please check inputs.");
      } else {
        setGeneralError(err.response?.data?.message || "Failed to save profile");
      }
    }
  };

  // Determine if we can proceed (Prefilled or Submitted)
  // With RHF, we usually check if submitted successfully, or if profile is loaded.
  // The 'Next' button logic might rely on successful submission.
  const isProfileLoaded = Boolean(profile?.id);
  const canProceedToNext = isProfileLoaded || isSubmitSuccessful;

  // Disable inputs if profile is loaded or already submitted successfully
  const isDisabled = disabledStep || (isSubmitSuccessful && !!profileId) || isProfileLoaded;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full max-w-md sm:max-w-lg mx-auto p-4 sm:p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl transition-all duration-300">
      {profileLoading && (
        <div className="flex items-center justify-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 rounded-lg shadow-md">
          <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4H4m4 4h4m4-4h4m-4-4v4" />
          </svg>
          <span className="font-medium">Loading Profile...</span>
        </div>
      )}
      {profileError && (
        <div className="flex items-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
          <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Error</span>: {profileError}
        </div>
      )}
      {generalError && (
        <div className="flex items-center p-2 sm:p-4 mb-4 sm:mb-6 bg-gradient-to-r from-red-50 to-red-100 text-red-800 rounded-lg border-l-4 border-red-400 shadow-md animate-fade-in">
          <svg className="w-4 sm:w-6 h-4 sm:h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Error</span>: {generalError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:gap-6">

        {/* Email Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">Email *</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            disabled={isDisabled}
            className={`mt-1 block w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Email Address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">Name *</label>
          <input
            {...register("name", { required: "Name is required" })}
            disabled={isDisabled}
            className={`mt-1 block w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Customer Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">Customer Image *</label>
          <input
            type="file"
            accept="image/*"
            {...register("customerImage", {
              required: !profileId ? "Customer image is required" : false
            })}
            disabled={isDisabled}
            className={`mt-1 block w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 transition-all duration-200 ${errors.customerImage ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.customerImage && <p className="text-red-500 text-sm mt-1">{errors.customerImage.message}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">Date of Birth *</label>
          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
            disabled={isDisabled}
            className={`mt-1 block w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 transition-all duration-200 ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">State *</label>
          <input
            {...register("state", { required: "State is required" })}
            disabled={isDisabled}
            className={`mt-1 block w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 transition-all duration-200 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="State"
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">Phone Number *</label>
          <input
            {...register("phone", {
              required: "Phone Number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits"
              }
            })}
            disabled={isDisabled}
            className={`mt-1 block w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 transition-all duration-200 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="10-digit number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">Gender *</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            disabled={isDisabled}
            className={`mt-1 block w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 transition-all duration-200 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-800">Address *</label>
          <textarea
            {...register("address", { required: "Address is required" })}
            disabled={isDisabled}
            className={`mt-1 block w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 transition-all duration-200 resize-y ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            rows={4}
            placeholder="Full address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            type="submit"
            disabled={isDisabled || isSubmitting}
            className={`w-full px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center ${isDisabled || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 hover:shadow-xl active:scale-95"
              }`}
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 mr-3 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Submit"}
          </button>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 px-4 py-3 bg-slate-200 rounded-lg text-slate-800 font-semibold text-lg shadow-md hover:bg-slate-300 hover:shadow-lg transition-all active:scale-95"
            >
              Previous
            </button>

            <button
              type="button"
              // When clicking next here, we assume form is already submitted or prefilled. 
              // If not, we could trigger handleSubmit, but usually this is just navigation.
              onClick={() => {
                nextStep();
              }}
              disabled={!canProceedToNext}
              className={`flex-1 px-4 py-3 rounded-lg text-white font-semibold text-lg shadow-md transition-all duration-300 ${!canProceedToNext
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
                }`}
            >
              Next
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("profileId");
              window.location.reload();
            }}
            className="mt-4 text-gray-500 hover:text-teal-600 font-medium text-sm sm:text-base transition-colors duration-200 underline block mx-auto cursor-pointer"
          >
            Check another profile with different email?
          </button>
        </div>

      </div>
    </form>
  );
}