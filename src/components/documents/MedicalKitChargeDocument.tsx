import { useRef } from "react";
import { Button } from "../ui/button";
import html2pdf from "html2pdf.js";
import type { Profile } from "../../store/profile";
import MedicalLogo from "../../assets/medical/medicalKit.jpeg";
import type { PaymentFees } from "../../hook/useFee";

const MedicalKitChargeDocument= ({profile, fee}: {profile: Profile | null, fee: PaymentFees | null}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!printRef.current) return;

    const element = printRef.current;
    const opt = {
      margin: 0.5,
      filename: profile?.name ?? `Medical_Kit_Charge_Details.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1rem", paddingBottom: "2rem", backgroundColor: "#f9fafb" }}>
      <div
        ref={printRef}
        style={{
          backgroundColor: "white",
          padding: "2.5rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "700px",
          textAlign: "center",
          fontFamily: "serif",
          color: "#1f2937",
          border: "2px solid #d1d5db",
          lineHeight: "1.75"
        }}
      >
        {/* Header with Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "2px solid #d1d5db" }}>
          <img 
            src={MedicalLogo} 
            alt="Company Logo" 
            style={{ display: "block", margin: "0 auto 1rem", height: "100px", width: "auto" }}
          />
          <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem", color: "#1f2937" }}>Company / Organization Name</h2>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0" }}>Medical & Wellness Services</p>
        </div>

        {/* Title Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#1f2937", letterSpacing: "0.05em" }}>SERVICE CHARGE DETAILS</h1>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0", color: "#059669" }}>Medical Kit Charge / मेडिकल किट शुल्क</h2>
        </div>

        {/* Description Section */}
        <div style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "#f0fdf4", border: "2px solid #86efac", borderRadius: "0.5rem" }}>
          <p style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "1rem" }}>Description / विवरण:</p>

          <p style={{ fontSize: "0.875rem", marginBottom: "1rem", textAlign: "justify", color: "#1f2937" }}>
            This charge covers the cost of hygiene, health, and essential wellness materials provided during
            meetings, to ensure the safety, comfort, and well-being of both clients and associates.
          </p>

          <p style={{ fontSize: "0.875rem", textAlign: "justify", color: "#1f2937" }}>
            यह शुल्क बैठक के दौरान ग्राहक और सहयोगियों की सुरक्षा, सुविधा और स्वास्थ्य सुनिश्चित करने हेतु 
            स्वच्छता, स्वास्थ्य तथा आवश्यक वेलनेस सामग्रियों की आपूर्ति की लागत को कवर करता है।
          </p>
        </div>

        {/* Included Items Section */}
        <div style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "#fef3c7", border: "2px solid #fcd34d", borderRadius: "0.5rem" }}>
          <h3 style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "1rem" }}>Included Items / शामिल सामग्री:</h3>

          <div style={{ display: "grid", gap: "0.5rem", fontSize: "0.875rem", textAlign: "left", maxWidth: "400px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <span>✓ Condom / कंडोम</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <span>✓ Energy Drink / एनर्जी ड्रिंक</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <span>✓ Scotch / सकोच</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <span>✓ Basic Medicines (Pain Relief, Antacid, First-Aid) / मूल दवाइयाँ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <span>✓ Sanitizer & Tissues / सेनिटाइज़र और टिश्यू</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <span>✓ Mask & Gloves / मास्क और दस्ताने</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>✓ Other Medical Essentials / अन्य चिकित्सीय आवश्यकताएँ</span>
            </div>
          </div>
        </div>

        {/* Refund Policy Section */}
        <div style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "#eff6ff", border: "2px solid #93c5fd", borderRadius: "0.5rem" }}>
          <h3 style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Refund Policy / वापसी नीति:</h3>

          <div style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.875rem", textAlign: "justify", marginBottom: "0.75rem", color: "#1f2937" }}>
              <strong>Refundable:</strong> (₹{Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee)}) The full amount will be returned to the client upon successful completion of the service.
            </p>

            <p style={{ fontSize: "0.875rem", textAlign: "justify", color: "#1f2937" }}>
              <strong>वापसी योग्य:</strong> सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक को लौटा दी जाएगी।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingTop: "1.5rem", borderTop: "2px solid #d1d5db", fontSize: "0.75rem", color: "#6b7280" }}>
          <p style={{ margin: "0" }}>This is an official document. Please retain for your records.</p>
        </div>
      </div>

      <Button
        onClick={handleDownloadPDF}
        style={{ marginTop: "1.5rem", backgroundColor: "#2563eb", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontSize: "1rem", fontWeight: "500" }}
      >
        Download PDF
      </Button>
    </div>
  );
};

export default MedicalKitChargeDocument;