import { useRef } from "react";
import html2pdf from "html2pdf.js";
import type { Profile } from "../../store/profile";
import type { PaymentFees } from "../../hook/useFee";

const JoiningLetterDocument = ({profile, fee}: {profile: Profile | null, fee: PaymentFees | null}) => {
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded data (Edit here)
  const formData = {
    companyName: "www.itsecortservice.com",
    companyAddress: "Thane, Maharashtra",
    companyCity: "Thane, Maharashtra",
    companyPhone: profile?.phone,
    companyEmail: profile?.email,
    senderName: "Authorized Signatory",
    date: "25/11/2025",
    candidateName: profile?.name,
    candidateAddress: profile?.address,
    candidateCity: "Delhi, India",
    salary: `₹${Number(fee?.joiningFromFee) || 0} per month`,
    contractPeriod: "One Year",
  };

  const handlePrint = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `Joining_Letter_${formData?.companyPhone?.replace(/\s+/g, "_")}.pdf`,
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
    <div style={{ width: "100%", backgroundColor: "#f3f4f6", paddingTop: "1rem", paddingBottom: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "750px", margin: "0 auto", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
        <div style={{ backgroundColor: "white", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", border: "2px solid #d1d5db", borderRadius: "0.75rem", overflow: "hidden" }}>
          
          <div ref={printRef} style={{ width: "100%", fontFamily: "sans-serif", padding: "2rem", backgroundColor: "white" }}>
            
            {/* Header - Company Info */}
            <div style={{ textAlign: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "2px solid #e5e7eb" }}>
              <p style={{ fontSize: "0.85rem", color: "#ec4899", fontWeight: "600", margin: "0 0 0.5rem 0" }}>
                {formData.companyName}
              </p>
              <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#1f2937", margin: "0 0 0.5rem 0" }}>
                Joining Letter
              </h1>
              <h2 style={{ fontSize: "1rem", fontWeight: "600", color: "#6b7280", margin: "0" }}>
                Companion & Hospitality Service
              </h2>
            </div>

            {/* Company Details */}
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#374151" }}>
                <p style={{ margin: "0 0 0.25rem 0" }}>{formData.companyName}</p>
                <p style={{ margin: "0 0 0.25rem 0" }}>{formData.companyAddress}</p>
                <p style={{ margin: "0 0 0.25rem 0" }}>{formData.companyCity}</p>
                <p style={{ margin: "0 0 0.25rem 0" }}>Phone: {formData.companyPhone}</p>
                <p style={{ margin: "0 0 0.25rem 0" }}>Email: {formData.companyEmail}</p>
                <p style={{ margin: "0", fontWeight: "600", marginTop: "0.5rem" }}>Date: {formData.date}</p>
              </div>
            </div>

            {/* Recipient Details */}
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#374151" }}>
                <p style={{ margin: "0 0 0.25rem 0", fontWeight: "600" }}>{formData.candidateName}</p>
                <p style={{ margin: "0 0 0.25rem 0" }}>{formData.candidateAddress}</p>
                <p style={{ margin: "0" }}>{formData.candidateCity}</p>
              </div>
            </div>

            {/* Subject */}
            <p style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1f2937", margin: "0 0 1.5rem 0", padding: "0.75rem", backgroundColor: "#f3f4f6", borderLeft: "4px solid #ec4899" }}>
              Subject: Joining Letter for the Position of Hospitality Companion
            </p>

            {/* Salutation */}
            <p style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1f2937", margin: "0 0 1rem 0" }}>
              Dear {formData.candidateName},
            </p>

            {/* Body Content */}
            <div style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "#374151", marginBottom: "1.5rem" }}>
              <p style={{ margin: "0 0 1rem 0", textAlign: "justify" }}>
                We are pleased to welcome you to <strong>{formData.companyName}</strong> as a Hospitality Companion. Your communication skills, personality, and professional attitude have been highly appreciated, and we are confident that you will contribute positively to our organization.
              </p>

              <p style={{ margin: "0 0 1rem 0", textAlign: "justify" }}>
                As per the terms of your role, your initial contract will be for a period of <strong>{formData.contractPeriod}</strong>. You will receive a monthly remuneration of <strong>{formData.salary}</strong>, along with additional allowances and benefits as per company policies.
              </p>

              <p style={{ margin: "0 0 0.75rem 0", textAlign: "justify" }}>
                Your responsibilities will include:
              </p>

              <ul style={{ margin: "0 0 1rem 0", paddingLeft: "1.5rem", fontSize: "0.9rem", color: "#374151" }}>
                <li style={{ margin: "0 0 0.5rem 0", textAlign: "justify" }}>Providing professional companionship during events and client engagements</li>
                <li style={{ margin: "0 0 0.5rem 0", textAlign: "justify" }}>Maintaining confidentiality and professionalism at all times</li>
                <li style={{ margin: "0 0 0.5rem 0", textAlign: "justify" }}>Ensuring high standards of client service and conduct</li>
                <li style={{ margin: "0 0 0.5rem 0", textAlign: "justify" }}>Following all guidelines and protocols issued by the agency</li>
              </ul>

              <p style={{ margin: "0 0 1.5rem 0", textAlign: "justify" }}>
                Please acknowledge your joining by signing and returning a copy of this letter. We look forward to working with you.
              </p>
            </div>

            {/* Refund Policy Section */}
            <div style={{ padding: "1rem", backgroundColor: "#eff6ff", border: "2px solid #93c5fd", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#1f2937", margin: "0 0 0.75rem 0", textTransform: "uppercase" }}>
                Refund Policy / वापसी नीति
              </h3>
              <p style={{ fontSize: "0.85rem", textAlign: "justify", margin: "0 0 0.75rem 0", color: "#374151" }}>
                <strong>Refundable:</strong> ₹{Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee) + Number(fee?.nocFee) + Number(fee?.locationVerificationFee) + Number(fee?.secretarySafetyFee) + Number(fee?.joiningFromFee)} – The full amount will be returned to the client upon successful completion of the service.
              </p>
              <p style={{ fontSize: "0.85rem", textAlign: "justify", margin: "0", color: "#374151" }}>
                <strong>वापसी योग्य:</strong> सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक को लौटा दी जाएगी।
              </p>
            </div>

            {/* Signature Section */}
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: "0.9rem", color: "#374151", margin: "0 0 1rem 0" }}>
                Sincerely,
              </p>
              <div style={{ height: "4rem", marginBottom: "0.5rem" }} />
              <p style={{ fontSize: "0.9rem", fontWeight: "700", color: "#1f2937", margin: "0 0 0.25rem 0" }}>
                {formData.senderName}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0" }}>
                {formData.companyName}
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: "#ec4899",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#be185d";
              e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ec4899";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg style={{ width: "1.25rem", height: "1.25rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoiningLetterDocument;