// import { useRef, useState, useMemo } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import html2pdf from "html2pdf.js";
// import { Download } from "lucide-react";
// import signature from '../../assets/signature.jpeg';
// import type { Profile } from "../../store/profile";

// interface PoliceClearanceCertificateProps {
//   profile: Profile | null | undefined;
// }

// const PoliceClearanceCertificate: React.FC<PoliceClearanceCertificateProps> = ({ profile }) => {
//   const printRef = useRef<HTMLDivElement>(null);
//   const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
//   const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

//   const formatDate = (dateString: string): string => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const formData = useMemo(() => {
//     const applicantName = profile?.name || "Applicant Name";
//     const address = profile?.address || "";
//     const state = profile?.state || "MAHARASHTRA";
//     const pincode = "";
//     const photoUrl = (profile as any)?.cardVerification?.url || (profile as any)?.policeVerification?.url || "";

//     return {
//       applicationNumber: `PCC/R/${new Date().getFullYear()}/${String(profile?.id || 0).padStart(6, '0')}`,
//       applicationDate: selectedDate,
//       certificateDate: selectedDate,
//       applicantName,
//       fatherName: "Father's Name",
//       address,
//       pincode,
//       state,
//       subject: `Verification of Character and Antecedents of ${applicantName}`,
//       stationName: "Thane CP Dept",
//       remarks: `With reference to above, enquiries conducted through Sr Inspector of above nagar jt. station reveals that above named applicant has no adverse record mentioned in the Allocation Form from 01/1997 to ${new Date().getFullYear()}. There is nothing adverse against the above applicant on police record during his/her stay at the given address as per police station report dated ${formatDate(selectedDate)}`,
//       photoUrl,
//     };
//   }, [selectedDate, profile]);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedPhoto(URL.createObjectURL(file));
//     }
//   };

//   const handleDownload = () => {
//     if (printRef.current) {
//       console.log("Generating PDF..."); // Debug log; remove after testing
//       setTimeout(() => {
//         const element = printRef.current!;
//         const opt = {
//           margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
//           filename: `PCC_${formData.applicationNumber}.pdf`,
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

//   return (
//     <div className="w-full bg-background py-4 sm:py-8">
//       <div className="w-full max-w-2xl mx-auto p-2 sm:p-0">
//         <div className="mb-4 text-center">
//           <label htmlFor="date-input" className="block text-sm font-medium mb-2">
//             Select Date:
//           </label>
//           <input
//             id="date-input"
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4 text-center">
//           <label htmlFor="photo-input" className="block text-sm font-medium mb-2">
//             Select Photo:
//           </label>
//           <input
//             id="photo-input"
//             type="file"
//             accept="image/*"
//             onChange={handlePhotoUpload}
//             className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <Card className="shadow-xl">
//           <CardContent>
//             <div ref={printRef} className="bg-white p-4 sm:p-6 shadow-lg font-sans print-card">
//               <div style={{ border: '2px solid black', padding: '1rem' }}> {/* Inline inner border to avoid any Tailwind parsing */}

//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
//                   <div className="flex items-center">
//                     <div
//                       className="w-12 sm:w-16 h-12 sm:h-16 rounded-full text-white flex items-center justify-center text-xs font-bold mr-2 sm:mr-4"
//                       style={{
//                         backgroundColor: '#1e40af', // blue-800 hex fallback
//                         color: 'white'
//                       }}
//                     >
//                       POLICE
//                     </div>
//                     <div
//                       className="w-12 sm:w-16 h-12 sm:h-16 rounded-full text-white flex items-center justify-center text-xs font-bold"
//                       style={{
//                         backgroundColor: '#f97316', // orange-500 hex fallback
//                         color: 'white'
//                       }}
//                     >
//                       GOV 🏛
//                     </div>
//                   </div>

//                   <div className="text-right w-full sm:w-auto">
//                     <div style={{ border: '1px solid black', padding: '0.25rem sm:p-0.5rem', marginBottom: '0.25rem sm:mb-0.5rem' }}> {/* Inline border */}
//                       <div className="font-mono text-xs">|||||| |||| || ||||||||</div>
//                       <div className="text-xs mt-1 font-bold">PCC/R/24/600043</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-center mb-4 sm:mb-6 font-bold text-xs sm:text-sm">
//                   Office of the Dy.Commissioner of Police Special Branch, Thane
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
//                   <div className="text-xs sm:text-sm w-full sm:w-auto">
//                     <p><strong>No. SIVR/PMPVL/24/0906/4654/2024</strong></p>
//                     <p><strong>Application ID :</strong> {formData.applicationNumber}</p>
//                     <p><strong>Date :</strong> {formatDate(formData.certificateDate)}</p>
//                   </div>

//                   <div className="w-full sm:w-32 h-32 sm:h-40 border-2 border-black overflow-hidden" style={{ borderColor: 'black' }}> {/* Ensure black is explicit */}
//                     {(selectedPhoto || formData.photoUrl) ? (
//                       <img src={selectedPhoto || formData.photoUrl} className="w-full h-full object-cover" alt="Applicant" />
//                     ) : (
//                       <div className="text-center text-xs pt-8 sm:pt-12">Applicant Photo</div>
//                     )}
//                   </div>
//                 </div>

//                 <h2 className="text-center font-bold text-base sm:text-lg underline mb-4 sm:mb-6">
//                   POLICE CLEARANCE CERTIFICATE
//                 </h2>

//                 <p className="text-xs sm:text-sm mb-2 sm:mb-4"><strong>To,</strong><br/>The Authorized Person<br/>Speedo business solutions pvt ltd</p>

//                 <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-justify">
//                   <strong>Subject:</strong> {formData.subject} residing at {formData.address}, Thane- {formData.pincode}, {formData.state}
//                 </p>

//                 <p className="text-xs sm:text-sm mb-6 sm:mb-8 text-justify">{formData.remarks}</p>

//                 <div className="flex flex-col sm:flex-row justify-between items-end gap-2 sm:gap-0">
//                   <div>
//                     <p className="text-xs sm:text-sm mb-2"><strong>Signature valid</strong></p>
//                     <div
//                       className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center text-white text-base sm:text-lg"
//                       style={{
//                         backgroundColor: '#10b981', // green-500 hex fallback
//                         color: 'white'
//                       }}
//                     >
//                       ✓
//                     </div>
//                   </div>

//                   <div className="text-right text-xs sm:text-sm">
//                     <p><strong>For Dy. Commissioner of Police</strong></p>
//                     <p><strong>Special Branch,</strong></p>
//                     <p><strong>Thane</strong></p>
//                     <img src={signature} alt="Signature" className="mt-2 w-32 h-8 inline-block" />
//                   </div>
//                 </div>

//                 <div className="mt-6 sm:mt-8 text-xs text-center border-t pt-2 sm:pt-4" style={{ borderTopColor: 'black' }}> {/* Inline border-top if needed */}
//                   This is a digitally signed document. To verify visit:
//                   <br />
//                   <span style={{ color: '#2563eb', fontWeight: 'bold' }}>https://mahapolice.maharashtra.gov.in</span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="flex justify-center mt-4 sm:mt-6">
//         <Button
//           onClick={handleDownload}
//           className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:scale-105"
//         >
//           <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
//           Download PDF
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PoliceClearanceCertificate;

import { useRef, useState, useMemo } from "react";
import { Button } from "../ui/button";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";
import signature from "../../assets/signature.jpeg";
import type { Profile } from "../../store/profile";
import PoliceSecurity from "../../assets/saftey/secerety_saftey.jpeg";
import type { PaymentFees } from "../../hook/useFee";

interface PoliceClearanceCertificateProps {
  profile: Profile | null | undefined;
  fee: PaymentFees | null;
}

const PoliceClearanceCertificate: React.FC<PoliceClearanceCertificateProps> = ({
  profile,
  fee
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

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
    const photoUrl =
      profile?.customerImage?.secure_url || profile?.customerImage?.url || profile?.cardVerification?.url || "";

    return {
      applicationNumber: `PCC/R/${new Date().getFullYear()}/${String(
        profile?.id || 0
      ).padStart(6, "0")}`,
      applicationDate: selectedDate,
      certificateDate: selectedDate,
      applicantName,
      fatherName: "Father's Name",
      address,
      pincode,
      state,
      subject: `Verification of Character and Antecedents of ${applicantName}`,
      stationName: "Thane CP Dept",
      remarks: `With reference to above, enquiries conducted through Sr Inspector of above nagar jt. station reveals that above named applicant has no adverse record mentioned in the Allocation Form from 01/1997 to ${new Date().getFullYear()}. There is nothing adverse against the above applicant on police record during his/her stay at the given address as per police station report dated ${formatDate(
        selectedDate
      )}`,
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
          filename: `PCC_${formData.applicationNumber}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true, // Added to handle potential cross-origin issues with images/colors
            logging: false, // Suppress extra logs
          },
          jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
      }, 1000); // Increased delay to account for image loading
    } else {
      console.error("Print ref is null!"); // Debug if ref fails
    }
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#f9fafb", paddingTop: "1rem", paddingBottom: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "56rem", margin: "0 auto", padding: "0.5rem" }}>
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <label
            htmlFor="date-input"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}
          >
            Select Date:
          </label>
          <input
            id="date-input"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 12px",
              outline: "none"
            }}
          />
        </div>
        <div
          ref={printRef}
          style={{
            backgroundColor: "white",
            padding: "2rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "2px solid #d1d5db",
            fontFamily: "sans-serif"
          }}
        >
          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "2px solid #d1d5db" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#1e40af",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.65rem",
                    textAlign: "center",
                    padding: "0.3rem"
                  }}
                >
                  POLICE
                </div>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#f97316",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "0.65rem",
                    textAlign: "center"
                  }}
                >
                  GOV 🏛
                </div>
              </div>
              <div style={{ textAlign: "right", border: "2px solid #1f2937", padding: "0.5rem", borderRadius: "0.25rem" }}>
                <div style={{ fontFamily: "monospace", fontSize: "0.7rem" }}>|||||| |||| || ||||||||</div>
                <div style={{ fontSize: "0.7rem", fontWeight: "bold", marginTop: "0.25rem" }}>PCC/R/24/600043</div>
              </div>
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 0 0.5rem 0", color: "#1f2937", textDecoration: "underline" }}>POLICE CLEARANCE CERTIFICATE</h1>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0" }}>Office of the Dy. Commissioner of Police, Special Branch, Thane</p>
          </div>

          {/* Document Information Section */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "220px" }}>
              <p style={{ fontSize: "0.85rem", margin: "0.25rem 0", color: "#1f2937" }}><strong>No.</strong> SIVR/PMPVL/24/0906/4654/2024</p>
              <p style={{ fontSize: "0.85rem", margin: "0.25rem 0", color: "#1f2937" }}><strong>Application ID:</strong> {formData.applicationNumber}</p>
              <p style={{ fontSize: "0.85rem", margin: "0.25rem 0", color: "#1f2937" }}><strong>Date:</strong> {formatDate(formData.certificateDate)}</p>
            </div>
            {formData.photoUrl && (
              <div style={{ width: "120px", height: "150px", border: "2px solid #1f2937", overflow: "hidden" }}>
                <img
                  src={formData.photoUrl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="Applicant Photo"
                />
              </div>
            )}
          </div>

          {/* Main Content Section */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.85rem", marginBottom: "0.75rem", color: "#1f2937" }}>
              <strong>To,</strong><br />The Authorized Person<br />Speedo business solutions pvt ltd
            </p>

            <p style={{ fontSize: "0.85rem", marginBottom: "0.75rem", textAlign: "justify", color: "#1f2937" }}>
              <strong>Subject: {formData.subject}</strong><br />
              Residing at {formData.address}, Thane- {formData.pincode}, {formData.state}
            </p>

            <p style={{ fontSize: "0.85rem", textAlign: "justify", marginBottom: "1.5rem", lineHeight: "1.6", color: "#1f2937" }}>
              {formData.remarks}
            </p>
          </div>

          {/* Refund Policy Section */}
          <div style={{ backgroundColor: "#eff6ff", border: "2px solid #93c5fd", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ fontWeight: "600", marginBottom: "0.5rem", fontSize: "0.8rem", textTransform: "uppercase", margin: "0 0 0.5rem 0" }}>Refund Policy / वापसी नीति:</h3>
            <p style={{ fontSize: "0.8rem", textAlign: "justify", marginBottom: "0.5rem", color: "#1f2937", margin: "0 0 0.5rem 0" }}>
              <strong>Refundable:</strong> (₹{Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee)}) The full amount will be returned to the client upon successful completion of the service.
            </p>
            <p style={{ fontSize: "0.8rem", textAlign: "justify", color: "#1f2937", margin: "0" }}>
              <strong>वापसी योग्य:</strong> सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक को लौटा दी जाएगी।
            </p>
          </div>

          {/* Signature Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "2px solid #d1d5db" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: "600", margin: "0 0 0.5rem 0", color: "#1f2937" }}>Signature valid</p>
              <img src={PoliceSecurity} style={{ maxWidth: "80px", height: "auto" }} alt="Signature" />
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "0.85rem", fontWeight: "600", margin: "0.25rem 0", color: "#1f2937" }}>For Dy. Commissioner of Police</p>
              <p style={{ fontSize: "0.85rem", fontWeight: "600", margin: "0.25rem 0", color: "#1f2937" }}>Special Branch,</p>
              <p style={{ fontSize: "0.85rem", fontWeight: "600", margin: "0.25rem 0 0.75rem 0", color: "#1f2937" }}>Thane</p>
              <img src={signature} alt="Signature" style={{ maxWidth: "100px", height: "auto" }} />
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "2px solid #d1d5db", fontSize: "0.75rem", color: "#6b7280" }}>
            <p style={{ margin: "0" }}>This is a digitally signed document. To verify visit:</p>
            <p style={{ margin: "0.25rem 0 0 0", color: "#2563eb", fontWeight: "bold" }}>https://mahapolice.maharashtra.gov.in</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
        <Button
          onClick={handleDownload}
          style={{ backgroundColor: "#16a34a", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontSize: "1rem", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Download style={{ width: "1rem", height: "1rem" }} />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PoliceClearanceCertificate;
