
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";

interface ProfileData {
  id: number;
  name: string;
  address: string;
  state: string;
  cardVerification?: {
    url: string;
  };
  policeVerification?: {
    url: string;
  };
}

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

interface PoliceClearanceCertificateProps {
  profile?: ProfileData | null;
}

const PoliceClearanceCertificate: React.FC<PoliceClearanceCertificateProps> = ({ profile }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const [formData] = useState<FormData>(() => {
    const today = new Date().toISOString().split('T')[0];
    const applicantName = profile?.name || "Applicant Name";
    const address = profile?.address || "";
    const state = profile?.state || "MAHARASHTRA";
    const pincode = "";
    const photoUrl = profile?.cardVerification?.url || profile?.policeVerification?.url || "";

    return {
      applicationNumber: `PCC/R/${new Date().getFullYear()}/${String(profile?.id || 0).padStart(6, '0')}`,
      applicationDate: today,
      certificateDate: today,
      applicantName,
      fatherName: "Father's Name",
      address,
      pincode,
      state,
      subject: `Verification of Character and Antecedents of ${applicantName}`,
      stationName: "Thane CP Dept",
      remarks: `With reference to above, enquiries conducted through Sr Inspector of above nagar jt. station reveals that above named applicant has no adverse record mentioned in the Allocation Form from 01/1997 to ${new Date().getFullYear()}. There is nothing adverse against the above applicant on police record during his/her stay at the given address as per police station report dated ${new Date().toLocaleDateString('en-GB')}`,
      photoUrl,
    };
  });

  const handleDownload = () => {
    if (printRef.current) {
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number], // ✅ FIXED
        filename: `PCC_${formData.applicationNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, width: 750 },
        jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }
      };
      html2pdf().set(opt).from(printRef.current).save();
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="w-full bg-background min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
        </div>

        <div
          ref={printRef}
          className="bg-white p-8 shadow-2xl border-2 border-gray-300 print-certificate"
        >
          <div className="border-2 border-black p-6">
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
                <p><strong>No. SIVR/PMPVL/24/0906/4654/2024</strong></p>
                <p><strong>Application ID :</strong> {formData.applicationNumber}</p>
                <p><strong>Date :</strong> {formatDate(formData.certificateDate)}</p>
              </div>

              <div className="w-32 h-40 border-2 border-black overflow-hidden">
                {formData.photoUrl ? (
                  <img src={formData.photoUrl} className="w-full h-full object-cover" alt="Applicant" />
                ) : (
                  <div className="text-center text-xs pt-12">Applicant Photo</div>
                )}
              </div>
            </div>

            <h2 className="text-center font-bold text-lg underline mb-6">
              POLICE CLEARANCE CERTIFICATE
            </h2>

            <p className="text-sm mb-4"><strong>To,</strong><br/>The Authorized Person<br/>Speedo business solutions pvt ltd</p>

            <p className="text-sm mb-6 text-justify">
              <strong>Subject:</strong> {formData.subject} residing at {formData.address}, Thane- {formData.pincode}, {formData.state}
            </p>

            <p className="text-sm mb-8 text-justify">{formData.remarks}</p>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm mb-2"><strong>Signature valid</strong></p>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">✓</div>
              </div>

              <div className="text-right text-sm">
                <p><strong>For Dy. Commissioner of Police</strong></p>
                <p><strong>Special Branch,</strong></p>
                <p><strong>Thane</strong></p>
              </div>
            </div>

            <div className="mt-8 text-xs text-center border-t pt-4">
              This is a digitally signed document. To verify visit:
              <br />
              <span className="font-bold text-blue-600">https://mahapolice.maharashtra.gov.in</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PoliceClearanceCertificate;
