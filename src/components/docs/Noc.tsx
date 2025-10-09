import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import { AlertCircle, Printer, FileText } from "lucide-react";
import html2pdf from "html2pdf.js";

// Import images
import NocLogo from "../../assets/noc/Noc Logo.jpg";
import DirectorSignature from "../../assets/escorsts/playboy-logo.jpeg";
import AuthorizedSignature from "../../assets/escorsts/escort-signature.jpeg";
import NotaryStamp from "../../assets/escorsts/escort-mohar.jpeg";

const Noc = () => {
  const [formData, setFormData] = useState({
    date: "",
    refNumber: "",
    recipientName: "",
    totalAmount: "",
    nocCharges: "",
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate and generate preview
  const handleGeneratePreview = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!formData.date) errors.push("Date is required.");
    if (!formData.refNumber) errors.push("Reference Number is required.");
    if (!formData.recipientName) errors.push("Recipient Name is required.");
    if (!formData.totalAmount) errors.push("Total Amount is required.");
    if (!formData.nocCharges) errors.push("NOC Charges are required.");

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setShowPreview(true);
  };

  // Calculate Sub-Total Amount
  const calculateSubTotal = () => {
    const total = parseFloat(formData.totalAmount.replace(/,/g, "")) || 0
    const charges = parseFloat(formData.nocCharges.replace(/,/g, "")) || 0;
    return (total + charges).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Format the date for display (e.g., "2025-03-11" to "11/03/2025")
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Handle PDF generation
  const handlePrint = () => {
    if (printRef.current) {
      const element = printRef.current;
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
        filename: `NOC_Certificate_${formData.refNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, width: 750 },
        jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .catch((err: unknown) => console.error("PDF generation failed:", err));
    }
  };

  return (
    <div className="w-full bg-background dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
      <div className="container">
        {/* Form Section */}
        <div className="max-w-lg mx-auto py-8">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 text-center">
            Generate NOC Certificate
          </h2>
          <Card className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gold/30 dark:border-gold/50 rounded-lg shadow-lg">
            <CardContent className="p-3">
              <form onSubmit={handleGeneratePreview}>
                <div className="space-y-4">
                  {/* Date */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="date"
                      className="text-blue-900 dark:text-blue-300 font-semibold"
                    >
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={cn(
                        "bg-white/50 dark:bg-gray-700/50 border-gold/30 dark:border-gold/50 focus:border-gold dark:focus:border-gold rounded-lg text-gray-900 dark:text-gray-200",
                        formErrors.includes("Date is required.") &&
                          "border-destructive dark:border-red-500"
                      )}
                    />
                    {formErrors.includes("Date is required.") && (
                      <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Date is required.
                      </p>
                    )}
                  </div>

                  {/* Reference Number */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="refNumber"
                      className="text-blue-900 dark:text-blue-300 font-semibold"
                    >
                      Reference Number (e.g., N723-50C40)
                    </Label>
                    <Input
                      id="refNumber"
                      name="refNumber"
                      placeholder="Enter reference number..."
                      value={formData.refNumber}
                      onChange={handleInputChange}
                      className={cn(
                        "bg-white/50 dark:bg-gray-700/50 border-gold/30 dark:border-gold/50 focus:border-gold dark:focus:border-gold rounded-lg text-gray-900 dark:text-gray-200",
                        formErrors.includes("Reference Number is required.") &&
                          "border-destructive dark:border-red-500"
                      )}
                    />
                    {formErrors.includes("Reference Number is required.") && (
                      <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Reference Number is required.
                      </p>
                    )}
                  </div>

                  {/* Recipient Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="recipientName"
                      className="text-blue-900 dark:text-blue-300 font-semibold"
                    >
                      Recipient Name (e.g., RAVINDRA)
                    </Label>
                    <Input
                      id="recipientName"
                      name="recipientName"
                      placeholder="Enter recipient name..."
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      className={cn(
                        "bg-white/50 dark:bg-gray-700/50 border-gold/30 dark:border-gold/50 focus:border-gold dark:focus:border-gold rounded-lg text-gray-900 dark:text-gray-200",
                        formErrors.includes("Recipient Name is required.") &&
                          "border-destructive dark:border-red-500"
                      )}
                    />
                    {formErrors.includes("Recipient Name is required.") && (
                      <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Recipient Name is required.
                      </p>
                    )}
                  </div>

                  {/* Total Amount */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="totalAmount"
                      className="text-blue-900 dark:text-blue-300 font-semibold"
                    >
                      Total Amount (e.g., 404600.00)
                    </Label>
                    <Input
                      id="totalAmount"
                      name="totalAmount"
                      type="number"
                      placeholder="Enter total amount..."
                      value={formData.totalAmount}
                      onChange={handleInputChange}
                      className={cn(
                        "bg-white/50 dark:bg-gray-700/50 border-gold/30 dark:border-gold/50 focus:border-gold dark:focus:border-gold rounded-lg text-gray-900 dark:text-gray-200",
                        formErrors.includes("Total Amount is required.") &&
                          "border-destructive dark:border-red-500"
                      )}
                    />
                    {formErrors.includes("Total Amount is required.") && (
                      <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Total Amount is required.
                      </p>
                    )}
                  </div>

                  {/* NOC Charges */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="nocCharges"
                      className="text-blue-900 dark:text-blue-300 font-semibold"
                    >
                      NOC Charges (e.g., 7572.00)
                    </Label>
                    <Input
                      id="nocCharges"
                      name="nocCharges"
                      type="number"
                      placeholder="Enter NOC charges..."
                      value={formData.nocCharges}
                      onChange={handleInputChange}
                      className={cn(
                        "bg-white/50 dark:bg-gray-700/50 border-gold/30 dark:border-gold/50 focus:border-gold dark:focus:border-gold rounded-lg text-gray-900 dark:text-gray-200",
                        formErrors.includes("NOC Charges are required.") &&
                          "border-destructive dark:border-red-500"
                      )}
                    />
                    {formErrors.includes("NOC Charges are required.") && (
                      <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        NOC Charges are required.
                      </p>
                    )}
                  </div>

                  {/* Generate PDF Preview Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-md dark:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  >
                    <div className="flex items-center justify-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Generate PDF Preview
                    </div>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="container w-full mx-auto py-8 preview-wrapper">
            <div
              ref={printRef}
              className="bg-white p-6 shadow-lg relative font-sans print-card"
            >
              {/* Header */}
              <div className="header">
                <img src={NocLogo} alt="NOC Logo" className="w-48 h-20" />
                <h1>NO OBJECTION CERTIFICATE</h1>
                <p>
                  OFFICE OF THE DIRECTORATE OF<br />
                  itsecortservice.com<br />
                </p>
              </div>

              {/* Date and Reference */}
              <div className="date-ref">
                <p>DATE: {formatDateForDisplay(formData.date)}</p>
                <p>REF NO: {formData.refNumber}</p>
              </div>

              {/* Subject */}
              <div className="subject">
                SUBJ:- REQUESTED DO NOT OBJECT 
              </div>

              {/* Body */}
              <div className="body">
                <p>RESPECTED SIR,</p>
                <p>
                  THIS IS WITH REFERENCE TO MR/MRS.{" "}
                  <span className="recipient">{formData.recipientName}</span>
                </p>
                <p>
                  THE AMOUNT IS DELIVERED AFTER THE COMPLETION OF ALL REGULATIONS OF THE DEPARTMENT AND HE/SHE HAS CLEARED ALL GOVT TAXES. I REQUEST THE INCOME TAX DEPARTMENT NOT TO INQUIRE OR OBJECT.
                </p>
                <p>
                  Total Amount: ₹{" "}
                  {parseFloat(formData.totalAmount).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p>
                  NOC Charges: ₹{" "}
                  {parseFloat(formData.nocCharges).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="amount">
                  Sub-Total Amount: ₹ {calculateSubTotal()}
                </p>
                <p className="thanks">THANKS A LOT</p>
              </div>

              {/* Footer */}
              <div className="footer">
                <div className="signature-container">
                  <img
                    src={DirectorSignature}
                    alt="Director Signature"
                    className="signature-img"
                  />
                </div>
                <div className="stamp-container">
                  <img
                    src={NotaryStamp}
                    alt="Notary Stamp"
                    className="stamp"
                  />
                </div>
                <div className="signature-container">
                  <img
                    src={AuthorizedSignature}
                    alt="Authorized Signature"
                    className="signature-img"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Print Button */}
        {showPreview && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrint}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 border-2 border-yellow-700 dark:border-yellow-800 text-white hover:scale-105 transition-all duration-300 flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg dark:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            >
              <Printer className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Download PDF
            </Button>
          </div>
        )}
      </div>

      {/* Inline Styles */}
      <style>{`
        .preview-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .preview-wrapper::-webkit-scrollbar {
          display: none;
        }
        .print-card {
          width: 700px;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          position: relative;
          overflow: visible;
          font-family: Arial, sans-serif;
        }
        .dark .print-card {
          background: #1f2937;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          height: 80px;
        }
        .header img {
          width: 192px;
          height: 80px;
          object-fit: contain;
        }
        .header h1 {
          color: #F89406;
          font-size: 24px;
          font-weight: 800;
          text-transform: uppercase;
          margin: 0;
          text-align: center;
          flex: 1;
        }
        .header p {
          color: #F89406;
          font-size: 14px;
          text-transform: uppercase;
          text-align: right;
          margin: 0;
          line-height: 1.2;
          max-width: 200px;
        }
        .date-ref {
          margin-bottom: 20px;
        }
        .date-ref p {
          font-size: 14px;
          color: #000;
          margin: 5px 0;
        }
        .dark .date-ref p {
          color: #fff;
        }
        .subject {
          font-size: 14px;
          color: #F89406;
          text-transform: uppercase;
          border-bottom: 1px solid #F89406;
          padding-bottom: 2px;
          margin-bottom: 20px;
        }
        .body {
          font-size: 14px;
          color: #000;
          text-transform: uppercase;
          line-height: 1.5;
        }
        .dark .body {
          color: #fff;
        }
        .body .recipient {
          border-bottom: 1px solid #F89406;
          display: inline;
        }
        .body p {
          margin: 10px 0;
        }
        .body .amount {
          font-weight: bold;
        }
        .body .thanks {
          text-align: right;
          margin-top: 20px;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
        }
        .footer .signature-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .footer .stamp-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .footer img.signature-img {
          height: 80px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .footer img.stamp {
          height: 160px;
          width: auto;
          object-fit: contain;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Noc;