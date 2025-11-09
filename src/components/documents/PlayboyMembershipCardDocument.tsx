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

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
      filename: `Playboy_Membership_Card_${memberNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, width: 750 },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(printRef.current).save();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">

      <div ref={printRef} className="rounded-xl shadow-2xl"
        style={{
          width: "350px",
          height: "550px",
          background: "linear-gradient(145deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          border: "3px solid #D4AF37",
          borderRadius: "20px",
          padding: "24px",
          color: "#D4AF37",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div className="flex justify-center mb-2">
            <div className="w-9 h-10 relative">
              <div className="absolute w-5 h-5 bg-[#D4AF37] rounded-full left-2 top-3" />
              <div className="absolute w-2 h-5 bg-[#D4AF37] rounded left-0 top-0 rotate-[-15deg]" />
              <div className="absolute w-2 h-5 bg-[#D4AF37] rounded right-0 top-0 rotate-[15deg]" />
              <div className="absolute w-3 h-2 bg-[#D4AF37] left-3 bottom-1" />
              <div className="absolute w-1 h-1 bg-black right-3 top-4 rounded-full" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-widest">PLAYBOY</h1>
          <h2 className="text-md tracking-[0.4em] mt-1">MEMBERSHIP CARD</h2>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6">

          {/* Photo + Name Block */}
          <div className="flex gap-4">
            <div className="w-[85px] h-[105px] border-2 border-[#D4AF37] rounded-lg overflow-hidden bg-pink-200">
              {image && <img src={image} alt="Profile" className="w-full h-full object-cover" />}
            </div>
            <div className="flex flex-col justify-start">
              <div className="uppercase font-bold text-xl leading-tight">{name}</div>
              <div className="text-xs text-[#D4AF37] mt-3">MEMBER NO.</div>
              <div className="text-lg font-bold">{memberNumber}</div>
            </div>
          </div>

          {/* City */}
          <div className="text-left text-lg">
            <span className="text-sm">CITY:</span>{" "}
            <strong className="uppercase tracking-wide">{city}</strong>
          </div>
        </div>

        {/* Signature */}
        <div className="border-t border-[#D4AF37] pt-4 text-right">
          <div className="text-xs text-[#D4AF37] text-left">SIGNATURE</div>
          <div className="text-xl italic font-[cursive] underline">{generateSignature(name)}</div>
        </div>
      </div>

      {/* Download Button */}
      <Button
        onClick={handleDownloadPDF}
        className="mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 text-lg rounded-md shadow-lg hover:scale-105 transition"
      >
        <Download className="mr-2 h-5 w-5" /> Download Card
      </Button>
    </div>
  );
};

export default PlayboyMembershipCardDocument;
