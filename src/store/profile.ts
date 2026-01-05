// src/store/profile.ts
import { create } from 'zustand';
import api from '../api/api';
import { AxiosError } from 'axios';

interface ImageData {
  uploaded: boolean;
  public_id: string;
  url: string;
  secure_url?: string;
}

export interface Profile {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  state?: string;
  address?: string;
  website?: string;
  upi?: string;
  url?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  bankName?: string;

  customerImage?: ImageData | null;

  // ----------  IMAGE FIELDS ----------
  cardVerification?: ImageData | null;
  carVefificationStatus: string;          // <-- exact DB column
  hotelBooking?: ImageData | null;
  hotelBookingStatus: string;
  medicalKit?: ImageData | null;
  medicalKitStatus: string;
  policeVerification?: ImageData | null;
  policeVerificationStatus: string;
  nocChange?: ImageData | null;
  nocChangeStatus: string;
  locationVerificationChangeArea?: ImageData | null;
  locationVerificationChangeAreaStatus: string;
  secretarySafetyChange?: ImageData | null;
  secretarySafetyChangeStatus: string;
  enquiryVerificationChange?: ImageData | null;
  enquiryVerificationChangeStatus: string;
  incomeGstChange?: ImageData | null;
  incomeGstChangeStatus: string;
  phoneVerification?: ImageData | null;
  phoneVerificationVerifiedStatus: string;
  joiningFromChange?: ImageData | null;
  joiningFromChangeStatus: string;
  currentStep: number;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: (profileId: number) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async (profileId: number) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/profile/${profileId}`);
      set({ profile: response.data.data, loading: false, error: null });
    } catch (err: any) {
      if(err instanceof  AxiosError) {
        if(err.response?.status === 404) {
          localStorage.removeItem("profileId");
          window.location.reload();
        }
      }
      set({
        error: err.response?.data?.message || 'Failed to fetch profile',
        loading: false,
        profile: null,
      });
    }
  },
}));