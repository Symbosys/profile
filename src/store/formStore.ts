import { create } from "zustand";

interface FormState {
  currentStep: number;
  formData: Record<string, any>;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: any) => void;
  setStep: (step: number) => void;
}

export const useFormStore = create<FormState>((set) => ({
  currentStep: 0,
  formData: {},
  nextStep: () => set((state) => ({
    currentStep: state.currentStep < 11 ? state.currentStep + 1 : state.currentStep, // Changed < 10 to < 11
  })),
  prevStep: () => set((state) => ({
    currentStep: state.currentStep > 0 ? state.currentStep - 1 : state.currentStep,
  })),
  updateData: (key, value) => set((state) => ({
    formData: { ...state.formData, [key]: value },
  })),
  setStep: (step) => set({ currentStep: step }),
}));