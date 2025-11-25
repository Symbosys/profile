import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";
import type { Profile } from "../../store/profile";
import type { PaymentFees } from "../../hook/useFee";

const JoiningLetterDocument = ({profile, fee}: {profile: Profile | null, fee: PaymentFees | null}) => {
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded data (Edit here)
  const formData = {
    companyName: "www.itsecortservice.com",
    companyAddress: "Thane, Maharashtra",
    companyCity: "Thane, Maharashtra",
    companyPhone: profile?.phone,
    companyEmail: profile?.email,
    senderName: "Authorized Signatory",
    date: "25/11/2025",
    candidateName: profile?.name,
    candidateAddress: profile?.address,
    candidateCity: "Delhi, India",
    salary: `₹${Number(fee?.joiningFromFee) || 0} per month`,
    contractPeriod: "One Year",
  };

  const handlePrint = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `Joining_Letter_${formData?.companyPhone?.replace(/\s+/g, "_")}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true,
            allowTaint: true, // Added to handle potential cross-origin issues with images/colors
            logging: false // Suppress extra logs
          },
          jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(opt).from(element).save();
      }, 500); // Delay to ensure styles load (no images, so shorter than 1000ms)
    } else {
      console.error("Print ref is null!"); // Debug if ref fails
    }
  };

  return (
    <div className="w-full bg-background py-4 sm:py-8 flex justify-center">
      <div className="w-full max-w-[750px] px-2 sm:px-0">

        <Card className="shadow-xl">
          <CardContent>
            <div 
              ref={printRef} 
              className="w-full font-sans p-4 sm:p-6 md:p-8"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg equivalent
                fontFamily: 'sans-serif'
              }}
            >

              <div className="text-center mb-4 sm:mb-6">
                <div 
                  className="text-xs sm:text-sm mb-2 sm:mb-3"
                  style={{ color: '#ec4899' }} // text-pink-500 hex fallback
                >
                  www.itsecortservice.com
                </div>
                <h1 
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: '#ec4899' }} // text-pink-500 hex fallback
                >
                  Joining Letter Format for
                </h1>
                <h2 
                  className="text-lg sm:text-xl font-bold"
                  style={{ color: '#ec4899' }} // text-pink-500 hex fallback
                >
                  Companion & Hospitality Service
                </h2>
              </div>

              <div 
                className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 space-y-0.5 sm:space-y-1"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                <p>{formData.companyName}</p>
                <p>{formData.companyAddress}</p>
                <p>{formData.companyCity}</p>
                <p>{formData.companyPhone}</p>
                <p>{formData.companyEmail}</p>
                <p>{formData.date}</p>
              </div>

              <div 
                className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 space-y-0.5 sm:space-y-1"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                <p>{formData.candidateName}</p>
                <p>{formData.candidateAddress}</p>
                <p>{formData.candidateCity}</p>
              </div>

              <p 
                className="text-xs sm:text-sm font-semibold mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Subject: Joining Letter for the Position of Hospitality Companion
              </p>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Dear {formData.candidateName},
              </p>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                We are pleased to welcome you to <b>{formData.companyName}</b> as a Hospitality Companion. Your communication skills, personality, and professional attitude have been highly appreciated, and we are confident that you will contribute positively to our organization.
              </p>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                As per the terms of your role, your initial contract will be for a period of <b>{formData.contractPeriod}</b>. You will receive a monthly remuneration of <b>{formData.salary}</b>, along with additional allowances and benefits as per company policies.
              </p>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Your responsibilities will include:
              </p>

              <ul className="text-xs sm:text-sm mb-2 sm:mb-4 list-disc list-inside" style={{ color: '#3b82f6' }}>
                <li>Providing professional companionship during events and client engagements</li>
                <li>Maintaining confidentiality and professionalism at all times</li>
                <li>Ensuring high standards of client service and conduct</li>
                <li>Following all guidelines and protocols issued by the agency</li>
              </ul>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Please acknowledge your joining by signing and returning a copy of this letter. We look forward to working with you.
              </p>

              <div className="text-center flex justify-center items-center flex-col mb-4 sm:mb-6 text-blue-500">
                  <h3 className="font-semibold mt-6 sm:mt-8 mb-2 sm:mb-3">
                    Refund Policy / वापसी नीति:
                  </h3>

                  <p
                    className="text-xs text-center sm:text-sm"
                    style={{ textAlign: "justify" }}
                  >
                    Refundable – ({Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee) + Number(fee?.nocFee) + Number(fee?.locationVerificationFee) + Number(fee?.secretarySafetyFee) + Number(fee?.joiningFromFee)}) The full amount will be returned to the
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

              <p 
                className="text-xs sm:text-sm"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Sincerely,<br /><br />
                <b>{formData.senderName}</b><br />
                <b>{formData.companyName}</b>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-4 sm:mt-6">
          <Button
            onClick={handlePrint}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition-all">
            Download PDF
          </Button>
        </div>

      </div>
    </div>
  );
};

export default JoiningLetterDocument;