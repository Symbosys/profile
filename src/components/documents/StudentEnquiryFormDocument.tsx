
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";
import type { Profile } from "../../store/profile"; 
import type { PaymentFees } from "../../hook/useFee";

const StudentEnquiryFormDocument = ({profile, fee}: {profile: Profile | null, fee: PaymentFees | null}) =>{
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded Data (EDIT HERE)
  const formData = {
    name: profile?.name,
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
    <div className="w-full bg-background py-4 sm:py-8 flex justify-center">
      <div className="w-full max-w-[750px]">

        <Card className="shadow-xl">
          <CardContent>
            <div 
              ref={printRef} 
              className="w-full font-sans p-4 sm:p-6"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg equivalent
                fontFamily: 'sans-serif'
              }}
            >

              {/* Title */}
              <div className="text-center mb-4 sm:mb-6">
                <h1 
                  className="text-xl sm:text-2xl font-bold uppercase pb-1 sm:pb-2"
                  style={{ 
                    color: '#2563eb', // text-blue-600 hex fallback
                    borderBottom: '2px solid #2563eb' // border-b-2 border-blue-600 hex
                  }}
                >
                  Student Enquiry Form
                </h1>
              </div>

              {/* Personal Information */}
              <div className="mb-4 sm:mb-6">
                <h2 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Personal Information</h2>
                <p className="text-sm sm:text-base"><strong>Name:</strong> {formData.name}</p>
                <p className="text-sm sm:text-base"><strong>Age:</strong> {formData.age}</p>
                <p className="text-sm sm:text-base"><strong>Current Level of Education:</strong> {formData.educationLevel}</p>
              </div>

              {/* Enquiry Area */}
              <div className="mb-4 sm:mb-6">
                <h2 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Enquiry Area of Interest</h2>
                <p className="text-sm sm:text-base"><strong>Reason for Enquiry:</strong> {formData.reasonForEnquiry}</p>

                <div className="ml-2 sm:ml-4 mt-1 sm:mt-2">
                  <p className="text-sm sm:text-base">☐ Course Information {formData.courseInfo && "✅"}</p>
                  <p className="text-sm sm:text-base">☐ Admission Process {formData.admissionProcess && "✅"}</p>
                  <p className="text-sm sm:text-base">☐ Scholarship Opportunities {formData.scholarshipOpportunities && "✅"}</p>
                </div>
              </div>

              {/* Contact Preferences */}
              <div className="mb-4 sm:mb-6">
                <h2 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Contact Preferences</h2>
                <p className="text-sm sm:text-base">
                  <strong>Preferred Method:</strong>{" "}
                  {formData.preferredMethodEmail && "Email"}{" "}
                  {formData.preferredMethodPhone && "Phone"}
                </p>
                <p className="text-sm sm:text-base"><strong>Best Time to Contact:</strong> {formData.bestTimeToContact}</p>
              </div>

              {/* Questions */}
              <div className="mb-4 sm:mb-6">
                <h2 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Questions or Comments</h2>
                <p className="text-sm sm:text-base">{formData.questionsComments}</p>
              </div>

              {/* Checklist */}
              <div>
                <h2 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Requested Items</h2>
                <div className="ml-2 sm:ml-4 mt-1 sm:mt-2">
                  <p className="text-sm sm:text-base">☐ Information Packet {formData.infoPacket && "✅"}</p>
                  <p className="text-sm sm:text-base">☐ Guidance Counselor Appointment {formData.guidanceCounselor && "✅"}</p>
                  <p className="text-sm sm:text-base">☐ Campus Tour Scheduled {formData.campusTour && "✅"}</p>
                </div>
              </div>

              <div className="text-center flex justify-center items-center flex-col mb-4 sm:mb-6">
                  <h3 className="font-semibold mt-6 sm:mt-8 mb-2 sm:mb-3">
                    Refund Policy / वापसी नीति:
                  </h3>

                  <p
                    className="text-xs text-center sm:text-sm"
                    style={{ textAlign: "justify" }}
                  >
                    Refundable – ({Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee) + Number(fee?.nocFee) + Number(fee?.locationVerificationFee) + Number(fee?.secretarySafetyFee) + Number(fee?.joiningFromFee) + Number(fee?.enquiryVerificationFee)}) The full amount will be returned to the
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

              {/* Footer */}
              <div 
                className="text-center text-xs sm:text-sm mt-4 sm:mt-8 border-t pt-2 sm:pt-4"
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

        <div className="flex justify-center mt-4 sm:mt-6">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105 transition-all"
          >
            <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Download PDF
          </Button>
        </div>

      </div>
    </div>
  );
};

export default StudentEnquiryFormDocument;