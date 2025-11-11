
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

interface PlayboyMembershipCardDocumentProps {
  name?: string;
  memberNumber?: string;
  city?: string;
  image?: string | null;
}

// Default sample card details (you can change these)
const DEFAULT_DATA = {
  name: "John Doe",
  memberNumber: "PBX-987654",
  city: "Los Angeles",
  image: null,
};

const PlayboyMembershipCardDocument: React.FC<PlayboyMembershipCardDocumentProps> = ({
  name = DEFAULT_DATA.name,
  memberNumber = DEFAULT_DATA.memberNumber,
  city = DEFAULT_DATA.city,
  image = DEFAULT_DATA.image,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const generateSignature = (fullName: string): string => {
    const words = fullName.trim().split(" ");
    if (words.length === 1) return words[0];
    const first = words[0][0];
    const last = words[words.length - 1];
    return `${first}. ${last}`;
  };

  const handleDownloadPDF = () => {
    if (!printRef.current) {
      console.error("Print ref is null!"); // Debug if ref fails
      return;
    }
    console.log("Generating PDF..."); // Debug log; remove after testing
    setTimeout(() => {
      const element = printRef.current!;
      const opt = {
        margin: 0 as any,
        filename: `Playboy_Membership_Card_${memberNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 3, 
          useCORS: true,
          allowTaint: true,
          letterRendering: true,
          logging: false,
          backgroundColor: '#000000'
        },
        jsPDF: { 
          unit: "px", 
          format: [350, 550] as any, 
          orientation: "portrait",
          hotfixes: ["px_scaling"]
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      html2pdf().set(opt).from(element).save();
    }, 1000); // Delay to ensure image and styles load
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-2 sm:p-4 md:p-6 overflow-x-auto">

      <div 
        ref={printRef}
        className="mx-auto w-[350px] h-[550px] rounded-[20px] p-6 flex flex-col justify-between"
        style={{
          fontFamily: "Arial, sans-serif",
          background: 'linear-gradient(to bottom right, #000000, #111827, #000000)',
          border: '3px solid #d97706',
          color: '#d97706'
        }}
      >

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="w-9 h-10 relative">
              <div className="absolute w-5 h-5 rounded-full left-2 top-3" style={{ backgroundColor: '#d97706' }} />
              <div className="absolute w-2 h-5 rounded left-0 top-0 -rotate-[15deg]" style={{ backgroundColor: '#d97706' }} />
              <div className="absolute w-2 h-5 rounded right-0 top-0 rotate-[15deg]" style={{ backgroundColor: '#d97706' }} />
              <div className="absolute w-3 h-2 left-3 bottom-1" style={{ backgroundColor: '#d97706' }} />
              <div className="absolute w-1 h-1 right-3 top-4 rounded-full" style={{ backgroundColor: '#000000' }} />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-widest m-0">PLAYBOY</h1>
          <h2 className="text-base tracking-[0.4em] mt-1 mb-0">MEMBERSHIP CARD</h2>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6">

          {/* Photo + Name Block */}
          <div className="flex gap-4">
            <div className="w-[85px] h-[105px] rounded-lg overflow-hidden flex-shrink-0" style={{ border: '2px solid #d97706', backgroundColor: '#fecaca' }}>
              {image && <img src={image} alt="Profile" className="w-full h-full object-cover" />}
            </div>
            <div className="flex flex-col justify-start flex-1">
              <div className="uppercase font-bold text-xl leading-tight">{name}</div>
              <div className="text-xs mt-3" style={{ color: '#d97706' }}>MEMBER NO.</div>
              <div className="text-lg font-bold">{memberNumber}</div>
            </div>
          </div>

          {/* City */}
          <div className="text-left text-lg">
            <span className="text-sm">CITY:</span>{" "}
            <strong className="uppercase tracking-wider">{city}</strong>
          </div>
        </div>

        {/* Signature */}
        <div className="pt-4 text-right" style={{ borderTop: '1px solid #d97706' }}>
          <div className="text-xs text-left mb-1" style={{ color: '#d97706' }}>SIGNATURE</div>
          <div className="text-xl italic underline" style={{ fontFamily: "cursive, Arial, sans-serif" }}>
            {generateSignature(name)}
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-4 sm:mt-6 w-full max-w-[350px]">
        <Button
          onClick={handleDownloadPDF}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-2 sm:py-3 px-6 sm:px-8 text-base sm:text-lg rounded-md shadow-lg hover:scale-105 transition"
        >
          <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Download Card
        </Button>
      </div>
    </div>
  );
};

export default PlayboyMembershipCardDocument;