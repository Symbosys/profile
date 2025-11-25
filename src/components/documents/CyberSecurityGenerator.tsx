
// import { useRef, useState } from "react";
// import { Button } from "../ui/button";
// import { Download } from "lucide-react";
// import html2pdf from "html2pdf.js";
// import type { Profile } from "../../store/profile"; 


// interface FormData {
//   applicationNumber: string;
//   applicationDate: string;
//   certificateDate: string;
//   applicantName: string;
//   fatherName: string;
//   address: string;
//   pincode: string;
//   state: string;
//   subject: string;
//   stationName: string;
//   remarks: string;
//   photoUrl: string;
// }

// const CyberSecurityGenerator = ({profile}: {profile: Profile | null}) =>{
//   const [formData] = useState<FormData>({
//     applicationNumber: "THCR1302400046815",
//     applicationDate: new Date().toISOString().split("T")[0],
//     certificateDate: new Date().toISOString().split("T")[0],
//     applicantName: profile?.name ?? "",
//     fatherName: "Father's Name",
//     address: profile?.address ?? "",
//     pincode: "400604",
//     state: profile?.address ?? "Maharashtra",
//     subject: "Verification of Character and Antecedents of PADIYAR MAYUR ESHWAR",
//     stationName: "Thane CP Dept",
//     remarks: "With reference to above, enquiries conducted through Sr Inspector...",
//     photoUrl: ""
//   });

//   const printRef = useRef<HTMLDivElement>(null);

//   const handleDownload = () => {
//     if (printRef.current) {
//       console.log("Generating PDF..."); // Debug log; remove after testing
//       setTimeout(() => {
//         const element = printRef.current!;
//         const opt = {
//           margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
//           filename: `PCC_${formData.applicationNumber}.pdf`, // Fixed filename to match PCC theme
//           image: { type: "jpeg", quality: 0.98 },
//           html2canvas: { 
//             scale: 2, 
//             useCORS: true,
//             allowTaint: true, // Added to handle potential cross-origin issues with images/colors
//             logging: false // Suppress extra logs
//           },
//           jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
//         };
//         html2pdf().set(opt).from(element).save();
//       }, 1000); // Increased delay to account for image loading
//     } else {
//       console.error("Print ref is null!"); // Debug if ref fails
//     }
//   };

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString("en-GB");

//   return (
//     <div className="w-full bg-background min-h-screen p-4 sm:p-6 md:p-8">
//       <div className="w-full max-w-full sm:max-w-4xl mx-auto">

//         {/* Certificate Document */}
//         <div
//           ref={printRef}
//           className="print-certificate w-full max-w-[700px] mx-auto"
//           style={{ 
//             backgroundColor: 'white',
//             padding: '1.5rem',
//             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-2xl equivalent
//             border: '2px solid #d1d5db', // border-2 border-gray-300 hex
//             fontFamily: 'sans-serif' // Fallback font
//           }}
//         >
//           <div style={{ border: '2px solid black', padding: '1rem sm:1.5rem' }}> {/* Inline inner border */}
//             {/* Header Icons */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
//               <div className="flex items-center">
//                 <div 
//                   className="w-12 sm:w-16 h-12 sm:h-16 rounded-full text-white flex items-center justify-center text-xs font-bold mr-2 sm:mr-4"
//                   style={{ 
//                     backgroundColor: '#1e40af', // bg-blue-800 hex fallback
//                     color: 'white'
//                   }}
//                 >
//                   POLICE
//                 </div>
//                 <div 
//                   className="w-12 sm:w-16 h-12 sm:h-16 rounded-full text-white flex items-center justify-center text-xs font-bold"
//                   style={{ 
//                     backgroundColor: '#f97316', // bg-orange-500 hex fallback
//                     color: 'white'
//                   }}
//                 >
//                   GOV 🏛
//                 </div>
//               </div>

//               <div className="text-right w-full sm:w-auto">
//                 <div style={{ border: '1px solid black', padding: '0.25rem sm:0.5rem', marginBottom: '0.25rem sm:0.5rem' }}> {/* Inline border */}
//                   <div className="font-mono text-xs">|||||| |||| || ||||||||</div>
//                   <div className="text-xs mt-1 font-bold">PCC/R/24/600043</div>
//                 </div>
//               </div>
//             </div>

//             <div className="text-center mb-4 sm:mb-6 font-bold text-xs sm:text-sm">
//               Office of the Dy.Commissioner of Police Special Branch, Thane
//             </div>

//             <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
//               <div className="text-xs sm:text-sm w-full sm:w-auto">
//                 <p><strong>No. SIVR/PMPVL/90/2024</strong></p>
//                 <p><strong>Application ID :</strong> {formData.applicationNumber}</p>
//                 <p><strong>Date :</strong> {formatDate(formData.certificateDate)}</p>
//               </div>

//               <div 
//                 className="w-full sm:w-32 h-32 sm:h-40 border-2 border-black overflow-hidden"
//                 style={{ 
//                   borderColor: 'black',
//                   backgroundColor: '#f9fafb' // bg-gray-50 hex
//                 }}
//               >
//                 {formData.photoUrl ? (
//                   <img src={formData.photoUrl} className="w-full h-full object-cover" alt="Applicant" />
//                 ) : (
//                   <div className="text-center text-xs pt-8 sm:pt-14">Applicant Photo</div>
//                 )}
//               </div>
//             </div>

//             <h2 className="text-center font-bold text-base sm:text-lg underline mb-4 sm:mb-6">
//               POLICE CLEARANCE CERTIFICATE
//             </h2>

//             <p className="text-xs sm:text-sm mb-4 sm:mb-6">
//               <strong>Subject:</strong> {formData.subject} residing at {formData.address}, Thane-{formData.pincode}, {formData.state}
//             </p>

//             <p className="text-xs sm:text-sm mb-6 sm:mb-8 text-justify">{formData.remarks}</p>

//             <div className="flex flex-col sm:flex-row justify-between items-end gap-2 sm:gap-0">
//               <div>
//                 <p className="text-xs sm:text-sm mb-2"><strong>Signature valid</strong></p>
//                 <div 
//                   className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center text-white text-base sm:text-lg"
//                   style={{ 
//                     backgroundColor: '#10b981', // bg-green-500 hex fallback
//                     color: 'white'
//                   }}
//                 >
//                   ✓
//                 </div>
//               </div>
//               <div className="text-right text-xs sm:text-sm">
//                 <p><strong>For Dy. Commissioner of Police</strong></p>
//                 <p><strong>Special Branch,</strong></p>
//                 <p><strong>Thane</strong></p>
//               </div>
//             </div>

//             <div className="mt-6 sm:mt-8 text-xs text-center border-t pt-2 sm:pt-4" style={{ borderTopColor: 'black' }}> {/* Inline border-top */}
//               This is a digitally signed document. Verify at:
//               <br /><span style={{ color: '#2563eb', fontWeight: 'bold' }}>https://mahapolice.maharashtra.gov.in</span>
//             </div>

//           </div>
//         </div>

//         {/* ✅ Download Button moved below the document */}
//         <div className="flex justify-center mt-4 sm:mt-6">
//           <Button
//             onClick={handleDownload}
//             className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg"
//           >
//             <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Download PDF
//           </Button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CyberSecurityGenerator;

import { useRef, useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";
import signature from '../../assets/signature.jpeg';
import type { Profile } from "../../store/profile";
import PoliceSecurity from "../../assets/saftey/secerety_saftey.jpeg";
import type { PaymentFees } from "../../hook/useFee";

interface PoliceClearanceCertificateProps {
  profile: Profile | null | undefined;
  fee: PaymentFees| null
}

const PoliceClearanceCertificate: React.FC<PoliceClearanceCertificateProps> = ({ profile, fee }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formData = useMemo(() => {
    const applicantName = profile?.name || "Applicant Name";
    const address = profile?.address || "";
    const state = profile?.state || "MAHARASHTRA";
    const pincode = "";
    const photoUrl = profile?.customerImage?.url || profile?.cardVerification?.url || "";

    return {
      applicationNumber: `SSC/R/${new Date().getFullYear()}/${String(profile?.id || 0).padStart(6, '0')}`,
      applicationDate: selectedDate,
      certificateDate: selectedDate,
      applicantName,
      fatherName: "Father's Name",
      address,
      pincode,
      state,
      subject: `Verification of Character and Antecedents of ${applicantName}`,
      stationName: "Thane Secretary Safety Dept",
      remarks: `Security और compliance clearance successfully complete होने के बाद आपकी complete responsibility हमारी company द्वारा formally assume की जाएगी।
Company आपके safety, privacy और overall facilitation को highest professional standards के अनुसार manage करेगी।
All engagements strictly हमारे corporate protocols, professional conduct guidelines और regulated safety procedures के तहत operate किए जाते हैं, जिससे हर stage पर एक secure, well-managed और dignified environment सुनिश्चित हो सके।
Your travel coordination, on-site support, logistical arrangements और आवश्यक सुविधाएँ हमारी authorised team द्वारा precision, discretion और full oversight के साथ संभाली जाएँगी।
Company का foremost commitment है कि आपको हर समय एक seamless, confidential और professionally governed experience प्रदान किया जाए, जहाँ आपकी well-being और comfort पूरी तरह protected रहे.`,
      photoUrl,
    };
  }, [selectedDate, profile]);

  const handleDownload = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `SSC_${formData.applicationNumber}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true,
            allowTaint: true, // Added to handle potential cross-origin issues with images/colors
            logging: false // Suppress extra logs
          },
          jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
        };
        html2pdf().set(opt).from(element).save();
      }, 1000); // Increased delay to account for image loading
    } else {
      console.error("Print ref is null!"); // Debug if ref fails
    }
  };

  return (
    <div className="w-full bg-background py-4 sm:py-8">
      <div className="w-full max-w-2xl mx-auto p-2 sm:p-0">
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
            <div ref={printRef} className="bg-white p-4 sm:p-6 shadow-lg font-sans print-card">
              <div style={{ border: '2px solid black', padding: '1rem' }}> {/* Inline inner border to avoid any Tailwind parsing */}
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                  <div className="flex items-center">
                    <div 
                      className="w-12 sm:w-16 h-12 sm:h-16 rounded-full text-white flex items-center justify-center text-xs font-bold mr-2 sm:mr-4"
                      style={{ 
                        backgroundColor: '#1e40af', // blue-800 hex fallback
                        color: 'white'
                      }}
                    >
                      SECRETARY
                    </div>
                    <div 
                      className="w-12 sm:w-16 h-12 sm:h-16 rounded-full text-white flex items-center justify-center text-xs font-bold"
                      style={{ 
                        backgroundColor: '#f97316', // orange-500 hex fallback
                        color: 'white'
                      }}
                    >
                      SAFETY 🏛
                    </div>
                  </div>

                  <div className="text-right w-full sm:w-auto">
                    <div style={{ border: '1px solid black', padding: '0.25rem sm:p-0.5rem', marginBottom: '0.25rem sm:mb-0.5rem' }}> {/* Inline border */}
                      <div className="font-mono text-xs">|||||| |||| || ||||||||</div>
                      <div className="text-xs mt-1 font-bold">SSC/R/24/600043</div>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4 sm:mb-6 font-bold text-xs sm:text-sm">
                  Office of the Dy.Commissioner of Secretary Safety Special Branch, Thane
                </div>

                <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                  <div className="text-xs sm:text-sm w-full sm:w-auto">
                    <p><strong>No. SIVR/PMPVL/24/0906/4654/2024</strong></p>
                    <p><strong>Application ID :</strong> {formData.applicationNumber}</p>
                    <p><strong>Date :</strong> {formatDate(formData.certificateDate)}</p>
                  </div>

                  <div className="w-full sm:w-32 h-32 sm:h-40 border-2 border-black overflow-hidden" style={{ borderColor: 'black' }}> {/* Ensure black is explicit */}
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} className="w-full h-full object-cover" alt="Applicant" />
                    ) : (
                      <div className="text-center text-xs pt-8 sm:pt-12">Applicant Photo</div>
                    )}
                  </div>
                </div>

                <h2 className="text-center font-bold text-base sm:text-lg underline mb-4 sm:mb-6">
                  SECRETARY SAFETY CERTIFICATE
                </h2>

                <p className="text-xs sm:text-sm mb-2 sm:mb-4"><strong>To,</strong><br/>The Authorized Person<br/>Speedo business solutions pvt ltd</p>

                <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-justify">
                  <strong>Subject:</strong> {formData.subject} residing at {formData.address}, Thane- {formData.pincode}, {formData.state}
                </p>

                <p className="text-xs sm:text-sm mb-6 sm:mb-8 text-justify">{formData.remarks}</p>

                <div className="text-center flex justify-center items-center flex-col mb-4 sm:mb-6">
                  <h3 className="font-semibold mt-6 sm:mt-8 mb-2 sm:mb-3">
                    Refund Policy / वापसी नीति:
                  </h3>

                  <p
                    className="text-xs text-center sm:text-sm"
                    style={{ textAlign: "justify" }}
                  >
                    Refundable – ({Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee) + Number(fee?.nocFee) + Number(fee?.locationVerificationFee) + Number(fee?.secretarySafetyFee)}) The full amount will be returned to the
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

                <div className="flex flex-col sm:flex-row justify-between items-end gap-2 sm:gap-0">
                  <div>
                    <p className="text-xs sm:text-sm mb-2"><strong>Signature valid</strong></p>
                    <img src={PoliceSecurity} className="w-32" alt="" />
                  </div>

                  <div className="text-right text-xs sm:text-sm">
                    <p><strong>For Dy. Commissioner of Secretary Safety</strong></p>
                    <p><strong>Special Branch,</strong></p>
                    <p><strong>Thane</strong></p>
                    <img src={signature} alt="Signature" className="mt-2 w-32 h-8 inline-block" />
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 text-xs text-center border-t pt-2 sm:pt-4" style={{ borderTopColor: 'black' }}> {/* Inline border-top if needed */}
                  This is a digitally signed document. To verify visit:
                  <br />
                  <span style={{ color: '#2563eb', fontWeight: 'bold' }}>https://mahapolice.maharashtra.gov.in</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-4 sm:mt-6">
        <Button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:scale-105"
        >
          <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PoliceClearanceCertificate;