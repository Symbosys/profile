
import { useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import html2pdf from "html2pdf.js";
import GstMohar from "../../assets/gst/IMG-20250324-WA0030.jpg";
import Signature from "../../assets/escorsts/escort-signature.jpeg";

const GstDocument: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded Invoice Data (Change These Values)
  const formData = {
    billTo: "ABC Pvt Ltd",
    companyName: "XYZ Enterprises",
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
    <div className="w-full bg-background py-8">
      <div className="container w-full mx-auto preview-wrapper">
        <Card className="shadow-xl">
          <CardContent>
            <div 
              ref={printRef} 
              className="print-card font-sans"
              style={{ 
                backgroundColor: 'white',
                padding: '1.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg equivalent
                fontFamily: 'sans-serif'
              }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h1 
                  className="text-2xl font-extrabold uppercase"
                  style={{ color: '#F89406' }} // text-[#F89406] inline
                >
                  Goods and Services Tax Council
                </h1>
              </div>

              {/* Bill Information */}
              <div 
                className="flex justify-between pb-3 mb-3 text-sm"
                style={{ 
                  borderBottom: '1px solid black', // border-b border-black
                  color: 'black'
                }}
              >
                <div>
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
              <table 
                className="w-full border-collapse mb-6"
                style={{ borderCollapse: 'collapse' }}
              >
                <thead>
                  <tr 
                    style={{ 
                      backgroundColor: '#3b82f6', // bg-blue-500 hex fallback
                      color: 'white'
                    }}
                  >
                    <th>#</th>
                    <th>Item</th>
                    <th>Total Amount</th>
                    <th>GST</th>
                    <th>Final Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ border: '1px solid black' }}>
                    <td>1</td>
                    <td>Goods & Service Tax</td>
                    <td>₹{parseFloat(formData.amount).toLocaleString("en-IN")}</td>
                    <td>{formData.taxRate}% (₹{parseFloat(taxAmount).toLocaleString("en-IN")})</td>
                    <td>₹{parseFloat(totalAmount).toLocaleString("en-IN")}</td>
                  </tr>
                </tbody>
              </table>

              {/* Tax Breakdown */}
              <table 
                className="w-full border-collapse mb-6"
                style={{ borderCollapse: 'collapse' }}
              >
                <thead>
                  <tr 
                    style={{ 
                      backgroundColor: '#10b981', // bg-green-500 hex fallback
                      color: 'white'
                    }}
                  >
                    <th>Tax Type</th>
                    <th>Taxable Amount</th>
                    <th>Rate</th>
                    <th>Tax Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ border: '1px solid black' }}>
                    <td>SGST</td>
                    <td>₹{formData.amount}</td>
                    <td>{formData.taxRate}%</td>
                    <td>₹{taxAmount}</td>
                  </tr>
                  <tr style={{ border: '1px solid black' }}>
                    <td>CGST</td>
                    <td>₹{formData.amount}</td>
                    <td>{formData.taxRate}%</td>
                    <td>₹{taxAmount}</td>
                  </tr>
                </tbody>
              </table>

              {/* Total */}
              <p className="font-bold text-lg">Total Payable Amount: ₹{parseFloat(totalAmount).toLocaleString("en-IN")}</p>

              {/* Description */}
              <div className="mt-4 text-sm">
                <p className="font-bold mb-1">Description:</p>
                <p>{formData.description}</p>
              </div>

              {/* Footer */}
              <div className="text-center mt-8">
                <p className="font-bold">सत्यमेव जयते</p>
                <p>Goods and Services Tax</p>
                <div className="flex justify-between mt-4">
                  <img src={GstMohar} className="w-28" alt="GST Mohar" />
                  <img src={Signature} className="w-24" alt="Signature" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-6">
        <Button 
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:scale-105" 
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