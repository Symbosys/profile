import { useRef, useState } from "react";
import { Button } from "../ui/button";
import html2pdf from "html2pdf.js";
import type { Profile } from "../../store/profile";
import HotelLogo from "../../assets/hotel/hotelBooking.jpeg";
import type { PaymentFees } from "../../hook/useFee";

interface HotelBookingChargeNoticeProps {
  profile: Profile | null | undefined;
  fee: PaymentFees | null;
}

const HotelBookingChargeNotice = ({
  profile,
  fee,
}: HotelBookingChargeNoticeProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [hotelName, setHotelName] = useState("Royal Orchid Grand Hotel");

  const currentDateStr = new Date().toISOString().split("T")[0];

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formData = {
    issuedTo: profile?.name || "Guest User",
    mobile: profile?.phone || "N/A",
    hotelName: hotelName,
    bookingDate: formatDate(currentDateStr),
    bookingAmount: fee?.hotelBookingFee || "₹3,500",
    issuedBy: "Hotel Reservation Department",
    issueDate: formatDate(currentDateStr),
  };

  const handlePrint = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `Hotel_Booking_Charge_Notice_${formData.issuedTo}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(opt).from(element).save();
      }, 500);
    } else {
      console.error("Print ref is null!"); // Debug if ref fails
    }
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#f9fafb", paddingTop: "1rem", paddingBottom: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "56rem", margin: "0 auto", padding: "0.5rem" }}>
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <label
            htmlFor="hotel-input"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}
          >
            Hotel Name:
          </label>
          <input
            id="hotel-input"
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 12px",
              outline: "none",
              transition: "box-shadow 0.2s",
              width: "100%",
              maxWidth: "300px"
            }}
            onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #3b82f6"}
            onBlur={(e) => e.target.style.boxShadow = "none"}
          />
        </div>
        <div style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
          <div>
            <div
              ref={printRef}
              style={{ 
                minHeight: "600px",
                backgroundColor: "#ffffff",
                border: "2px solid #e5e7eb",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "2rem",
                fontFamily: "serif"
              }}
            >
              {/* Header Section */}
              <div style={{ textAlign: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "2px solid #d1d5db" }}>
                <img
                  src={HotelLogo}
                  alt="Hotel Logo"
                  style={{ display: "block", margin: "0 auto 1rem", height: "112px", width: "auto" }}
                />
                <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.25rem", letterSpacing: "0.05em" }}>
                  HOTEL BOOKING CHARGE
                </h1>
                <h2 style={{ fontSize: "1rem", fontWeight: "600", color: "#4b5563", marginBottom: "0.75rem" }}>
                  Information Notice
                </h2>
                <div style={{ fontSize: "0.875rem", color: "#374151" }}>
                  <p style={{ marginBottom: "0.25rem" }}>Document Date: <strong>{formatDate(currentDateStr)}</strong></p>
                  <p>Reference: <strong>HBC-{new Date().getTime().toString().slice(-6)}</strong></p>
                </div>
              </div>

              {/* Description Section */}
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.75", color: "#1f2937", textAlign: "justify", fontFamily: "serif" }}>
                  The Hotel Booking Charge is required to ensure confirmation and
                  guarantee of the reserved room. This charge is collected as a
                  commitment amount to secure your booking and to allocate the
                  required resources such as room arrangements, guest amenities,
                  and reservation processing. Once confirmed, the hotel ensures
                  priority check-in and full assurance of the scheduled stay.
                </p>
              </div>

              {/* Details Section */}
              <div style={{ marginBottom: "2rem", backgroundColor: "#f3f4f6", border: "2px solid #9ca3af", padding: "1.25rem", borderRadius: "0.5rem" }}>
                <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Booking Details
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem", fontSize: "0.875rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #d1d5db", paddingBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "600", color: "#374151" }}>Issued To:</span>
                    <span style={{ color: "#111827" }}>{formData.issuedTo}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #d1d5db", paddingBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "600", color: "#374151" }}>Mobile Number:</span>
                    <span style={{ color: "#111827" }}>{formData.mobile}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #d1d5db", paddingBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "600", color: "#374151" }}>Hotel Name:</span>
                    <span style={{ color: "#111827" }}>{formData.hotelName}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #d1d5db", paddingBottom: "0.5rem" }}>
                    <span style={{ fontWeight: "600", color: "#374151" }}>Booking Date:</span>
                    <span style={{ color: "#111827" }}>{formData.bookingDate}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.5rem", backgroundColor: "#fef3c7", padding: "0.5rem", borderRadius: "0.25rem" }}>
                    <span style={{ fontWeight: "bold", color: "#1f2937" }}>Booking Charge Amount:</span>
                    <span style={{ fontWeight: "bold", color: "#F89406", fontSize: "1.125rem" }}>{formData.bookingAmount}</span>
                  </div>
                </div>
              </div>

              {/* Refund Policy Section */}
              <div style={{ marginBottom: "2rem", backgroundColor: "#eff6ff", border: "2px solid #93c5fd", padding: "1.25rem", borderRadius: "0.5rem" }}>
                <h3 style={{ fontWeight: "bold", fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Refund Policy / वापसी नीति
                </h3>
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  <p style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "justify", lineHeight: "1.5" }}>
                    <strong>Refundable:</strong> ({Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee)}) The full amount will be returned to the
                    client upon successful completion of the service.
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#1f2937", textAlign: "justify", lineHeight: "1.5" }}>
                    <strong>वापसी योग्य:</strong> सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक
                    को लौटा दी जाएगी।
                  </p>
                </div>
              </div>

              {/* Footer Section */}
              <div style={{ paddingTop: "1.5rem", borderTop: "2px solid #d1d5db", textAlign: "center", fontSize: "0.875rem" }}>
                <p style={{ marginBottom: "0.5rem", color: "#374151" }}>
                  <strong>Issued By:</strong> {formData.issuedBy}
                </p>
                <p style={{ marginBottom: "1rem", color: "#374151" }}>
                  <strong>Date:</strong> {formData.issueDate}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#4b5563", fontStyle: "italic" }}>
                  This is an official document. Please retain for your records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
        <Button
          style={{ 
            backgroundColor: "#b45309",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500"
          }}
          onClick={handlePrint}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default HotelBookingChargeNotice;

// import { useRef, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import html2pdf from "html2pdf.js";
// import type { Profile } from "../../store/profile";

// interface HotelBookingChargeNoticeProps {
//   profile: Profile | null | undefined;
// }

// const HotelBookingChargeNotice = (profile: HotelBookingChargeNoticeProps) => {
//   const printRef = useRef<HTMLDivElement>(null);
//   const [selectedDate, setSelectedDate] = useState("2025-03-25");

//   const formatDate = (dateString: string): string => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const formData = {
//     issuedTo: profile.profile?.name || "Guest User",
//     mobile: profile.profile?.phone || "N/A",
//     hotelName: "Royal Orchid Grand Hotel",
//     bookingDate: formatDate(selectedDate),
//     bookingAmount: "₹3,500",
//     issuedBy: "Hotel Reservation Department",
//     issueDate: formatDate(selectedDate),
//   };

//   const handlePrint = () => {
//     if (printRef.current) {
//       setTimeout(() => {
//         const element = printRef.current!;
//         const opt = {
//           margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
//           filename: `Hotel_Booking_Charge_Notice_${formData.issuedTo}.pdf`,
//           image: { type: "jpeg", quality: 0.98 },
//           html2canvas: { scale: 2, useCORS: true },
//           jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
//         };

//         html2pdf().set(opt).from(element).save();
//       }, 500);
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

//         <Card className="shadow-xl">
//           <CardContent>
//             <div
//               ref={printRef}
//               className="bg-white p-4 sm:p-6 shadow-lg font-sans print-card relative overflow-hidden"
//             >

//               {/* ⭐ REAL WATERMARK (WORKS IN PDF) ⭐ */}
//               <img
//                 src="/playboy.png.jpeg"
//                 alt="watermark"
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   width: "100%",
//                   height: "100%",
//                   opacity: 0.15,         // 🔥 watermark transparency
//                   pointerEvents: "none",
//                   zIndex: 0,
//                 }}
//               />

//               {/* All content above watermark */}
//               <div style={{ position: "relative", zIndex: 10 }}>
//                 <div className="text-center mb-4 sm:mb-6">
//                   <h1 className="text-xl sm:text-2xl font-extrabold text-[#F89406] uppercase">
//                     Hotel Booking Charge Information Notice
//                   </h1>
//                 </div>

//                 <p className="text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
//                   The Hotel Booking Charge is required to ensure confirmation and guarantee of the reserved room.
//                   This charge is collected as a commitment amount to secure your booking and to allocate the required
//                   resources such as room arrangements, guest amenities, and reservation processing. Once confirmed,
//                   the hotel ensures priority check-in and full assurance of the scheduled stay.
//                 </p>

//                 <div className="border border-black p-2 sm:p-4 text-xs sm:text-sm mb-4">
//                   <p><strong>Issued To:</strong> {formData.issuedTo}</p>
//                   <p><strong>Mobile Number:</strong> {formData.mobile}</p>
//                   <p><strong>Hotel Name:</strong> {formData.hotelName}</p>
//                   <p><strong>Booking Date:</strong> {formData.bookingDate}</p>
//                   <p><strong>Booking Charge Amount:</strong> {formData.bookingAmount}</p>
//                 </div>

//                 <div className="text-center mt-4 sm:mt-8 text-xs sm:text-sm">
//                   <p><strong>Issued By:</strong> {formData.issuedBy}</p>
//                   <p><strong>Date:</strong> {formData.issueDate}</p>
//                 </div>
//               </div>

//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="flex justify-center mt-4 sm:mt-6">
//         <Button
//           className="bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105"
//           onClick={handlePrint}
//         >
//           Download PDF
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default HotelBookingChargeNotice;
