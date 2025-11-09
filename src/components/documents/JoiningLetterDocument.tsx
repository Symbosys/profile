
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";

const JoiningLetterDocument: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded data (Edit here)
  const formData = {
    yourName: "Rahul Sharma",
    yourAddress: "123 Green Park",
    yourCity: "Delhi, India",
    yourPhone: "9876543210",
    yourEmail: "rahul@example.com",
    recipientName: "Principal",
    recipientAddress: "ABC College Campus",
    recipientCity: "Delhi, India",
    collegeName: "ABC College of Arts and Science",
    departmentName: "Computer Science",
    salary: "₹45,000 / Month",
    contractPeriod: "One Year",
    date: "2025-03-25",
  };

  const handlePrint = () => {
    if (printRef.current) {
      const element = printRef.current;
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
        filename: `Joining_Letter_${formData.yourName.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, width: 750 },
        jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="w-full bg-background py-8 flex justify-center">
      <div className="w-full max-w-[750px]">

        <Card className="shadow-xl">
          <CardContent>
            <div ref={printRef} className="bg-white p-8 shadow-lg font-sans w-full">

              <div className="text-center mb-6">
                <div className="text-pink-500 text-sm mb-3">www.letterseasy.com</div>
                <h1 className="text-2xl font-bold text-pink-500">Joining Letter Format for</h1>
                <h2 className="text-xl font-bold text-pink-500">College Lecturer</h2>
              </div>

              <div className="text-blue-500 text-sm leading-relaxed mb-6 space-y-1">
                <p>{formData.yourName}</p>
                <p>{formData.yourAddress}</p>
                <p>{formData.yourCity}</p>
                <p>{formData.yourPhone}</p>
                <p>{formData.yourEmail}</p>
                <p>{formData.date}</p>
              </div>

              <div className="text-blue-500 text-sm leading-relaxed mb-6 space-y-1">
                <p>{formData.recipientName}</p>
                <p>{formData.recipientAddress}</p>
                <p>{formData.recipientCity}</p>
              </div>

              <p className="text-blue-500 text-sm font-semibold mb-4">
                Subject: Appointment Letter for the Position of Lecturer
              </p>

              <p className="text-blue-500 text-sm mb-4">
                Dear {formData.recipientName},
              </p>

              <p className="text-blue-500 text-sm mb-4">
                It is with great pleasure that I offer you the position of Lecturer in the
                Department of <b>{formData.departmentName}</b> at <b>{formData.collegeName}</b>.
                We believe that your expertise and experience will make a valuable contribution
                to our college.
              </p>

              <p className="text-blue-500 text-sm mb-4">
                As per the terms of your appointment, your initial contract will be for a
                period of <b>{formData.contractPeriod}</b>. You will be paid a salary of <b>{formData.salary}</b>
                as well as other benefits and allowances as per the college policies.
              </p>

              <p className="text-blue-500 text-sm mb-4">
                Please review the enclosed documents and return a signed copy at the earliest.
                We look forward to welcoming you to our esteemed institution.
              </p>

              <p className="text-blue-500 text-sm">
                Sincerely,<br /><br />
                <b>{formData.yourName}</b>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handlePrint}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all">
            Download PDF
          </Button>
        </div>

      </div>
    </div>
  );
};

export default JoiningLetterDocument;
