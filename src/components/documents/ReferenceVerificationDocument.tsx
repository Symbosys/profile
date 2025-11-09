import { useRef, useState } from "react";
import { Button } from "../ui/button";
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
      window.print();
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
        <div ref={printRef} className="bg-white shadow-2xl border border-gray-300 print-certificate">

          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 relative">
            <div className="text-center">
              <div className="bg-red-800 text-white px-4 py-2 rounded inline-block font-bold text-sm">
                REFERENCE AND ADDRESS VERIFICATION FORM
              </div>
            </div>

            <div className="absolute right-4 top-4">
              <div className="text-right text-xs font-bold">Date: {formatDate(formData.date)}</div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="text-red-600 font-bold text-lg mr-4">{formData.companyName}</div>
              <div className="text-xs text-gray-600 flex-1">For every financial step we take</div>
            </div>

            <div className="space-y-4 text-sm">
              <strong>Dear Sir/s,</strong>

              <div className="flex items-center space-x-2">
                <span>I declare that</span>
                <div className="border-b border-black flex-1 px-2">{formData.applicantName}</div>
              </div>

              <div className="flex items-start space-x-2">
                <span>whose permanent address is</span>
                <div className="border-b border-black flex-1 px-2 whitespace-pre-wrap">
                  {formData.permanentAddress}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span>has been personally known to me for the past</span>
                <div className="border-b border-black px-2 min-w-[100px]">{formData.yearsKnown}</div>
                <span>years/months.</span>
              </div>

              <div className="leading-relaxed">
                The individual is fit and proper to conduct business.
              </div>

              <div className="mt-8">Yours faithfully,</div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <div className="border-b border-black h-12 mb-2"></div>
                  <div className="text-xs">(Signature of Referee)</div>
                </div>
                <div>
                  <div className="border-b border-black h-12 mb-2"></div>
                  <div className="text-xs">(Telephone of Referee)</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="border-b border-black h-12 mb-2"></div>
                <div className="text-xs">(Name of Referee)</div>
              </div>

              <div className="mt-6">
                <div className="font-bold mb-2">Address of Referee</div>
                <div className="border border-black h-24 p-2 whitespace-pre-wrap">
                  {formData.refereeAddress}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-red-600 text-white p-2 text-xs text-center">
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

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-certificate, .print-certificate * { visibility: visible; }
          .print-certificate { position: absolute; left: 0; top: 0; width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default ReferenceVerificationDocument;
