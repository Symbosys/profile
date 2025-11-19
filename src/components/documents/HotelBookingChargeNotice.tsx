import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";
import type { Profile } from "../../store/profile";
import HotelLogo from "../../assets/hotel/hotelBooking.jpeg";

interface HotelBookingChargeNoticeProps {
  profile: Profile | null | undefined;
  fee: string;
}

const HotelBookingChargeNotice = ({ profile, fee }: HotelBookingChargeNoticeProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [hotelName, setHotelName] = useState("Royal Orchid Grand Hotel");

  const currentDateStr = new Date().toISOString().split('T')[0];

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
    bookingAmount: fee || "₹3,500",
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
    <div className="w-full bg-background py-4 sm:py-8">
      <div className="w-full max-w-2xl mx-auto p-2 sm:p-0">
        <div className="mb-4 text-center">
          <label htmlFor="hotel-input" className="block text-sm font-medium mb-2">
            Hotel Name:
          </label>
          <input
            id="hotel-input"
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Card className="shadow-xl">
          <CardContent>
            <div ref={printRef} className="bg-white p-4 sm:p-6 shadow-lg font-sans print-card">
              
              <div className="text-center mb-4 sm:mb-6">
                <img 
                  src={HotelLogo}
                  alt="Hotel Logo" 
                  className="mx-auto mb-4 h-20 w-auto" 
                />
                <p className="text-sm sm:text-base mb-2">
                  Date: {formatDate(currentDateStr)}
                </p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#F89406] uppercase">
                  Hotel Booking Charge Information Notice
                </h1>
              </div>

              <p className="text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                The Hotel Booking Charge is required to ensure confirmation and guarantee of the reserved room. 
                This charge is collected as a commitment amount to secure your booking and to allocate the required 
                resources such as room arrangements, guest amenities, and reservation processing. Once confirmed, 
                the hotel ensures priority check-in and full assurance of the scheduled stay.
              </p>

              <div className="border border-black p-2 sm:p-4 text-xs sm:text-sm mb-4">
                <p><strong>Issued To:</strong> {formData.issuedTo}</p>
                <p><strong>Mobile Number:</strong> {formData.mobile}</p>
                <p><strong>Hotel Name:</strong> {formData.hotelName}</p>
                <p><strong>Booking Date:</strong> {formData.bookingDate}</p>
                <p><strong>Booking Charge Amount:</strong> {formData.bookingAmount}</p>
              </div>

              <div className="text-center mt-4 sm:mt-8 text-xs sm:text-sm">
                <p><strong>Issued By:</strong> {formData.issuedBy}</p>
                <p><strong>Date:</strong> {formData.issueDate}</p>

                {/* Signature removed */}
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-4 sm:mt-6">
        <Button className="bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105" onClick={handlePrint}>
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



