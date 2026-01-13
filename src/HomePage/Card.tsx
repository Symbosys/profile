
import { type FormEvent } from "react";

import CardVerification from "../pages/CardVerification";
import MedicalKitChange from "../pages/MedicalKitChange";
import PoliceVerificationChange from "../pages/PoliceVerificationChange";
import NOCChange from "../pages/NOC Change";
import LocationVerificationChange from "../pages/LocationVerificationChange(Area)";
import SecretarySafetyChange from "../pages/SecretarySafetyChange";
import JoiningFormChange from "../pages/JoiningFormChange";
import EnquiryVerificationChange from "../pages/EnquiryVerificationChange";
import IncomeGSTChange from "../pages/IncomeGSTChange";
import ProfileVrification from "../pages/profileVrification";
import { useFormStore } from "../store/formStore";
import HotelBooking from "../pages/HotelBooking";
import { useEffect } from "react";
import { useProfileStore } from "../store/profile";


// Step titles
const steps: string[] = [

  "Profile Verification",
  "Card Verification Charge",
  "HotelBooking",
  "Medical Kit Charge",
  "Police Verification Change",
  "NOC Charge",
  "Location Verification Charge (Area)",
  "Secretary Safety Charge",
  "Joining Form Charge",
  "Enquiry Verification Charge",
  "Income GST Charge",
];

// Step components array
const stepComponents = [

  ProfileVrification,
  CardVerification,
  HotelBooking,
  MedicalKitChange,
  PoliceVerificationChange,
  NOCChange,
  LocationVerificationChange,
  SecretarySafetyChange,
  JoiningFormChange,
  EnquiryVerificationChange,
  IncomeGSTChange,
];

export default function Card() {
  const { currentStep, formData, nextStep, prevStep, updateData, setStep } = useFormStore();
  const { profile, fetchProfile } = useProfileStore();
  const profileId = localStorage.getItem("profileId");

  useEffect(() => {
    if (profileId) {
      fetchProfile(Number(profileId));
    }
  }, [profileId, fetchProfile]);

  useEffect(() => {
    if (profile) {
      // Only set step to profile's current step if it's currently 0 or we want to force jump to the latest available step
      // For now, let's ensure currentStep doesn't exceed profile.currentStep
      if (currentStep > profile.currentStep) {
        setStep(profile.currentStep);
      }
    }
  }, [profile, currentStep, setStep]);

  const StepComponent = stepComponents[currentStep];

  // onSubmit handler for steps that require it
  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    console.log("Form submitted!", formData);
    alert("Form submitted! Check console for data.");
    // TODO: send formData to your backend API
  };


  return (
    <div>
      {/* Header */}
      <div className="text-center bg-blue-600 text-xl sm:text-2xl lg:text-3xl mt-4 sm:mt-10 h-12 sm:h-16 p-2 sm:p-4 text-white font-bold">
        <h1>Profile Verification</h1>
      </div>

      {/* Form Card */}
      <div className="flex justify-center items-center p-2 sm:p-0">
        <div className="w-full max-w-[600px] p-4 sm:p-6 mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-center">{steps[currentStep]}</h1>

          <StepComponent
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
            onSubmit={handleSubmit}
            isAdminApproved={currentStep === 0 || (profile ? currentStep < profile.currentStep : false)}
          />
        </div>
      </div>
    </div>
  );
}
