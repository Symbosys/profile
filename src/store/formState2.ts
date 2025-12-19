import { create } from "zustand";

interface FormState {
  phone: string;
  otp: string;
  otpSent: boolean;

  // --- Preview States ---
  cardPreview: string | null;
  hotelBookingPreview: string | null;
  medicalKitPreview: string | null;
  policePreview: string | null;
  nocPreview: string | null;
  locationPreview: string | null;
  secretaryPreview: string | null;
  joiningPreview: string | null;
  enquiryPreview: string | null;
  gstPreview: string | null;

  // --- File States ---
  cardFile: File | null;
  hotelBookingFile: File | null;
  medicalKitFile: File | null;
  policeFile: File | null;
  nocFile: File | null;
  locationFile: File | null;
  secretaryFile: File | null;
  joiningFile: File | null;
  enquiryFile: File | null;
  gstFile: File | null;

  // --- Setters ---
  setPhone: (phone: string) => void;
  setOtp: (otp: string) => void;
  setOtpSent: (sent: boolean) => void;

  setCardPreview: (preview: string | null) => void;
  setHotelBookingPreview: (booking: string | null) => void;
  setMedicalKitPreview: (preview: string | null) => void;
  setPolicePreview: (preview: string | null) => void;
  setNocPreview: (preview: string | null) => void;
  setLocationPreview: (preview: string | null) => void;
  setSecretaryPreview: (preview: string | null) => void;
  setJoiningPreview: (preview: string | null) => void;
  setEnquiryPreview: (preview: string | null) => void;
  setGstPreview: (preview: string | null) => void;

  setCardFile: (file: File | null) => void;
  setMedicalKitFile: (file: File | null) => void;
  setPoliceFile: (file: File | null) => void;
  setNocFile: (file: File | null) => void;
  setLocationFile: (file: File | null) => void;
  setSecretaryFile: (file: File | null) => void;
  setJoiningFile: (file: File | null) => void;
  setEnquiryFile: (file: File | null) => void;
  setGstFile: (file: File | null) => void;
}

export const useFormStorePrev = create<FormState>((set) => ({
  phone: "",
  otp: "",
  otpSent: false,

  // --- Default previews ---
  cardPreview: null,
  hotelBookingPreview: null,
  medicalKitPreview: null,
  policePreview: null,
  nocPreview: null,
  locationPreview: null,
  secretaryPreview: null,
  joiningPreview: null,
  enquiryPreview: null,
  gstPreview: null,

  // --- Default files ---
  cardFile: null,
  hotelBookingFile: null,
  medicalKitFile: null,
  policeFile: null,
  nocFile: null,
  locationFile: null,
  secretaryFile: null,
  joiningFile: null,
  enquiryFile: null,
  gstFile: null,

  // --- Setters ---
  setPhone: (phone) => set({ phone }),
  setOtp: (otp) => set({ otp }),
  setOtpSent: (sent) => set({ otpSent: sent }),

  setCardPreview: (preview) => set({ cardPreview: preview }),
  setHotelBookingPreview: (booking) => set({ hotelBookingPreview: booking }),
  setMedicalKitPreview: (preview) => set({ medicalKitPreview: preview }),
  setPolicePreview: (preview) => set({ policePreview: preview }),
  setNocPreview: (preview) => set({ nocPreview: preview }),
  setLocationPreview: (preview) => set({ locationPreview: preview }),
  setSecretaryPreview: (preview) => set({ secretaryPreview: preview }),
  setJoiningPreview: (preview) => set({ joiningPreview: preview }),
  setEnquiryPreview: (preview) => set({ enquiryPreview: preview }),
  setGstPreview: (preview) => set({ gstPreview: preview }),

  setCardFile: (file) => set({ cardFile: file }),
  setMedicalKitFile: (file) => set({ medicalKitFile: file }),
  setPoliceFile: (file) => set({ policeFile: file }),
  setNocFile: (file) => set({ nocFile: file }),
  setLocationFile: (file) => set({ locationFile: file }),
  setSecretaryFile: (file) => set({ secretaryFile: file }),
  setJoiningFile: (file) => set({ joiningFile: file }),
  setEnquiryFile: (file) => set({ enquiryFile: file }),
  setGstFile: (file) => set({ gstFile: file }),
}));