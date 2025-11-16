import { create } from "zustand";
import { toast } from "sonner";
import api from "../api/api";

// Define the shape of the payment fees data
interface PaymentFees {
  cardVerificationFee: string;
  hotelBookingFee: string;
  medicalKitFee: string;
  policeVerificationFee: string;
  nocFee: string;
  locationVerificationFee: string;
  secretarySafetyFee: string;
  enquiryVerificationFee: string;
  incomeGstFee: string;
  phoneVerificationFee: string;
  joiningFromFee: string;
}

// Define the Zustand store interface
interface PaymentStore {
  fees: PaymentFees | null;
  loading: boolean;
  fetchFees: () => Promise<void>;
  updateFees: (fees: PaymentFees) => Promise<void>;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  fees: null,
  loading: false,

  // Fetch payment fees data from backend
  fetchFees: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/fee/payment-fees");
      set({ fees: res.data.data, loading: false });
    } catch (error: any) {
      toast.error("Error fetching payment fee. Please try again.");
      set({ loading: false });
    }
  },

  // Update payment fees data on backend
  updateFees: async (fees: PaymentFees) => {
    try {
      set({ loading: true });
      await api.put("/fee/payment-fees", fees, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Payment fee updated successfully");
      // Refetch to ensure store is up-to-date
      await get().fetchFees();
    } catch (error: any) {
      toast.error("Error updating payment fee. Please try again.");
      set({ loading: false });
    }
  },
}));