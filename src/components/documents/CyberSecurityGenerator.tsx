import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

interface FormData {
  applicationNumber: string;
  applicationDate: string;
  certificateDate: string;
  applicantName: string;
  fatherName: string;
  address: string;
  pincode: string;
  state: string;
  subject: string;
  stationName: string;
  remarks: string;
  photoUrl: string;
}

const CyberSecurityGenerator: React.FC = () => {
  const [formData] = useState<FormData>({
    applicationNumber: "THCR1302400046815",
    applicationDate: new Date().toISOString().split("T")[0],
    certificateDate: new Date().toISOString().split("T")[0],
    applicantName: "PADIYAR MAYUR ESHWAR",
    fatherName: "Father's Name",
    address: "Senior building, room no 406, 4th floor, Khelan nagria no 3, road no 16, Ganesh chaook bhahswali, Wagle estate",
    pincode: "400604",
    state: "MAHARASHTRA",
    subject: "Verification of Character and Antecedents of PADIYAR MAYUR ESHWAR",
    stationName: "Thane CP Dept",
    remarks: "With reference to above, enquiries conducted through Sr Inspector...",
    photoUrl: ""
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (printRef.current) {
      const element = printRef.current;
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
        filename: `GST_Invoice_${formData.applicationNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, width: 750 },
        jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-GB");

  return (
    <div className="w-full bg-background min-h-screen">
      <div className="container mx-auto p-4">

        {/* Certificate Document */}
        <div
          ref={printRef}
          className="bg-white p-8 shadow-2xl border-2 border-gray-300 print-certificate"
        >
          <div className="border-2 border-black p-6">
            {/* Header Icons */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-800 rounded-full text-white flex items-center justify-center text-xs font-bold mr-4">
                  POLICE
                </div>
                <div className="w-16 h-16 bg-orange-500 rounded-full text-white flex items-center justify-center text-xs font-bold">
                  GOV 🏛
                </div>
              </div>

              <div className="text-right">
                <div className="border border-black p-2 mb-2">
                  <div className="font-mono text-xs">|||||| |||| || ||||||||</div>
                  <div className="text-xs mt-1 font-bold">PCC/R/24/600043</div>
                </div>
              </div>
            </div>

            <div className="text-center mb-6 font-bold text-sm">
              Office of the Dy.Commissioner of Police Special Branch, Thane
            </div>

            <div className="flex justify-between mb-6">
              <div className="text-sm">
                <p><strong>No. SIVR/PMPVL/90/2024</strong></p>
                <p><strong>Application ID :</strong> {formData.applicationNumber}</p>
                <p><strong>Date :</strong> {formatDate(formData.certificateDate)}</p>
              </div>

              <div className="w-32 h-40 border-2 border-black overflow-hidden bg-gray-50">
                {formData.photoUrl ? (
                  <img src={formData.photoUrl} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-xs pt-14">Applicant Photo</div>
                )}
              </div>
            </div>

            <h2 className="text-center font-bold text-lg underline mb-6">
              POLICE CLEARANCE CERTIFICATE
            </h2>

            <p className="text-sm mb-6">
              <strong>Subject:</strong> {formData.subject} residing at {formData.address}, Thane-{formData.pincode}, {formData.state}
            </p>

            <p className="text-sm mb-8 text-justify">{formData.remarks}</p>

            <div className="flex justify-between">
              <div>
                <p className="text-sm mb-2"><strong>Signature valid</strong></p>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">✓</div>
              </div>
              <div className="text-sm text-right">
                <p><strong>For Dy. Commissioner of Police</strong></p>
                <p><strong>Special Branch,</strong></p>
                <p><strong>Thane</strong></p>
              </div>
            </div>

            <div className="mt-8 text-xs text-center border-t pt-4">
              This is a digitally signed document. Verify at:
              <br /><span className="font-bold text-blue-600">https://mahapolice.maharashtra.gov.in</span>
            </div>

          </div>
        </div>

        {/* ✅ Download Button moved below the document */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg"
          >
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CyberSecurityGenerator;
