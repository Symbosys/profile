import { create } from 'zustand';
import api from '../api/api';

interface Profile {
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
  file?: string;
  carVefificationStatus: string;
  medicalKitStatus: string;
  policeVerificationStatus: string;
  nocChangeStatus: string;
  locationVerificationChangeAreaStatus: string;
  secretarySafetyChangeStatus: string;
  enquiryVerificationChangeStatus: string;
  incomeGstChangeStatus: string;
  phoneVerificationVerifiedStatus: string;
  joiningFromChangeStatus: string;
}

interface ProfileUpdateState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (profileId: number, updatedData: Partial<Profile>) => Promise<void>;
}

export const useProfileUpdateStore = create<ProfileUpdateState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  updateProfile: async (profileId: number, updatedData: Partial<Profile>) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/profile/${profileId}`, updatedData);
      set({ profile: response.data.data, loading: false, error: null });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to update profile',
        loading: false,
        profile: null,
      });
    }
  },
}));