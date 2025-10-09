
import { create } from "zustand";

interface FormState {
  phone: string;
  otp: string;
  otpSent: boolean;

  // --- Preview States ---
  cardPreview: string | null;
  medicalKitPreview: string | null;
  policePreview: string | null;
  nocPreview: string | null;
  locationPreview: string | null;
  secretaryPreview: string | null;
  joiningPreview: string | null;
  enquiryPreview: string | null;
  gstPreview: string | null;

  // --- Setters ---
  setPhone: (phone: string) => void;
  setOtp: (otp: string) => void;
  setOtpSent: (sent: boolean) => void;

  setCardPreview: (preview: string | null) => void;
  setMedicalKitPreview: (preview: string | null) => void;
  setPolicePreview: (preview: string | null) => void;
  setNocPreview: (preview: string | null) => void;
  setLocationPreview: (preview: string | null) => void;
  setSecretaryPreview: (preview: string | null) => void;
  setJoiningPreview: (preview: string | null) => void;
  setEnquiryPreview: (preview: string | null) => void;
  setGstPreview: (preview: string | null) => void;
}

export const useFormStore = create<FormState>((set) => ({
  phone: "",
  otp: "",
  otpSent: false,

  // --- Default previews ---
  cardPreview: null,
  medicalKitPreview: null,
  policePreview: null,
  nocPreview: null,
  locationPreview: null,
  secretaryPreview: null,
  joiningPreview: null,
  enquiryPreview: null,
  gstPreview: null,

  // --- Setters ---
  setPhone: (phone) => set({ phone }),
  setOtp: (otp) => set({ otp }),
  setOtpSent: (sent) => set({ otpSent: sent }),

  setCardPreview: (preview) => set({ cardPreview: preview }),
  setMedicalKitPreview: (preview) => set({ medicalKitPreview: preview }),
  setPolicePreview: (preview) => set({ policePreview: preview }),
  setNocPreview: (preview) => set({ nocPreview: preview }),
  setLocationPreview: (preview) => set({ locationPreview: preview }),
  setSecretaryPreview: (preview) => set({ secretaryPreview: preview }),
  setJoiningPreview: (preview) => set({ joiningPreview: preview }),
  setEnquiryPreview: (preview) => set({ enquiryPreview: preview }),
  setGstPreview: (preview) => set({ gstPreview: preview }),
}));
