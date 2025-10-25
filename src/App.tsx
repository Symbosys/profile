// import React, { useState } from "react";
// import PhoneVerification from "./pages/PhoneVerification";
// import CardVerification from "./pages/CardVerification";
// import MedicalKitChange from "./pages/MedicalKitChange";
// import PoliceVerificationChange from "./pages/Police Verification Change";
// import NOCChange from "./pages/NOC Change";
// import LocationVerificationChange from "./pages/LocationVerificationChange(Area)";
// import SecretarySafetyChange from "./pages/SecretarySafetyChange";
// import JoiningFormChange from "./pages/JoiningFormChange";
// import EnquiryVerificationChange from "./pages/EnquiryVerificationChange";
// import IncomeGSTChange from "./pages/IncomeGSTChange";
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

// export default function App() {
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
//       <div className="text-center bg-blue-600 text-3xl mt-10 h-16 p-4  ">
//         <h1 >hell alfa </h1>
//       </div>



//       {/* gdfhjdgkgf */}
//       <div className="flex justify-center items-center ">
//         <div className=" w-[600px]  p-5  rounded border ">
//           <h1 className="text-2xl font-bold mb-5 text-center">{steps[currentStep]}</h1>
//           {renderStep()}
//           <div className="flex justify-between mt-5">
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
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import Gst from "./components/docs/Gst";
import Noc from "./components/docs/Noc";
import PlayBoy from "./components/docs/PlayBoy";
import GovermentStamp from "./components/docs/Stamp";
import Tds from "./components/docs/Tds";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CyberSecurityGenerator from "./components/docs/CyberSecurity";
import JoiningLetterGenerator from "./components/docs/JoiningLetter";
import NoObjectionCertificateGenerator from "./components/docs/Noc2";
import PoliceClearance from "./components/docs/PoliceVerification";
import ReferenceVerificationForm from "./components/docs/ReferenceVerification";
import StudentEnquiryFormGenerator from "./components/docs/StudentEnquiry";
import VoterIDVerificationGenerator from "./components/docs/VoterIDVerification";
// import ImageUploadStep2 from "./components/Step/ImageUploadStep2";
//import  ImageUploadStep   from "./components/Step/ImageUploadStep";
import { Home } from "./HomePage/Home";
import Card from "./HomePage/Card"


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/adminPage" element={<adminPage />} /> */}


      <Route path="/playboy" element={<PlayBoy />} />
      <Route path="/stamp" element={<GovermentStamp />} />
      <Route path="/gst" element={<Gst />} />
      <Route path="/tds" element={<Tds />} />
      <Route path="/noc" element={<Noc />} />

      {/* <Route path="/card-verification" element={<CardVerification />} /> */}
      {/* <Route path="/medical-kit" element={<MedicalKit />} /> */}

      <Route path="cyber-security" element={<CyberSecurityGenerator />} />
      <Route path="/police-verification" element={<PoliceClearance />} />
      <Route path="/reference-and-address" element={<ReferenceVerificationForm />} />
      <Route path="/joining-letter" element={<JoiningLetterGenerator />} />
      <Route path="/student-enquiry" element={<StudentEnquiryFormGenerator />} />
      <Route path="voter-id-verification" element={<VoterIDVerificationGenerator />} />
      <Route path="/noc-2" element={<NoObjectionCertificateGenerator />} />
      {/* <Route path="/image/upload" element={<ImageUploadStep />} /> */}




      
     <Route path="/card" element={<Card  />} />
    </Routes>
  </Router>
);

export default App;
