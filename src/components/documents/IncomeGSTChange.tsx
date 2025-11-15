
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";
import GstMohar from "../../assets/gst/IMG-20250324-WA0030.jpg";
import Signature from "../../assets/escorsts/escort-signature.jpeg";
import type { Profile } from "../../store/profile";

const GstDocument= ({profile}: {profile: Profile | null}) => {
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded Invoice Data (Change These Values)
  const formData = {
    billTo: profile?.name ?? "",
    companyName: profile?.name ?? "XYZ Enterprises",
    gstNumber: "22AAAAA0000A1Z5",
    invoiceNumber: "INV-2024-001",
    date: "2025-03-24",
    eWayBillNumber: "9988776655",
    amount: "1000",
    taxRate: "4",
    description: "Payment towards Goods and Service Tax",
  };

  const taxAmount = ((parseFloat(formData.amount) * parseFloat(formData.taxRate)) / 100).toFixed(2);
  const totalAmount = (parseFloat(formData.amount) + parseFloat(taxAmount)).toFixed(2);

  const handlePrint = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `GST_Invoice_${formData.invoiceNumber}.pdf`,
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
      }, 1000); // Delay to account for image loading
    } else {
      console.error("Print ref is null!"); // Debug if ref fails
    }
  };

  return (
    <div className="w-full bg-background py-4 sm:py-8">
      <div className="w-full max-w-4xl mx-auto p-2 sm:p-0 preview-wrapper">
        <Card className="shadow-xl">
          <CardContent>
            <div 
              ref={printRef} 
              className="print-card font-sans p-4 sm:p-6"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg equivalent
                fontFamily: 'sans-serif'
              }}
            >
              {/* Header */}
              <div className="text-center mb-4 sm:mb-6">
                <h1 
                  className="text-xl sm:text-2xl font-extrabold uppercase"
                  style={{ color: '#F89406' }} // text-[#F89406] inline
                >
                  Goods and Services Tax Council
                </h1>
              </div>

              {/* Bill Information */}
              <div 
                className="flex flex-col sm:flex-row justify-between pb-2 sm:pb-3 mb-3 text-xs sm:text-sm"
                style={{ 
                  borderBottom: '1px solid black', // border-b border-black
                  color: 'black'
                }}
              >
                <div className="mb-2 sm:mb-0">
                  <p className="font-bold">Bill To: <span className="font-normal">{formData.billTo}</span></p>
                  <p className="font-bold">GST No: <span className="font-normal">{formData.gstNumber}</span></p>
                  <p className="font-bold">Company: <span className="font-normal">{formData.companyName}</span></p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Invoice No: <span className="font-normal">{formData.invoiceNumber}</span></p>
                  <p className="font-bold">Date: <span className="font-normal">{formData.date}</span></p>
                  <p className="font-bold">E-Way Bill: <span className="font-normal">{formData.eWayBillNumber}</span></p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mb-4 sm:mb-6">
                <table 
                  className="w-full border-collapse min-w-[400px]"
                  style={{ borderCollapse: 'collapse' }}
                >
                  <thead>
                    <tr 
                      style={{ 
                        backgroundColor: '#3b82f6', // bg-blue-500 hex fallback
                        color: 'white'
                      }}
                    >
                      <th className="p-1 sm:p-2">#</th>
                      <th className="p-1 sm:p-2">Item</th>
                      <th className="p-1 sm:p-2">Total Amount</th>
                      <th className="p-1 sm:p-2">GST</th>
                      <th className="p-1 sm:p-2">Final Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ border: '1px solid black' }}>
                      <td className="p-1 sm:p-2">1</td>
                      <td className="p-1 sm:p-2">Goods & Service Tax</td>
                      <td className="p-1 sm:p-2">₹{parseFloat(formData.amount).toLocaleString("en-IN")}</td>
                      <td className="p-1 sm:p-2">{formData.taxRate}% (₹{parseFloat(taxAmount).toLocaleString("en-IN")})</td>
                      <td className="p-1 sm:p-2">₹{parseFloat(totalAmount).toLocaleString("en-IN")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tax Breakdown */}
              <div className="overflow-x-auto mb-4 sm:mb-6">
                <table 
                  className="w-full border-collapse min-w-[400px]"
                  style={{ borderCollapse: 'collapse' }}
                >
                  <thead>
                    <tr 
                      style={{ 
                        backgroundColor: '#10b981', // bg-green-500 hex fallback
                        color: 'white'
                      }}
                    >
                      <th className="p-1 sm:p-2">Tax Type</th>
                      <th className="p-1 sm:p-2">Taxable Amount</th>
                      <th className="p-1 sm:p-2">Rate</th>
                      <th className="p-1 sm:p-2">Tax Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ border: '1px solid black' }}>
                      <td className="p-1 sm:p-2">SGST</td>
                      <td className="p-1 sm:p-2">₹{formData.amount}</td>
                      <td className="p-1 sm:p-2">{formData.taxRate}%</td>
                      <td className="p-1 sm:p-2">₹{taxAmount}</td>
                    </tr>
                    <tr style={{ border: '1px solid black' }}>
                      <td className="p-1 sm:p-2">CGST</td>
                      <td className="p-1 sm:p-2">₹{formData.amount}</td>
                      <td className="p-1 sm:p-2">{formData.taxRate}%</td>
                      <td className="p-1 sm:p-2">₹{taxAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <p className="font-bold text-base sm:text-lg">Total Payable Amount: ₹{parseFloat(totalAmount).toLocaleString("en-IN")}</p>

              {/* Description */}
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm">
                <p className="font-bold mb-1">Description:</p>
                <p>{formData.description}</p>
              </div>

              {/* Footer */}
              <div className="text-center mt-4 sm:mt-8">
                <p className="font-bold">सत्यमेव जयते</p>
                <p>Goods and Services Tax</p>
                <div className="flex flex-col sm:flex-row justify-between mt-2 sm:mt-4 gap-2 sm:gap-0">
                  <img src={GstMohar} className="w-20 sm:w-28 h-auto mx-auto sm:mx-0" alt="GST Mohar" />
                  <img src={Signature} className="w-16 sm:w-24 h-auto mx-auto sm:mx-0" alt="Signature" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <Button 
          className="bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:scale-105" 
          onClick={handlePrint}
          style={{ backgroundColor: '#ca8a04' }} // bg-yellow-600 hex fallback (for button, but since outside printRef, optional; added for consistency)
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default GstDocument;