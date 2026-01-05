
import { useRef, useState, useMemo } from "react";
import { Button } from "../ui/button";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";
import signature from '../../assets/signature.jpeg';
import type { Profile } from "../../store/profile";
import type { PaymentFees } from "../../hook/useFee";

interface PoliceClearanceCertificateProps {
  profile: Profile | null | undefined;
  fee: PaymentFees | null
}

const PoliceClearanceCertificate: React.FC<PoliceClearanceCertificateProps> = ({ profile, fee }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formData = useMemo(() => {
    const applicantName = profile?.name || "Applicant Name";
    const address = profile?.address || "";
    const state = profile?.state || "MAHARASHTRA";
    const pincode = "";
    const photoUrl = profile?.customerImage?.secure_url || profile?.customerImage?.url || profile?.cardVerification?.url || "";

    return {
      applicationNumber: `SSC/R/${new Date().getFullYear()}/${String(profile?.id || 0).padStart(6, '0')}`,
      applicationDate: selectedDate,
      certificateDate: selectedDate,
      applicantName,
      fatherName: "Father's Name",
      address,
      pincode,
      state,
      subject: `Verification of Character and Antecedents of ${applicantName}`,
      stationName: "Thane Secretary Safety Dept",
      remarks: `Security और compliance clearance successfully complete होने के बाद आपकी complete responsibility हमारी company द्वारा formally assume की जाएगी।
Company आपके safety, privacy और overall facilitation को highest professional standards के अनुसार manage करेगी।
All engagements strictly हमारे corporate protocols, professional conduct guidelines और regulated safety procedures के तहत operate किए जाते हैं, जिससे हर stage पर एक secure, well-managed और dignified environment सुनिश्चित हो सके।
Your travel coordination, on-site support, logistical arrangements और आवश्यक सुविधाएँ हमारी authorised team द्वारा precision, discretion और full oversight के साथ संभाली जाएँगी।
Company का foremost commitment है कि आपको हर समय एक seamless, confidential और professionally governed experience प्रदान किया जाए, जहाँ आपकी well-being और comfort पूरी तरह protected रहे.`,
      photoUrl,
    };
  }, [selectedDate, profile]);

  const handleDownload = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `SSC_${formData.applicationNumber}.pdf`,
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
      }, 1000); // Increased delay to account for image loading
    } else {
      console.error("Print ref is null!"); // Debug if ref fails
    }
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#f3f4f6", paddingTop: "1rem", paddingBottom: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "56rem", margin: "0 auto", padding: "0.5rem" }}>
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 12px",
              outline: "none"
            }}
          />
        </div>
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
          {/* Top Banner - Purple Gradient */}
          <div style={{
            background: "linear-gradient(to right, #6b21a8, #4c0519)",
            color: "white",
            padding: "1.5rem 2rem",
            textAlign: "center"
          }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", margin: "0 0 0.5rem 0" }}>
              SECURITY CLEARANCE
            </h1>
            <p style={{ fontSize: "0.9rem", margin: "0", opacity: "0.9" }}>
              Professional Compliance & Safety Assessment
            </p>
          </div>

          {/* Main Content */}
          <div style={{ padding: "2rem" }}>
            {/* Top Info Bar */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
              marginBottom: "2rem",
              padding: "1rem",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.5rem",
              borderLeft: "4px solid #6b21a8"
            }}>
              <div>
                <p style={{ fontSize: "0.7rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", margin: "0 0 0.25rem 0" }}>Application ID</p>
                <p style={{ fontSize: "0.85rem", fontWeight: "700", color: "#1f2937", margin: "0" }}>{formData.applicationNumber}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", margin: "0 0 0.25rem 0" }}>Issue Date</p>
                <p style={{ fontSize: "0.85rem", fontWeight: "700", color: "#1f2937", margin: "0" }}>{formatDate(formData.certificateDate)}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.7rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "600", margin: "0 0 0.25rem 0" }}>Reference No.</p>
                <p style={{ fontSize: "0.85rem", fontWeight: "700", color: "#6b21a8", margin: "0" }}>SSC/2024/OFFICIAL</p>
              </div>
            </div>

            {/* Applicant Card Section */}
            <div style={{
              padding: "1.5rem",
              border: "2px solid #e5e7eb",
              borderRadius: "0.5rem",
              marginBottom: "2rem",
              backgroundColor: "#fafbfc"
            }}>
              <p style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: "700", margin: "0 0 0.75rem 0", letterSpacing: "0.05em" }}>
                Applicant Information
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.25rem 0" }}>Full Name</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1f2937", margin: "0" }}>{formData.applicantName}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.25rem 0" }}>State</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: "600", color: "#1f2937", margin: "0" }}>{formData.state}</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.25rem 0" }}>Address</p>
                <p style={{ fontSize: "0.85rem", color: "#374151", margin: "0" }}>{formData.address}</p>
              </div>
            </div>

            {/* Certificate Content */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{
                padding: "1.5rem",
                backgroundColor: "#ede9fe",
                border: "2px solid #d8d0fc",
                borderRadius: "0.5rem",
                marginBottom: "1.5rem"
              }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#4c0519", margin: "0 0 0.75rem 0", textTransform: "uppercase" }}>
                  To Whom It May Concern
                </h3>
                <p style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#1f2937", margin: "0", textAlign: "justify" }}>
                  <strong>Subject:</strong> {formData.subject}
                </p>
              </div>

              <div style={{
                padding: "1.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                backgroundColor: "white",
                marginBottom: "1.5rem"
              }}>
                <p style={{ fontSize: "0.85rem", lineHeight: "1.7", color: "#374151", margin: "0", textAlign: "justify" }}>
                  {formData.remarks}
                </p>
              </div>
            </div>

            {/* Compliance Status */}
            <div style={{
              padding: "1.25rem",
              backgroundColor: "#f0fdf4",
              border: "2px solid #86efac",
              borderRadius: "0.5rem",
              marginBottom: "2rem",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✓</div>
              <p style={{ fontSize: "0.9rem", fontWeight: "700", color: "#15803d", margin: "0 0 0.25rem 0" }}>
                CLEARANCE APPROVED
              </p>
              <p style={{ fontSize: "0.8rem", color: "#4b5563", margin: "0" }}>
                All compliance checks completed successfully
              </p>
            </div>

            {/* Refund Policy Section */}
            <div style={{ backgroundColor: "#eff6ff", border: "2px solid #93c5fd", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontWeight: "700", marginBottom: "0.5rem", fontSize: "0.8rem", textTransform: "uppercase", margin: "0 0 0.5rem 0", color: "#1f2937" }}>Refund Policy / वापसी नीति</h3>
              <p style={{ fontSize: "0.8rem", textAlign: "justify", marginBottom: "0.5rem", color: "#1f2937", margin: "0 0 0.5rem 0" }}>
                <strong>Refundable:</strong> (₹{Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee) + Number(fee?.nocFee) + Number(fee?.locationVerificationFee) + Number(fee?.secretarySafetyFee)}) The full amount will be returned to the client upon successful completion of the service.
              </p>
              <p style={{ fontSize: "0.8rem", textAlign: "justify", color: "#1f2937", margin: "0" }}>
                <strong>वापसी योग्य:</strong> सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक को लौटा दी जाएगी।
              </p>
            </div>

            {/* Signature & Authority Section */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              marginTop: "2.5rem",
              paddingTop: "2rem",
              borderTop: "2px solid #d1d5db"
            }}>
              <div>
                <img src={signature} alt="Authorized Signature" style={{ maxWidth: "120px", height: "auto", marginBottom: "0.5rem" }} />
                <div style={{ borderTop: "2px solid #1f2937", paddingTop: "0.5rem" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: "700", color: "#1f2937", margin: "0.25rem 0" }}>Authorized Official</p>
                  <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: "0" }}>Secretary Safety Dept</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#6b21a8",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  margin: "0 0 0.75rem auto"
                }}>
                  ✓
                </div>
                <p style={{ fontSize: "0.8rem", fontWeight: "700", color: "#1f2937", margin: "0.25rem 0" }}>Verified & Certified</p>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: "0" }}>{formatDate(formData.certificateDate)}</p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div style={{
            backgroundColor: "#1f2937",
            color: "white",
            padding: "1rem 2rem",
            textAlign: "center",
            fontSize: "0.75rem",
            borderTop: "2px solid #6b21a8"
          }}>
            <p style={{ margin: "0" }}>This is an official digitally signed security clearance document</p>
            <p style={{ margin: "0.25rem 0 0 0", opacity: "0.8" }}>Speedo Business Solutions Pvt Ltd | www.speedobsol.com</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
        <Button
          onClick={handleDownload}
          style={{ backgroundColor: "#6b21a8", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontSize: "1rem", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Download style={{ width: "1rem", height: "1rem" }} />
          Download Certificate
        </Button>
      </div>
    </div>
  );
};

export default PoliceClearanceCertificate;