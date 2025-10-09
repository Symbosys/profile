// import type { FormEvent } from "react";
// import { useFormStore } from "../store/formStore"; // Adjust path as needed

// interface PhoneVerificationProps {
//   nextStep: () => void;
//   updateData: (key: string, value: unknown) => void;
//   formData: {
//     phone?: string;
//     [key: string]: unknown;
//   };
// }

// export default function PhoneVerification({
//   nextStep,
//   updateData,
//   formData,
// }: PhoneVerificationProps) {
//   const { phone, setPhone } = useFormStore();

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!phone || phone.trim() === "") {
//       alert("Please enter your phone number");
//       return;
//     }

//     updateData("phone", phone);
//     nextStep(); // proceed to next step after saving phone number
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-[300px]">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 justify-center items-center w-[80%]"
//       >
//         <div className="flex w-full items-center gap-2">
//           <input
//             type="text"
//             placeholder="Enter phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="flex-1 border border-gray-400 p-2 rounded-lg bg-gray-100"
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-400"
//           >
//             Continue
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import { useState, type FormEvent } from "react";

interface PhoneVerificationProps {
  nextStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    phone?: string;
    otp?: string;
    [key: string]: unknown;
  };
}

export default function PhoneVerification({
  nextStep,
  updateData,
  formData,
}: PhoneVerificationProps) {
  const [phone, setPhone] = useState(formData.phone || "");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otpSent) {
      // First step: send OTP
      updateData("phone", phone);
      setOtpSent(true);
      alert("OTP sent!"); // Replace with actual API
    } else {
      // Second step: verify OTP
      updateData("otp", otp);
      nextStep();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[300px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center w-[80%]"
      >
        {/* Phone Input + Send OTP Button */}
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            disabled={otpSent} // disable after OTP is sent
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 border border-gray-400 p-2 rounded-lg bg-gray-100 disabled:bg-gray-200"
          />
          {!otpSent && (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-400"
            >
              Send OTP
            </button>
          )}
        </div>

        {/* OTP Input + Verify Button */}
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            disabled={!otpSent}
            onChange={(e) => setOtp(e.target.value)}
            className="flex-1 border border-gray-400 p-2 rounded-lg bg-gray-100 disabled:bg-gray-200"
          />
          {otpSent && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-400"
            >
              Verify OTP
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
