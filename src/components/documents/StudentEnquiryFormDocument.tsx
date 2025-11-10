
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";

const StudentEnquiryFormDocument: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded Data (EDIT HERE)
  const formData = {
    name: "Rohit Sharma",
    age: "18",
    educationLevel: "12th Pass",
    reasonForEnquiry: "Interested in choosing a degree program",
    courseInfo: true,
    admissionProcess: true,
    scholarshipOpportunities: false,
    preferredMethodEmail: true,
    preferredMethodPhone: false,
    bestTimeToContact: "10:00 AM - 5:00 PM",
    questionsComments: "Want to understand placement opportunities.",
    infoPacket: true,
    guidanceCounselor: false,
    campusTour: true,
  };

  const handleDownload = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `Student_Enquiry_Form_${formData.name}.pdf`,
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
    <div className="w-full bg-background py-8 flex justify-center">
      <div className="w-full max-w-[750px]">

        <Card className="shadow-xl">
          <CardContent>
            <div 
              ref={printRef} 
              className="w-full font-sans"
              style={{ 
                backgroundColor: 'white',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg equivalent
                fontFamily: 'sans-serif'
              }}
            >

              {/* Title */}
              <div className="text-center mb-6">
                <h1 
                  className="text-2xl font-bold uppercase pb-2"
                  style={{ 
                    color: '#2563eb', // text-blue-600 hex fallback
                    borderBottom: '2px solid #2563eb' // border-b-2 border-blue-600 hex
                  }}
                >
                  Student Enquiry Form
                </h1>
              </div>

              {/* Personal Information */}
              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2">Personal Information</h2>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Age:</strong> {formData.age}</p>
                <p><strong>Current Level of Education:</strong> {formData.educationLevel}</p>
              </div>

              {/* Enquiry Area */}
              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2">Enquiry Area of Interest</h2>
                <p><strong>Reason for Enquiry:</strong> {formData.reasonForEnquiry}</p>

                <div className="ml-4 mt-2">
                  <p>☐ Course Information {formData.courseInfo && "✅"}</p>
                  <p>☐ Admission Process {formData.admissionProcess && "✅"}</p>
                  <p>☐ Scholarship Opportunities {formData.scholarshipOpportunities && "✅"}</p>
                </div>
              </div>

              {/* Contact Preferences */}
              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2">Contact Preferences</h2>
                <p>
                  <strong>Preferred Method:</strong>{" "}
                  {formData.preferredMethodEmail && "Email"}{" "}
                  {formData.preferredMethodPhone && "Phone"}
                </p>
                <p><strong>Best Time to Contact:</strong> {formData.bestTimeToContact}</p>
              </div>

              {/* Questions */}
              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2">Questions or Comments</h2>
                <p>{formData.questionsComments}</p>
              </div>

              {/* Checklist */}
              <div>
                <h2 className="font-bold text-lg mb-2">Requested Items</h2>
                <div className="ml-4 mt-2">
                  <p>☐ Information Packet {formData.infoPacket && "✅"}</p>
                  <p>☐ Guidance Counselor Appointment {formData.guidanceCounselor && "✅"}</p>
                  <p>☐ Campus Tour Scheduled {formData.campusTour && "✅"}</p>
                </div>
              </div>

              {/* Footer */}
              <div 
                className="text-center text-sm mt-8 border-t pt-4"
                style={{ 
                  color: '#6b7280', // text-gray-500 hex fallback
                  borderTopColor: 'black' // border-t implicit black
                }}
              >
                <p>© 2025 Sampleforms.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all"
          >
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </Button>
        </div>

      </div>
    </div>
  );
};

export default StudentEnquiryFormDocument;