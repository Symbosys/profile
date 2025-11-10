
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";

const HotelBookingChargeNotice: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const formData = {
    issuedTo: "Mr. Manish",
    mobile: "9876543210",
    hotelName: "Royal Orchid Grand Hotel",
    bookingDate: "25/03/2025",
    bookingAmount: "₹3,500",
    issuedBy: "Hotel Reservation Department",
    issueDate: "24/03/2025",
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
    <div className="w-full bg-background py-8">
      <div className="container w-full mx-auto preview-wrapper">
        <Card className="shadow-xl">
          <CardContent>
            <div ref={printRef} className="bg-white p-6 shadow-lg font-sans print-card">
              
              <div className="text-center mb-6">
                <h1 className="text-2xl font-extrabold text-[#F89406] uppercase">
                  Hotel Booking Charge Information Notice
                </h1>
              </div>

              <p className="text-sm leading-6 mb-4">
                The Hotel Booking Charge is required to ensure confirmation and guarantee of the reserved room. 
                This charge is collected as a commitment amount to secure your booking and to allocate the required 
                resources such as room arrangements, guest amenities, and reservation processing. Once confirmed, 
                the hotel ensures priority check-in and full assurance of the scheduled stay.
              </p>

              <div className="border border-black p-4 text-sm mb-4">
                <p><strong>Issued To:</strong> {formData.issuedTo}</p>
                <p><strong>Mobile Number:</strong> {formData.mobile}</p>
                <p><strong>Hotel Name:</strong> {formData.hotelName}</p>
                <p><strong>Booking Date:</strong> {formData.bookingDate}</p>
                <p><strong>Booking Charge Amount:</strong> {formData.bookingAmount}</p>
              </div>

              <div className="text-center mt-8 text-sm">
                <p><strong>Issued By:</strong> {formData.issuedBy}</p>
                <p><strong>Date:</strong> {formData.issueDate}</p>

                {/* Signature removed */}
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-6">
        <Button className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:scale-105" onClick={handlePrint}>
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default HotelBookingChargeNotice;