
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";

interface FormData {
  date: string;
  applicantName: string;
  permanentAddress: string;
  yearsKnown: string;
  refereeSignature: string;
  refereeTelephone: string;
  refereeName: string;
  refereeAddress: string;
  refereeOccupation: string;
  visitorsAccountNo: string;
  refereeType: string;
  memberNumber: string;
  companyName: string;
}

const ReferenceVerificationDocument: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const [formData] = useState<FormData>({
    date: new Date().toISOString().split("T")[0],
    applicantName: "John Doe",
    permanentAddress: "123 Main Street, Kingston, Jamaica",
    yearsKnown: "5 Years",
    refereeSignature: "",
    refereeTelephone: "876-555-1234",
    refereeName: "Dr. Michael Smith",
    refereeAddress: "21 Hope Road, Kingston",
    refereeOccupation: "Medical Doctor",
    visitorsAccountNo: "",
    refereeType: "Medical Doctor",
    memberNumber: "VM-102938",
    companyName: "Victoria Mutual",
  });

  const handleDownload = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `Reference_Verification_${formData.memberNumber}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true,
            allowTaint: true, // Added to handle potential cross-origin issues with images/colors
            logging: false // Suppress extra logs
          },
          jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
        };
        html2pdf().set(opt).from(element).save();
      }, 500); // Delay to account for rendering
    } else {
      console.error("Print ref is null!"); // Debug if ref fails
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="w-full bg-background min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        {/* Document */}
        <div 
          ref={printRef} 
          className="print-certificate"
          style={{ 
            backgroundColor: 'white',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-2xl equivalent
            border: '1px solid #d1d5db', // border border-gray-300 hex
            fontFamily: 'sans-serif' // Fallback font
          }}
        >

          <div 
            className="text-white p-4 relative"
            style={{ 
              background: 'linear-gradient(to right, #dc2626, #b91c1c)', // from-red-600 to-red-700 hex
              color: 'white'
            }}
          >
            <div className="text-center">
              <div 
                className="px-4 py-2 rounded inline-block font-bold text-sm"
                style={{ 
                  backgroundColor: '#991b1b', // bg-red-800 hex
                  color: 'white'
                }}
              >
                REFERENCE AND ADDRESS VERIFICATION FORM
              </div>
            </div>

            <div className="absolute right-4 top-4">
              <div className="text-right text-xs font-bold">Date: {formatDate(formData.date)}</div>
            </div>
          </div>

          <div style={{ padding: '1.5rem' }}> {/* p-6 inline */}
            <div className="flex items-center mb-6">
              <div 
                className="font-bold text-lg mr-4"
                style={{ color: '#dc2626' }} // text-red-600 hex
              >
                {formData.companyName}
              </div>
              <div 
                className="flex-1"
                style={{ color: '#4b5563', fontSize: '0.75rem' }} // text-xs text-gray-600 hex
              >
                For every financial step we take
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <strong>Dear Sir/s,</strong>

              <div className="flex items-center space-x-2">
                <span>I declare that</span>
                <div 
                  className="flex-1 px-2"
                  style={{ borderBottom: '1px solid black' }} // border-b border-black
                >
                  {formData.applicantName}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <span>whose permanent address is</span>
                <div 
                  className="flex-1 px-2 whitespace-pre-wrap"
                  style={{ borderBottom: '1px solid black' }} // border-b border-black
                >
                  {formData.permanentAddress}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span>has been personally known to me for the past</span>
                <div 
                  className="px-2 min-w-[100px]"
                  style={{ borderBottom: '1px solid black' }} // border-b border-black
                >
                  {formData.yearsKnown}
                </div>
                <span>years/months.</span>
              </div>

              <div className="leading-relaxed">
                The individual is fit and proper to conduct business.
              </div>

              <div className="mt-8">Yours faithfully,</div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <div 
                    className="h-12 mb-2"
                    style={{ borderBottom: '1px solid black' }} // border-b border-black
                  ></div>
                  <div className="text-xs">(Signature of Referee)</div>
                </div>
                <div>
                  <div 
                    className="h-12 mb-2"
                    style={{ borderBottom: '1px solid black' }} // border-b border-black
                  ></div>
                  <div className="text-xs">(Telephone of Referee)</div>
                </div>
              </div>

              <div className="mt-6">
                <div 
                  className="h-12 mb-2"
                  style={{ borderBottom: '1px solid black' }} // border-b border-black
                ></div>
                <div className="text-xs">(Name of Referee)</div>
              </div>

              <div className="mt-6">
                <div className="font-bold mb-2">Address of Referee</div>
                <div 
                  className="h-24 p-2 whitespace-pre-wrap"
                  style={{ border: '1px solid black' }} // border border-black
                >
                  {formData.refereeAddress}
                </div>
              </div>
            </div>

            <div 
              className="p-2 text-xs text-center"
              style={{ 
                backgroundColor: '#dc2626', // bg-red-600 hex
                color: 'white'
              }}
            >
              Toll Free USA: 1-866-866-8827 • UK 0-800-096-8067 • Email: manager@vmbs.com
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceVerificationDocument;