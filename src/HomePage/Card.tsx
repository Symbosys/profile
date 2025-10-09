// //import React from "react";
// import {useState}  from "react";
// import PhoneVerification from "../pages/PhoneVerification";
// import CardVerification from "../pages/CardVerification";
// import MedicalKitChange from "../pages/MedicalKitChange"
// import PoliceVerificationChange from "../pages/PoliceVerificationChange";
// import NOCChange from "../pages/NOC Change";
// import LocationVerificationChange from "../pages/LocationVerificationChange(Area)";
// import SecretarySafetyChange from "../pages/SecretarySafetyChange";
// import JoiningFormChange from "../pages/JoiningFormChange";
// import EnquiryVerificationChange from "../pages/EnquiryVerificationChange";
// import IncomeGSTChange from "../pages/IncomeGSTChange";
// // ... import other steps similarly

// const steps = [
//   "Phone Number Verification",
//   "Card Verification Change",
//   "Medical Kit Change",
//   "Police Verification Change",
//   "NOC Change",
//   "Location Verification Change (Area)",
//   "Secretary Safety Change",
//   "Joining Form Change",
//   "Enquiry Verification Change",
//   "Income GST Change",
// ];

// export default function Card() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({});

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     if (currentStep > 0) setCurrentStep(currentStep - 1);
//   };

//   const handlePreview = (stepIndex) => {
//     setCurrentStep(stepIndex);
//   };

//   const updateData = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <PhoneVerification
//             nextStep={nextStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 1:
//         return (
//           <CardVerification
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 2:
//         return (
//           <MedicalKitChange
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 3:
//         return (
//           <PoliceVerificationChange
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 4:
//         return (
//           <NOCChange
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 5:
//         return (
//           <LocationVerificationChange
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 6:
//         return (
//           <SecretarySafetyChange
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 7:
//         return (
//           <JoiningFormChange
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 8:
//         return (
//           <EnquiryVerificationChange
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       case 9:
//         return (
//           <IncomeGSTChange
//             nextStep={nextStep}
//             prevStep={prevStep}
//             updateData={updateData}
//             formData={formData}
//           />
//         );
//       // add other steps similarly
//       default:
//         return <div>All steps completed!</div>;
//     }
//   };

//   return (
//     <div >
//       <div className="text-center bg-blue-600 text-3xl mt-10 h-16 p-4 text-white font-bold">
//         <h1 >Form-Carrd </h1>
//       </div>



//       {/* gdfhjdgkgf */}
//       <div className="flex justify-center items-center ">
//         <div className=" w-[600px]  p-6  rounded border  ">
//           <h1 className="text-2xl font-bold  text-center ">{steps[currentStep]}</h1>
//           {renderStep()}
//           {/* <div className="flex justify-between mt-5"> */}
//             {/* {currentStep > 0 && (
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={prevStep}
//               >
//                 Previous
//               </button>
//             )} */}
//             {/* {currentStep < steps.length - 1 && (
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={nextStep}
//               >
//                 Next
//               </button>
//             )} */}
//           {/* </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
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

// steps
const steps: string[] = [
  "Phone Number Verification",
  "Card Verification Change",
  "Medical Kit Change",
  "Police Verification Change",
  "NOC Change",
  "Location Verification Change (Area)",
  "Secretary Safety Change",
  "Joining Form Change",
  "Enquiry Verification Change",
  "Income GST Change",
];

export default function Card() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Removed handlePreview since it was unused ✅

  const updateData = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PhoneVerification
            nextStep={nextStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 1:
        return (
          <CardVerification
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 2:
        return (
          <MedicalKitChange
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 3:
        return (
          <PoliceVerificationChange
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 4:
        return (
          <NOCChange
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 5:
        return (
          <LocationVerificationChange
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 6:
        return (
          <SecretarySafetyChange
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 7:
        return (
          <JoiningFormChange
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 8:
        return (
          <EnquiryVerificationChange
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      case 9:
        return (
          <IncomeGSTChange
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            formData={formData}
          />
        );
      default:
        return <div>All steps completed!</div>;
    }
  };

  return (
    <div>
      <div className="text-center bg-blue-600 text-3xl mt-10 h-16 p-4 text-white font-bold">
        <h1>Form-Card</h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-[600px] p-6 rounded border">
          <h1 className="text-2xl font-bold text-center">
            {steps[currentStep]}
          </h1>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
