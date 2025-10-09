import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import { AlertCircle, Download, FileText, Upload } from "lucide-react";
import html2pdf from "html2pdf.js";

interface FormData {
  name: string;
  memberNumber: string;
  city: string;
  image: string | null;
}

const PlayboyMembershipCard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    memberNumber: "",
    city: "",
    image: null,
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSignature = (name: string): string => {
    if (!name) return "";
    
    // Create a stylized signature from the name
    const words = name.trim().split(' ');
    if (words.length === 1) {
      // Single name - make it cursive style
      return words[0];
    } else {
      // Multiple words - take first letter of first name and full last name
      const firstName = words[0];
      const lastName = words[words.length - 1];
      return `${firstName.charAt(0)}. ${lastName}`;
    }
  };

  const handleGeneratePreview = () => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push("Name is required.");
    if (!formData.memberNumber.trim()) errors.push("Member Number is required.");
    if (!formData.city.trim()) errors.push("City is required.");
    if (!formData.image) errors.push("Image is required.");

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    if (printRef.current) {
        const element = printRef.current;
        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `Playboy_Membership_Card_${formData.memberNumber}.pdf`,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Form Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Playboy Membership Card Generator
          </h1>
          
          <Card className="bg-black/50 border-yellow-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-yellow-400 font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name..."
                      value={formData.name}
                      onChange={handleInputChange}
                      className={cn(
                        "bg-gray-800 border-yellow-500/30 text-white placeholder:text-gray-400",
                        formErrors.includes("Name is required.") && "border-red-500"
                      )}
                    />
                    {formErrors.includes("Name is required.") && (
                      <p className="text-red-400 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Name is required.
                      </p>
                    )}
                  </div>

                  {/* Member Number */}
                  <div className="space-y-2">
                    <Label htmlFor="memberNumber" className="text-yellow-400 font-semibold">
                      Member Number
                    </Label>
                    <Input
                      id="memberNumber"
                      name="memberNumber"
                      placeholder="Enter member number..."
                      value={formData.memberNumber}
                      onChange={handleInputChange}
                      className={cn(
                        "bg-gray-800 border-yellow-500/30 text-white placeholder:text-gray-400",
                        formErrors.includes("Member Number is required.") && "border-red-500"
                      )}
                    />
                    {formErrors.includes("Member Number is required.") && (
                      <p className="text-red-400 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Member Number is required.
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-yellow-400 font-semibold">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter your city..."
                      value={formData.city}
                      onChange={handleInputChange}
                      className={cn(
                        "bg-gray-800 border-yellow-500/30 text-white placeholder:text-gray-400",
                        formErrors.includes("City is required.") && "border-red-500"
                      )}
                    />
                    {formErrors.includes("City is required.") && (
                      <p className="text-red-400 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        City is required.
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-yellow-400 font-semibold">
                      Profile Image
                    </Label>
                    <div className="relative">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={cn(
                          "bg-gray-800 border-yellow-500/30 text-white file:bg-yellow-500 file:text-black file:border-0 file:rounded file:mr-4 file:px-4 file:py-1",
                          formErrors.includes("Image is required.") && "border-red-500"
                        )}
                      />
                      <Upload className="absolute right-3 top-3 h-4 w-4 text-yellow-400 pointer-events-none" />
                    </div>
                    {formErrors.includes("Image is required.") && (
                      <p className="text-red-400 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Image is required.
                      </p>
                    )}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGeneratePreview}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 text-lg"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Generate Membership Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-2xl">
              <div
                ref={printRef}
                className="membership-card"
                style={{
                  width: '350px',
                  height: '550px',
                  background: 'linear-gradient(145deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
                  border: '3px solid #D4AF37',
                  borderRadius: '20px',
                  padding: '24px',
                  fontFamily: 'Arial, sans-serif',
                  color: '#D4AF37',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'inset 0 0 50px rgba(212, 175, 55, 0.1)'
                }}
              >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  {/* Playboy Bunny Logo */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '35px',
                      height: '45px',
                      position: 'relative',
                      display: 'inline-block'
                    }}>
                      {/* Bunny Head */}
                      <div style={{
                        width: '22px',
                        height: '22px',
                        backgroundColor: '#D4AF37',
                        borderRadius: '50%',
                        position: 'absolute',
                        left: '6px',
                        top: '14px'
                      }} />
                      {/* Left Ear */}
                      <div style={{
                        width: '7px',
                        height: '18px',
                        backgroundColor: '#D4AF37',
                        borderRadius: '3px 3px 0 0',
                        position: 'absolute',
                        left: '1px',
                        top: '0px',
                        transform: 'rotate(-15deg)'
                      }} />
                      {/* Right Ear */}
                      <div style={{
                        width: '7px',
                        height: '18px',
                        backgroundColor: '#D4AF37',
                        borderRadius: '3px 3px 0 0',
                        position: 'absolute',
                        right: '1px',
                        top: '0px',
                        transform: 'rotate(15deg)'
                      }} />
                      {/* Bow Tie */}
                      <div style={{
                        width: '10px',
                        height: '6px',
                        backgroundColor: '#D4AF37',
                        position: 'absolute',
                        left: '12px',
                        bottom: '6px',
                        clipPath: 'polygon(0% 0%, 40% 50%, 0% 100%, 100% 100%, 60% 50%, 100% 0%)'
                      }} />
                      {/* Eye */}
                      <div style={{
                        width: '2px',
                        height: '2px',
                        backgroundColor: '#000000',
                        borderRadius: '50%',
                        position: 'absolute',
                        right: '10px',
                        top: '20px'
                      }} />
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    letterSpacing: '3px',
                    marginBottom: '8px'
                  }}>
                    PLAYBOY
                  </div>
                  
                  <div style={{
                    fontSize: '16px',
                    letterSpacing: '6px',
                    fontWeight: 'normal'
                  }}>
                    MEMBERSHIP CARD
                  </div>
                </div>

                {/* Main Content Area */}
                <div style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  {/* Photo and Name Section */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    gap: '20px',
                    width: '100%'
                  }}>
                    {/* Photo */}
                    <div style={{
                      width: '85px',
                      height: '105px',
                      border: '2px solid #D4AF37',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#FFB6C1',
                      flexShrink: 0
                    }}>
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Profile"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      )}
                    </div>

                    {/* Name and Member Number */}
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        lineHeight: '1.2'
                      }}>
                        {formData.name}
                      </div>
                      
                      <div style={{ 
                        fontSize: '12px',
                        marginBottom: '4px',
                        color: '#D4AF37'
                      }}>
                        MEMBER NO.
                      </div>
                      <div style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                      }}>
                        {formData.memberNumber}
                      </div>
                    </div>
                  </div>

                  {/* City Section */}
                  <div style={{ 
                    width: '100%',
                    textAlign: 'left',
                    marginTop: '10px'
                  }}>
                    <div style={{ 
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '14px' }}>CITY:</span>
                      <span style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>
                        {formData.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signature Section */}
                <div style={{ 
                  borderTop: '1px solid #D4AF37', 
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginTop: '20px'
                }}>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#D4AF37'
                  }}>
                    SIGNATURE
                  </div>
                  <div style={{
                    fontSize: '20px',
                    fontFamily: 'cursive',
                    fontStyle: 'italic',
                    transform: 'rotate(-1deg)',
                    color: '#D4AF37',
                    textDecoration: 'underline',
                    textDecorationColor: '#D4AF37',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '2px'
                  }}>
                    {generateSignature(formData.name)}
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-8 text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayboyMembershipCard;