import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";
import type { Profile } from "../../store/profile";

interface PlayboyMembershipCardDocumentProps {
  profile: Profile | null | undefined;
}

const DEFAULT_DATA = {
  name: "John Doe",
  dateOfBirth: "1990-01-01",
  gender: "Male" as const,
  partyNumber: "PBX-987654",
  city: "Los Angeles",
  state: "CA",
  address: "123 Playboy Blvd",
  email: "john@example.com",
  website: "https://www.playboy.com",
  image: null as string | null,
};

const PlayboyMembershipCardDocument: React.FC<PlayboyMembershipCardDocumentProps> = ({ profile }) => {
  const name = profile?.name || DEFAULT_DATA.name;
  const dateOfBirth = profile?.dateOfBirth || DEFAULT_DATA.dateOfBirth;
  const gender = (profile?.gender as "Male" | "Female") || DEFAULT_DATA.gender;
  const partyNumber = profile?.name || DEFAULT_DATA.partyNumber;
  // const city = DEFAULT_DATA.city;
  const state = profile?.state || DEFAULT_DATA.state;
  const address = profile?.address || DEFAULT_DATA.address;
  const email = profile?.email || DEFAULT_DATA.email;
  const website = profile?.website || DEFAULT_DATA.website;
  const phone = profile?.phone || "";
  const imageUrl = profile?.customerImage?.url || DEFAULT_DATA.image;

  const printRef = useRef<HTMLDivElement>(null);

  const generateSignature = (fullName: string): string => {
    const words = fullName.trim().split(" ");
    if (words.length === 1) return words[0];
    const first = words[0][0];
    const last = words[words.length - 1];
    return `${first}. ${last}`;
  };

  const formatDOB = (dateOfBirth: string): string => {
    if (!dateOfBirth) return "";
    const [year, month, day] = dateOfBirth.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleDownloadPDF = () => {
    if (!printRef.current) {
      console.error("Print ref is null!");
      return;
    }

    setTimeout(() => {
      const element = printRef.current!;
      const opt = {
        margin: 0 as any,
        filename: `Playboy_Membership_Card_${partyNumber}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          letterRendering: true,
          logging: false,
          backgroundColor: "#000000",
        },
        jsPDF: {
          unit: "px",
          format: [350, 550] as any,
          orientation: "portrait",
          hotfixes: ["px_scaling"],
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      html2pdf().set(opt).from(element).save();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-2 sm:p-4 md:p-6 overflow-x-auto">
      
      {/* Card */}
      <div
        ref={printRef}
        className="mx-auto w-[350px] h-[550px] rounded-[20px] p-6 flex flex-col justify-between"
        style={{
          fontFamily: "Arial, sans-serif",
          background: "linear-gradient(to bottom right, #000000, #111827, #000000)",
          border: "3px solid #d97706",
          color: "#d97706",
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="w-9 h-10 relative">
              <div className="absolute w-5 h-5 rounded-full left-2 top-3" style={{ backgroundColor: "#d97706" }} />
              <div className="absolute w-2 h-5 rounded left-0 top-0 -rotate-[15deg]" style={{ backgroundColor: "#d97706" }} />
              <div className="absolute w-2 h-5 rounded right-0 top-0 rotate-[15deg]" style={{ backgroundColor: "#d97706" }} />
              <div className="absolute w-3 h-2 left-3 bottom-1" style={{ backgroundColor: "#d97706" }} />
              <div className="absolute w-1 h-1 right-3 top-4 rounded-full" style={{ backgroundColor: "#000000" }} />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-widest m-0">PLAYBOY</h1>
          <h2 className="text-base tracking-[0.4em] mt-1 mb-0">MEMBERSHIP CARD</h2>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3">
          
          {/* Image + Name */}
          <div className="flex gap-4">
            <div
              className="w-[85px] h-[105px] rounded-lg overflow-hidden flex-shrink-0"
              style={{ border: "2px solid #d97706", backgroundColor: "#fecaca" }}
            >
              {imageUrl && <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />}
            </div>

            <div className="flex flex-col justify-start flex-1">
              <div className="uppercase font-bold text-xl leading-tight">{name}</div>
              <div className="text-xs mt-3" style={{ color: "#d97706" }}>
                PARTY NO.
              </div>
              <div className="text-lg font-bold">{partyNumber}</div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1 text-xs leading-tight">
            <div>
              <span style={{ color: "#d97706" }}>DOB:</span> <strong>{formatDOB(dateOfBirth)}</strong>
            </div>
            <div>
              <span style={{ color: "#d97706" }}>GENDER:</span> <strong>{gender.charAt(0)}</strong>
            </div>
            <div className="text-sm">
              <span style={{ color: "#d97706" }}>CITY/STATE:</span>{" "}
              <strong className="uppercase tracking-wider">
                {DEFAULT_DATA.city}, {state}
              </strong>
            </div>
            <div className="mt-1">
              <span style={{ color: "#d97706" }}>ADDRESS:</span> <strong>{address}</strong>
            </div>
            <div>
              <span style={{ color: "#d97706" }}>EMAIL:</span> <strong>{email}</strong>
            </div>
            <div>
              <span style={{ color: "#d97706" }}>WEBSITE:</span> <strong>{website}</strong>
            </div>

            <div>
              <span style={{ color: "#d97706" }}>PHONE:</span> <strong>{phone}</strong>
            </div>
          </div>

        </div>

        {/* Signature */}
        <div className="pt-4 text-right" style={{ borderTop: "1px solid #d97706" }}>
          <div className="text-xs text-left mb-1" style={{ color: "#d97706" }}>
            SIGNATURE
          </div>
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