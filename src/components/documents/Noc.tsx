import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";

// Import images
import NocLogo from "../../assets/noc/Noc Logo.jpg";
import DirectorSignature from "../../assets/escorsts/playboy-logo.jpeg";
import AuthorizedSignature from "../../assets/escorsts/escort-signature.jpeg";
import NotaryStamp from "../../assets/escorsts/escort-mohar.jpeg";

const Noc = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded Data (Edit here)
  const formData = {
    date: "2025-03-12",
    refNumber: "N723-50C40",
    recipientName: "RAVINDRA",
    totalAmount: "404600.00",
    nocCharges: "7572.00",
  };

  const formatDateForDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const calculateSubTotal = () => {
    const total = parseFloat(formData.totalAmount) || 0;
    const charges = parseFloat(formData.nocCharges) || 0;
    return (total + charges).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePrint = () => {
    if (printRef.current) {
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
        filename: `NOC_Certificate_${formData.refNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, width: 750 },
        jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(opt).from(printRef.current).save();
    }
  };

  return (
    <div className="w-full bg-background py-8">
      <div className="container w-full mx-auto">
        <Card className="shadow-xl">
          <CardContent>
            <div
              ref={printRef}
              className="bg-white p-8 shadow-lg font-sans max-w-[700px] mx-auto"
            >
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <img src={NocLogo} alt="NOC Logo" className="w-40 h-auto mb-3" />
                <h1 className="text-2xl font-extrabold text-[#F89406] uppercase">
                  NO OBJECTION CERTIFICATE
                </h1>
                <p className="text-sm font-medium mt-1 leading-tight uppercase text-gray-700">
                  OFFICE OF THE DIRECTORATE OF <br />
                  itsecortservice.com
                </p>
              </div>

              {/* Date + Ref */}
              <div className="flex justify-between text-sm font-medium mb-4">
                <p>DATE: {formatDateForDisplay(formData.date)}</p>
                <p>REF NO: {formData.refNumber}</p>
              </div>

              {/* Subject */}
              <div className="text-[#F89406] border-b border-[#F89406] font-semibold text-sm uppercase mb-6 pb-1">
                SUBJ:- REQUESTED DO NOT OBJECT
              </div>

              {/* Body */}
              <div className="text-sm uppercase leading-relaxed text-gray-800">
                <p className="mb-3">RESPECTED SIR,</p>

                <p className="mb-3">
                  THIS IS WITH REFERENCE TO MR/MRS.{" "}
                  <span className="border-b border-[#F89406] px-1">
                    {formData.recipientName}
                  </span>
                </p>

                <p className="mb-3">
                  THE AMOUNT IS DELIVERED AFTER THE COMPLETION OF ALL REGULATIONS
                  OF THE DEPARTMENT AND HE/SHE HAS CLEARED ALL GOVT TAXES. I
                  REQUEST THE INCOME TAX DEPARTMENT NOT TO INQUIRE OR OBJECT.
                </p>

                <p className="mb-1">
                  Total Amount: ₹ {parseFloat(formData.totalAmount).toLocaleString("en-IN")}
                </p>

                <p className="mb-1">
                  NOC Charges: ₹ {parseFloat(formData.nocCharges).toLocaleString("en-IN")}
                </p>

                <p className="font-bold mt-2">
                  Sub-Total Amount: ₹ {calculateSubTotal()}
                </p>

                <p className="text-right font-semibold mt-6">THANKS A LOT</p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end mt-12 px-8">
                <img src={DirectorSignature} alt="Director Signature" className="h-20 object-contain" />
                <img src={NotaryStamp} alt="Notary Stamp" className="h-32 object-contain" />
                <img src={AuthorizedSignature} alt="Authorized Signature" className="h-20 object-contain" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download PDF Button */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={handlePrint}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-all"
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default Noc;
