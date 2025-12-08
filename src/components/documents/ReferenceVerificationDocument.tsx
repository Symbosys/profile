
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";
import type { Profile } from "../../store/profile"; 
import type { PaymentFees } from "../../hook/useFee";


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

const ReferenceVerificationDocument= ({profile, fee}: {profile: Profile | null, fee: PaymentFees | null}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const [formData] = useState<FormData>({
    date: new Date().toISOString().split("T")[0],
    applicantName: profile?.name ?? "",
    permanentAddress: profile?.address ?? "",
    yearsKnown: "5 Years",
    refereeSignature: "",
    refereeTelephone: "876-555-1234",
    refereeName: "Dr. Michael Smith",
    refereeAddress: profile?.address ?? "",
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
    <div style={{ width: "100%", backgroundColor: "#f9fafb", paddingTop: "1rem", paddingBottom: "2rem", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: "56rem", margin: "0 auto", padding: "0.5rem" }}>
        {/* Date Input */}
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <label
            htmlFor="date-input"
            style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}
          >
            Select Date:
          </label>
          <input
            id="date-input"
            type="date"
            value={formData.date}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 12px",
              outline: "none"
            }}
            disabled
          />
        </div>

        {/* Document */}
        <div
          ref={printRef}
          style={{
            backgroundColor: "white",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "2px solid #d1d5db",
            fontFamily: "sans-serif",
            overflow: "hidden"
          }}
        >
          {/* Header Section */}
          <div style={{ background: "linear-gradient(to right, #dc2626, #b91c1c)", color: "white", padding: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0", marginBottom: "0.5rem" }}>
                {formData.companyName}
              </h1>
              <p style={{ fontSize: "0.85rem", margin: "0", opacity: "0.95" }}>
                For every financial step we take
              </p>
            </div>
            <div style={{ textAlign: "right", fontSize: "0.85rem", marginTop: "0.5rem" }}>
              <strong>Date: {formatDate(formData.date)}</strong>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ padding: "2rem" }}>
            {/* Greeting */}
            <p style={{ fontSize: "0.9rem", color: "#1f2937", marginBottom: "1.5rem", fontWeight: "600" }}>
              Dear Sir/Madam,
            </p>

            {/* Form Content */}
            <div style={{ fontSize: "0.85rem", color: "#1f2937", lineHeight: "1.8", marginBottom: "2rem" }}>
              {/* Applicant Name Field */}
              <div style={{ marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                <span>I declare that</span>
                <div
                  style={{
                    flex: "1",
                    minWidth: "150px",
                    paddingBottom: "0.25rem",
                    borderBottom: "1px solid #1f2937",
                    fontWeight: "500"
                  }}
                >
                  {formData.applicantName}
                </div>
              </div>

              {/* Permanent Address Field */}
              <div style={{ marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ marginTop: "0.25rem" }}>whose permanent address is</span>
                <div
                  style={{
                    flex: "1",
                    minWidth: "200px",
                    paddingBottom: "0.25rem",
                    borderBottom: "1px solid #1f2937",
                    fontWeight: "500",
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {formData.permanentAddress}
                </div>
              </div>

              {/* Years Known Field */}
              <div style={{ marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                <span>has been personally known to me for the past</span>
                <div
                  style={{
                    paddingBottom: "0.25rem",
                    borderBottom: "1px solid #1f2937",
                    minWidth: "80px",
                    fontWeight: "500",
                    textAlign: "center"
                  }}
                >
                  {formData.yearsKnown}
                </div>
                <span>years/months.</span>
              </div>

              {/* Statement */}
              <p style={{ marginBottom: "2rem", fontStyle: "italic", color: "#374151" }}>
                The individual is fit and proper to conduct business.
              </p>

              {/* Closing */}
              <p style={{ marginTop: "2rem", marginBottom: "2rem" }}>Yours faithfully,</p>

              {/* Signature Area */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "3rem", marginBottom: "2rem" }}>
                <div>
                  <div
                    style={{
                      height: "60px",
                      borderBottom: "1px solid #1f2937",
                      marginBottom: "0.5rem"
                    }}
                  ></div>
                  <p style={{ fontSize: "0.8rem", margin: "0", fontWeight: "500" }}>
                    (Signature of Referee)
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      height: "60px",
                      borderBottom: "1px solid #1f2937",
                      marginBottom: "0.5rem"
                    }}
                  ></div>
                  <p style={{ fontSize: "0.8rem", margin: "0", fontWeight: "500" }}>
                    (Telephone of Referee)
                  </p>
                </div>
              </div>

              {/* Referee Name Field */}
              <div style={{ marginBottom: "2rem" }}>
                <div
                  style={{
                    height: "50px",
                    borderBottom: "1px solid #1f2937",
                    marginBottom: "0.5rem"
                  }}
                ></div>
                <p style={{ fontSize: "0.8rem", margin: "0", fontWeight: "500" }}>
                  (Name of Referee)
                </p>
              </div>
            </div>

            {/* Address of Referee Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontWeight: "700", marginBottom: "0.75rem", fontSize: "0.95rem", color: "#1f2937" }}>
                Address of Referee
              </h3>
              <div
                style={{
                  minHeight: "100px",
                  padding: "1rem",
                  border: "2px solid #d1d5db",
                  borderRadius: "0.375rem",
                  whiteSpace: "pre-wrap",
                  fontSize: "0.85rem",
                  color: "#1f2937",
                  backgroundColor: "#f9fafb",
                  fontWeight: "500"
                }}
              >
                {formData.refereeAddress}
              </div>
            </div>

            {/* Refund Policy Section */}
            <div style={{ backgroundColor: "#eff6ff", border: "2px solid #93c5fd", padding: "1.25rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h3 style={{ fontWeight: "700", marginBottom: "0.75rem", fontSize: "0.85rem", textTransform: "uppercase", color: "#1f2937" }}>
                Refund Policy / वापसी नीति
              </h3>
              <p style={{ fontSize: "0.8rem", textAlign: "justify", marginBottom: "0.75rem", color: "#1f2937", margin: "0 0 0.75rem 0" }}>
                <strong>Refundable:</strong> (₹{Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee) + Number(fee?.nocFee) + Number(fee?.locationVerificationFee)}) The full amount will be returned to the client upon successful completion of the service.
              </p>
              <p style={{ fontSize: "0.8rem", textAlign: "justify", color: "#1f2937", margin: "0" }}>
                <strong>वापसी योग्य:</strong> सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक को लौटा दी जाएगी।
              </p>
            </div>

            {/* Footer */}
            <div
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                padding: "0.75rem",
                textAlign: "center",
                fontSize: "0.75rem",
                lineHeight: "1.5",
                borderRadius: "0.375rem"
              }}
            >
              Toll Free USA: 1-866-866-8827 • UK 0-800-096-8067 • Email: manager@vmbs.com
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
          <Button
            onClick={handleDownload}
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <Download style={{ width: "1rem", height: "1rem" }} />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferenceVerificationDocument;