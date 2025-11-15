
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";
import type { Profile } from "../../store/profile";

const JoiningLetterDocument = ({profile}: {profile: Profile | null}) => {
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded data (Edit here)
  const formData = {
    yourName: profile?.name,
    yourAddress: profile?.address,
    yourCity: "Delhi, India",
    yourPhone: profile?.phone,
    yourEmail: profile?.email,
    recipientName: profile?.name,
    recipientAddress: profile?.address,
    recipientCity: "Delhi, India",
    collegeName: "ABC College of Arts and Science",
    departmentName: "Computer Science",
    salary: "₹45,000 / Month",
    contractPeriod: "One Year",
    date: "2025-03-25",
  };

  const handlePrint = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `Joining_Letter_${formData?.yourPhone?.replace(/\s+/g, "_")}.pdf`,
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
                  www.letterseasy.com
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
                  College Lecturer
                </h2>
              </div>

              <div 
                className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 space-y-0.5 sm:space-y-1"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                <p>{formData.yourName}</p>
                <p>{formData.yourAddress}</p>
                <p>{formData.yourCity}</p>
                <p>{formData.yourPhone}</p>
                <p>{formData.yourEmail}</p>
                <p>{formData.date}</p>
              </div>

              <div 
                className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 space-y-0.5 sm:space-y-1"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                <p>{formData.recipientName}</p>
                <p>{formData.recipientAddress}</p>
                <p>{formData.recipientCity}</p>
              </div>

              <p 
                className="text-xs sm:text-sm font-semibold mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Subject: Appointment Letter for the Position of Lecturer
              </p>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Dear {formData.recipientName},
              </p>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                It is with great pleasure that I offer you the position of Lecturer in the
                Department of <b>{formData.departmentName}</b> at <b>{formData.collegeName}</b>.
                We believe that your expertise and experience will make a valuable contribution
                to our college.
              </p>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                As per the terms of your appointment, your initial contract will be for a
                period of <b>{formData.contractPeriod}</b>. You will be paid a salary of <b>{formData.salary}</b>
                as well as other benefits and allowances as per the college policies.
              </p>

              <p 
                className="text-xs sm:text-sm mb-2 sm:mb-4"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Please review the enclosed documents and return a signed copy at the earliest.
                We look forward to welcoming you to our esteemed institution.
              </p>

              <p 
                className="text-xs sm:text-sm"
                style={{ color: '#3b82f6' }} // text-blue-500 hex fallback
              >
                Sincerely,<br /><br />
                <b>{formData.yourName}</b>
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