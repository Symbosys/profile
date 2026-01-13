

// import { useRef } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import html2pdf from "html2pdf.js";

// // Import images
// import NocLogo from "../../assets/noc/Noc Logo.jpg";
// import DirectorSignature from "../../assets/escorsts/playboy-logo.jpeg";
// import AuthorizedSignature from "../../assets/escorsts/escort-signature.jpeg";
// import NotaryStamp from "../../assets/escorsts/escort-mohar.jpeg";
// import type { Profile } from "../../store/profile"; 


// const Noc = ({profile}: {profile: Profile | null}) => {
//   const printRef = useRef<HTMLDivElement>(null);

//   // Hardcoded Data (Edit here)
//   const formData = {
//     date: "2025-03-12",
//     refNumber: "N723-50C40",
//     recipientName: profile?.name ?? "",
//     totalAmount: "404600.00",
//     nocCharges: "7572.00",
//   };

//   const formatDateForDisplay = (dateString: string) => {
//     const [year, month, day] = dateString.split("-");
//     return `${day}/${month}/${year}`;
//   };

//   const calculateSubTotal = () => {
//     const total = parseFloat(formData.totalAmount) || 0;
//     const charges = parseFloat(formData.nocCharges) || 0;
//     return (total + charges).toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const handlePrint = () => {
//     if (printRef.current) {
//       console.log("Generating PDF..."); // Debug log; remove after testing
//       setTimeout(() => {
//         const element = printRef.current!;
//         const opt = {
//           margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
//           filename: `NOC_Certificate_${formData.refNumber}.pdf`,
//           image: { type: "jpeg", quality: 0.98 },
//           html2canvas: { 
//             scale: 2, 
//             useCORS: true,
//             allowTaint: true, // Handle potential cross-origin images
//             logging: false // Suppress extra logs
//           },
//           jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
//         };
//         html2pdf().set(opt).from(element).save();
//       }, 1000); // Delay to ensure images and styles load
//     } else {
//       console.error("Print ref is null!"); // Debug if ref fails
//     }
//   };

//   return (
//     <div className="w-full bg-background py-4 sm:py-8">
//       <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
//         <Card className="shadow-xl">
//           <CardContent>
//             <div
//               ref={printRef}
//               className="w-full max-w-[700px] mx-auto"
//               style={{ 
//                 backgroundColor: 'white',
//                 padding: '1.5rem',
//                 boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg equivalent
//                 fontFamily: 'sans-serif'
//               }}
//             >
//               {/* Header */}
//               <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
//                 <img src={NocLogo} alt="NOC Logo" className="w-32 sm:w-40 h-auto mb-2 sm:mb-3" />
//                 <h1 
//                   className="text-xl sm:text-2xl font-extrabold uppercase"
//                   style={{ color: '#F89406' }} // Inline orange
//                 >
//                   NO OBJECTION CERTIFICATE
//                 </h1>
//                 <p 
//                   className="text-xs sm:text-sm font-medium mt-1 leading-tight uppercase"
//                   style={{ color: '#374151' }} // gray-700 hex fallback
//                 >
//                   OFFICE OF THE DIRECTORATE OF <br />
//                   itsecortservice.com
//                 </p>
//               </div>

//               {/* Date + Ref */}
//               <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-medium mb-2 sm:mb-4 gap-2 sm:gap-0">
//                 <p>DATE: {formatDateForDisplay(formData.date)}</p>
//                 <p>REF NO: {formData.refNumber}</p>
//               </div>

//               {/* Subject */}
//               <div 
//                 className="font-semibold text-xs sm:text-sm uppercase mb-4 sm:mb-6 pb-1"
//                 style={{ 
//                   color: '#F89406', // Inline orange
//                   borderBottom: '1px solid #F89406' // Inline border
//                 }}
//               >
//                 SUBJ:- REQUESTED DO NOT OBJECT
//               </div>

//               {/* Body */}
//               <div className="text-xs sm:text-sm uppercase leading-relaxed" style={{ color: '#1f2937' }}> {/* gray-800 hex fallback */}
//                 <p className="mb-2 sm:mb-3">RESPECTED SIR,</p>

//                 <p className="mb-2 sm:mb-3">
//                   THIS IS WITH REFERENCE TO MR/MRS.{" "}
//                   <span 
//                     className="px-1"
//                     style={{ 
//                       borderBottom: '1px solid #F89406', // Inline underline
//                       color: '#1f2937'
//                     }}
//                   >
//                     {formData.recipientName}
//                   </span>
//                 </p>

//                 <p className="mb-2 sm:mb-3">
//                   THE AMOUNT IS DELIVERED AFTER THE COMPLETION OF ALL REGULATIONS
//                   OF THE DEPARTMENT AND HE/SHE HAS CLEARED ALL GOVT TAXES. I
//                   REQUEST THE INCOME TAX DEPARTMENT NOT TO INQUIRE OR OBJECT.
//                 </p>

//                 <p className="mb-1">
//                   Total Amount: ₹ {parseFloat(formData.totalAmount).toLocaleString("en-IN")}
//                 </p>

//                 <p className="mb-1">
//                   NOC Charges: ₹ {parseFloat(formData.nocCharges).toLocaleString("en-IN")}
//                 </p>

//                 <p className="font-bold mt-2">
//                   Sub-Total Amount: ₹ {calculateSubTotal()}
//                 </p>

//                 <p className="text-right font-semibold mt-4 sm:mt-6">THANKS A LOT</p>
//               </div>

//               {/* Footer */}
//               <div className="flex flex-col sm:flex-row justify-between items-end mt-8 sm:mt-12 px-2 sm:px-8 gap-2 sm:gap-0">
//                 <img src={DirectorSignature} alt="Director Signature" className="h-16 sm:h-20 object-contain mx-auto sm:mx-0" />
//                 <img src={NotaryStamp} alt="Notary Stamp" className="h-24 sm:h-32 object-contain mx-auto sm:mx-0" />
//                 <img src={AuthorizedSignature} alt="Authorized Signature" className="h-16 sm:h-20 object-contain mx-auto sm:mx-0" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Download PDF Button */}
//       <div className="flex justify-center mt-4 sm:mt-6">
//         <Button
//           onClick={handlePrint}
//           className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition-all"
//         >
//           Download PDF
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Noc;


import html2pdf from "html2pdf.js";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

// Import images
import NotaryStamp from "../../assets/escorsts/escort-mohar.jpeg";
import DirectorSignature from "../../assets/escorsts/playboy-logo.jpeg";
import NocLogo from "../../assets/noc/Noc Logo.jpg";
import type { Profile } from "../../store/profile";

import NocSignature from "../../assets/noc/noc_signature.jpeg";
import type { PaymentFees } from "../../hook/useFee";


const Noc = ({profile, fee}: {profile: Profile | null, fee: PaymentFees | null}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState("2025-03-12");

  // Hardcoded Data (Edit here)
  const formData = {
    date: selectedDate,
    refNumber: "N723-50C40",
    recipientName: profile?.name ?? "",
    totalAmount: Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee),
    nocCharges: Number(fee?.nocFee),
  };

  const formatDateForDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const calculateSubTotal = () => {
    const total = parseFloat(String(formData.totalAmount)) || 0;
    const charges = parseFloat(String(formData.nocCharges)) || 0;
    return (total + charges).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePrint = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `NOC_Certificate_${formData.refNumber}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true,
            allowTaint: true, // Handle potential cross-origin images
            logging: false // Suppress extra logs
          },
          jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
        };
        html2pdf().set(opt).from(element).save();
      }, 1000); // Delay to ensure images and styles load
    } else {
      console.error("Print ref is null!"); // Debug if ref fails
    }
  };

  return (
    <div className="w-full bg-background py-4 sm:py-8">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
        <div className="mb-4 text-center">
          <label htmlFor="date-input" className="block text-sm font-medium mb-2">
            Select Date:
          </label>
          <input
            id="date-input"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Card className="shadow-xl">
          <CardContent>
            <div
              ref={printRef}
              className="w-full max-w-[700px] mx-auto"
              style={{ 
                backgroundColor: 'white',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg equivalent
                fontFamily: 'sans-serif'
              }}
            >
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                <img src={NocLogo} alt="NOC Logo" className="w-32 sm:w-40 h-auto mb-2 sm:mb-3" />
                <h1 
                  className="text-xl sm:text-2xl font-extrabold uppercase"
                  style={{ color: '#F89406' }} // Inline orange
                >
                  NO OBJECTION CERTIFICATE
                </h1>
                <p 
                  className="text-xs sm:text-sm font-medium mt-1 leading-tight uppercase"
                  style={{ color: '#374151' }} // gray-700 hex fallback
                >
                  OFFICE OF THE DIRECTORATE OF <br />
                  itsecortservice.com
                </p>
              </div>

              {/* Date + Ref */}
              <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-medium mb-2 sm:mb-4 gap-2 sm:gap-0">
                <p>DATE: {formatDateForDisplay(formData.date)}</p>
                <p>REF NO: {formData.refNumber}</p>
              </div>

              {/* Subject */}
              <div 
                className="font-semibold text-xs sm:text-sm uppercase mb-4 sm:mb-6 pb-1"
                style={{ 
                  color: '#F89406', // Inline orange
                  borderBottom: '1px solid #F89406' // Inline border
                }}
              >
                SUBJ:- REQUESTED DO NOT OBJECT
              </div>

              {/* Body */}
              <div className="text-xs sm:text-sm uppercase leading-relaxed" style={{ color: '#1f2937' }}> {/* gray-800 hex fallback */}
                <p className="mb-2 sm:mb-3">RESPECTED SIR,</p>

                <p className="mb-2 sm:mb-3">
                  THIS IS WITH REFERENCE TO MR/MRS.{" "}
                  <span 
                    className="px-1"
                    style={{ 
                      borderBottom: '1px solid #F89406', // Inline underline
                      color: '#1f2937'
                    }}
                  >
                    {formData.recipientName}
                  </span>
                </p>

                <p className="mb-2 sm:mb-3">
                  THE AMOUNT IS DELIVERED AFTER THE COMPLETION OF ALL REGULATIONS
                  OF THE DEPARTMENT AND HE/SHE HAS CLEARED ALL GOVT TAXES. I
                  REQUEST THE INCOME TAX DEPARTMENT NOT TO INQUIRE OR OBJECT.
                </p>

                <p className="mb-1">
                  Total Amount: ₹ {parseFloat(String(formData.totalAmount)).toLocaleString("en-IN")}
                </p>

                <p className="mb-1">
                  NOC Charges: ₹ {parseFloat(String(formData.nocCharges)).toLocaleString("en-IN")}
                </p>

                <p className="font-bold mt-2">
                  Sub-Total Amount: ₹ {calculateSubTotal()}
                </p>

                <div className="text-center flex justify-center items-center flex-col mb-4 sm:mb-6">
                  <h3 className="font-semibold mt-6 sm:mt-8 mb-2 sm:mb-3">
                    Refund Policy / वापसी नीति:
                  </h3>

                  <p
                    className="text-xs text-center sm:text-sm"
                    style={{ textAlign: "justify" }}
                  >
                    Refundable – ({Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee) + Number(fee?.nocFee)}) The full amount will be returned to the
                    client upon successful completion of the service.
                  </p>

                  <p
                    className="text-xs text-center sm:text-sm"
                    style={{ textAlign: "justify" }}
                  >
                    वापसी योग्य – सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक
                    को लौटा दी जाएगी।
                  </p>
                </div>

                <p className="text-right font-semibold mt-4 sm:mt-6">THANKS A LOT</p>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-end mt-8 sm:mt-12 px-2 sm:px-8 gap-2 sm:gap-0">
                <img src={DirectorSignature} alt="Director Signature" className="h-16 sm:h-20 object-contain mx-auto sm:mx-0" />
                <img src={NotaryStamp} alt="Notary Stamp" className="h-24 sm:h-32 object-contain mx-auto sm:mx-0" />
                <img src={NocSignature} alt="Authorized Signature" className="h-16 sm:h-20 object-contain mx-auto sm:mx-0" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download PDF Button */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <Button
          onClick={handlePrint}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition-all"
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default Noc; 