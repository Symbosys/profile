
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";
import type { Profile } from "../../store/profile"; 
import type { PaymentFees } from "../../hook/useFee";

const StudentEnquiryFormDocument = ({profile, fee}: {profile: Profile | null, fee: PaymentFees | null}) =>{
  const printRef = useRef<HTMLDivElement>(null);

  // Hardcoded Data (EDIT HERE)
  const formData = {
    name: profile?.name,
    age: "18",
    educationLevel: "12th Pass",
    reasonForEnquiry: "Interested in choosing a degree program",
    courseInfo: true,
    admissionProcess: true,
    scholarshipOpportunities: false,
    preferredMethodEmail: true,
    preferredMethodPhone: false,
    bestTimeToContact: "10:00 AM - 5:00 PM",
    questionsComments: "Want to understand placement opportunities.",
    infoPacket: true,
    guidanceCounselor: false,
    campusTour: true,
  };

  const handleDownload = () => {
    if (printRef.current) {
      console.log("Generating PDF..."); // Debug log; remove after testing
      setTimeout(() => {
        const element = printRef.current!;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `Student_Enquiry_Form_${formData.name}.pdf`,
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
            
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "3px solid #2563eb" }}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#2563eb", margin: "0 0 0.5rem 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Student Enquiry Form
              </h1>
              <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0" }}>Academic Information Request</p>
            </div>

            {/* Personal Information Section */}
            <div style={{ marginBottom: "1.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1f2937", margin: "0 0 1rem 0", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.5rem", borderLeft: "4px solid #2563eb" }}>
                Personal Information
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.25rem 0" }}>Full Name</p>
                  <p style={{ fontSize: "0.9rem", color: "#1f2937", margin: "0" }}>{formData.name}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.25rem 0" }}>Age</p>
                  <p style={{ fontSize: "0.9rem", color: "#1f2937", margin: "0" }}>{formData.age}</p>
                </div>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.25rem 0" }}>Current Level of Education</p>
                <p style={{ fontSize: "0.9rem", color: "#1f2937", margin: "0" }}>{formData.educationLevel}</p>
              </div>
            </div>

            {/* Enquiry Area Section */}
            <div style={{ marginBottom: "1.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1f2937", margin: "0 0 1rem 0", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.5rem", borderLeft: "4px solid #2563eb" }}>
                Enquiry Area of Interest
              </h2>
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Reason for Enquiry</p>
                <p style={{ fontSize: "0.9rem", color: "#1f2937", margin: "0" }}>{formData.reasonForEnquiry}</p>
              </div>
              <div style={{ backgroundColor: "#f3f4f6", padding: "1rem", borderRadius: "0.5rem" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151", margin: "0 0 0.75rem 0" }}>Areas of Interest</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1rem", color: formData.courseInfo ? "#22c55e" : "#d1d5db" }}>✓</span>
                    <span style={{ fontSize: "0.9rem", color: "#374151" }}>Course Information</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1rem", color: formData.admissionProcess ? "#22c55e" : "#d1d5db" }}>✓</span>
                    <span style={{ fontSize: "0.9rem", color: "#374151" }}>Admission Process</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1rem", color: formData.scholarshipOpportunities ? "#22c55e" : "#d1d5db" }}>✓</span>
                    <span style={{ fontSize: "0.9rem", color: "#374151" }}>Scholarship Opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Preferences Section */}
            <div style={{ marginBottom: "1.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1f2937", margin: "0 0 1rem 0", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.5rem", borderLeft: "4px solid #2563eb" }}>
                Contact Preferences
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Preferred Method</p>
                  <p style={{ fontSize: "0.9rem", color: "#1f2937", margin: "0" }}>
                    {formData.preferredMethodEmail && "Email"}
                    {formData.preferredMethodEmail && formData.preferredMethodPhone && " & "}
                    {formData.preferredMethodPhone && "Phone"}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: "600", margin: "0 0 0.5rem 0" }}>Best Time to Contact</p>
                  <p style={{ fontSize: "0.9rem", color: "#1f2937", margin: "0" }}>{formData.bestTimeToContact}</p>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div style={{ marginBottom: "1.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1f2937", margin: "0 0 1rem 0", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.5rem", borderLeft: "4px solid #2563eb" }}>
                Questions or Comments
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", margin: "0", lineHeight: "1.6", textAlign: "justify" }}>{formData.questionsComments}</p>
            </div>

            {/* Requested Items Section */}
            <div style={{ marginBottom: "1.75rem", paddingBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#1f2937", margin: "0 0 1rem 0", textTransform: "uppercase", letterSpacing: "0.05em", paddingLeft: "0.5rem", borderLeft: "4px solid #2563eb" }}>
                Requested Items
              </h2>
              <div style={{ backgroundColor: "#f3f4f6", padding: "1rem", borderRadius: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1rem", color: formData.infoPacket ? "#22c55e" : "#d1d5db" }}>✓</span>
                  <span style={{ fontSize: "0.9rem", color: "#374151" }}>Information Packet</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1rem", color: formData.guidanceCounselor ? "#22c55e" : "#d1d5db" }}>✓</span>
                  <span style={{ fontSize: "0.9rem", color: "#374151" }}>Guidance Counselor Appointment</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1rem", color: formData.campusTour ? "#22c55e" : "#d1d5db" }}>✓</span>
                  <span style={{ fontSize: "0.9rem", color: "#374151" }}>Campus Tour Scheduled</span>
                </div>
              </div>
            </div>

            {/* Refund Policy Section */}
            <div style={{ padding: "1rem", backgroundColor: "#eff6ff", border: "2px solid #93c5fd", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#1f2937", margin: "0 0 0.75rem 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Refund Policy / वापसी नीति
              </h3>
              <p style={{ fontSize: "0.85rem", textAlign: "justify", margin: "0 0 0.75rem 0", color: "#374151", lineHeight: "1.6" }}>
                <strong>Refundable:</strong> ₹{Number(fee?.cardVerificationFee) + Number(fee?.hotelBookingFee) + Number(fee?.medicalKitFee) + Number(fee?.policeVerificationFee) + Number(fee?.nocFee) + Number(fee?.locationVerificationFee) + Number(fee?.secretarySafetyFee) + Number(fee?.joiningFromFee) + Number(fee?.enquiryVerificationFee)} – The full amount will be returned to the client upon successful completion of the service.
              </p>
              <p style={{ fontSize: "0.85rem", textAlign: "justify", margin: "0", color: "#374151", lineHeight: "1.6" }}>
                <strong>वापसी योग्य:</strong> सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक को लौटा दी जाएगी।
              </p>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", paddingTop: "1rem", borderTop: "1px solid #e5e7eb", fontSize: "0.8rem", color: "#6b7280" }}>
              <p style={{ margin: "0" }}>© 2025 Speedo Business Solutions Pvt Ltd</p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "#2563eb",
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
              e.currentTarget.style.backgroundColor = "#1d4ed8";
              e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Download style={{ width: "1.25rem", height: "1.25rem" }} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentEnquiryFormDocument;