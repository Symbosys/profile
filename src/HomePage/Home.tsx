// import ImageUploadStep from "../components/Step/ImageUploadStep";
import { useNavigate } from "react-router-dom";
// import { Phone } from "lucide-react";
// import PhoneVerificationStep from "../components/Step/PhoneVerificationStep";
import Card from "./Card";

const buttons = [
  { to: "/playboy", label: "Playboy", color: "bg-blue-500 hover:bg-blue-600" },
  { to: "/stamp", label: "Stamp", color: "bg-green-500 hover:bg-green-600" },
  { to: "/gst", label: "GST", color: "bg-purple-500 hover:bg-purple-600" },
  { to: "/tds", label: "TDS", color: "bg-orange-500 hover:bg-orange-600" },
  { to: "/noc", label: "NOC", color: "bg-red-500 hover:bg-red-600" },
  // { to: "/card-verification", label: "Card Verification", color: "bg-indigo-500 hover:bg-indigo-600" },
  // { to: "/medical-kit", label: "Medical Kit", color: "bg-pink-500 hover:bg-pink-600" },
  { to: "/police-verification", label: "Police Verification", color: "bg-yellow-500 hover:bg-yellow-600" },
  // { to: "/location-verification", label: "Location Verification", color: "bg-teal-500 hover:bg-teal-600" },
  // { to: "/secretary-safety", label: "Secretary Safety", color: "bg-gray-700 hover:bg-gray-800" },
  // { to: "/joining-form", label: "Joining Form", color: "bg-lime-500 hover:bg-lime-600" },
  // { to: "/enquiry-verification", label: "Enquiry Verification", color: "bg-cyan-500 hover:bg-cyan-600" },
  // { to: "/income-gst", label: "Income GST", color: "bg-rose-500 hover:bg-rose-600" },
  // { to: "/hotel-booking", label: "Hotel Booking", color: "bg-fuchsia-500 hover:bg-fuchsia-600" },
  { to: "/joining-letter", label: "Joining Letter", color: "bg-indigo-500 hover:bg-indigo-600" },
  { to: "/student-enquiry", label: "Student Enquiry", color: "bg-indigo-500 hover:bg-indigo-600" },
  { to: "/voter-id-verification", label: "Voter ID Verification", color: "bg-indigo-500 hover:bg-indigo-600" },
  { to: "/reference-and-address", label: "Reference and Address", color: "bg-indigo-500 hover:bg-indigo-600" },
  { to: "/cyber-security", label: "Cyber Security", color: "bg-indigo-500 hover:bg-indigo-600" },
  { to: "/noc-2", label: "NOC 2", color: "bg-indigo-500 hover:bg-indigo-600" },
];
// import EmailVerification from "../components/Step/EmailVerification";

export const Home = () => {
  const navigate = useNavigate();
  const baseButtonClasses = "px-6 py-3 text-white rounded-lg shadow";

  return (
    <div>
    <div className="w-screen  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 p-5 gap-3   justify-center">
      {buttons.map(({ to, label, color }) => (
        <button
          key={to}
          onClick={() => navigate(to)}
          className={`${baseButtonClasses} ${color}`}
        >
          {label}
        </button>
      ))}
      
     
    </div>
    {/* <EmailVerification /> */}
<Card />
    
    </div>
  );
};
