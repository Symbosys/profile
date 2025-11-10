import { type FormEvent } from "react";
import PhoneVerification from "../pages/PhoneVerification";
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

// Step titles
const steps: string[] = [
  "Phone Number Verification",
  "Profile Verification",
  "Card Verification Change",
  "HotelBooking",
  "Medical Kit Change",
  "Police Verification Change",
  "NOC Change",
  "Location Verification Change (Area)",
  "Secretary Safety Change",
  "Joining Form Change",
  "Enquiry Verification Change",
  "Income GST Change",
];

// Step components array
const stepComponents = [
  PhoneVerification,
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
  const { currentStep, formData, nextStep, prevStep, updateData } = useFormStore();

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
      <div className="text-center bg-blue-600 text-3xl mt-10 h-16 p-4 text-white font-bold">
        <h1>Profile Verification</h1>
      </div>

      {/* Form Card */}
      <div className="flex justify-center items-center">
        <div className="w-[600px] p-6 ">
          <h1 className="text-2xl font-bold text-center">{steps[currentStep]}</h1>

          <StepComponent
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
 