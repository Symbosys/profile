
// import React, { useRef } from "react";
// import { Button } from "../ui/button";
// import { Download } from "lucide-react";
// import html2pdf from "html2pdf.js";

// interface PlayboyMembershipCardDocumentProps {
//   name?: string;
//   memberNumber?: string;
//   city?: string;
//   image?: string | null;
// }

// // Default sample card details (you can change these)
// const DEFAULT_DATA = {
//   name: "John Doe",
//   memberNumber: "PBX-987654",
//   city: "Los Angeles",
//   image: null,
// };

// const PlayboyMembershipCardDocument: React.FC<PlayboyMembershipCardDocumentProps> = ({
//   name = DEFAULT_DATA.name,
//   memberNumber = DEFAULT_DATA.memberNumber,
//   city = DEFAULT_DATA.city,
//   image = DEFAULT_DATA.image,
// }) => {
//   const printRef = useRef<HTMLDivElement>(null);

//   const generateSignature = (fullName: string): string => {
//     const words = fullName.trim().split(" ");
//     if (words.length === 1) return words[0];
//     const first = words[0][0];
//     const last = words[words.length - 1];
//     return `${first}. ${last}`;
//   };

//   const handleDownloadPDF = async () => {
//     if (!printRef.current) return;
//     const opt = {
//       margin: [0, 0, 0, 0] as [number, number, number, number],
//       filename: `Playboy_Membership_Card_${memberNumber}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { 
//         scale: 2, 
//         useCORS: true,
//         allowTaint: true,
//         letterRendering: true,
//         logging: false,
//         backgroundColor: '#ffffff'
//       },
//       jsPDF: { 
//         unit: "cm", 
//         format: "a4", 
//         orientation: "portrait" 
//       },
//       pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
//     };
//     const element = printRef.current;
//     html2pdf().set(opt).from(element).save();
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">

//       <div 
//         ref={printRef}
//         style={{
//           width: "21cm",
//           height: "29.7cm",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "white",
//           padding: "0",
//           boxSizing: "border-box",
//         }}
//       >
//         <div
//           style={{
//             width: "350px",
//             height: "550px",
//             background: "linear-gradient(145deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
//             border: "3px solid #D4AF37",
//             borderRadius: "20px",
//             padding: "24px",
//             color: "#D4AF37",
//             fontFamily: "Arial, sans-serif",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             boxSizing: "border-box",
//           }}
//         >

//           {/* Header */}
//           <div style={{ textAlign: "center" }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "center", 
//               marginBottom: "8px" 
//             }}>
//               <div style={{ 
//                 width: "36px", 
//                 height: "40px", 
//                 position: "relative" 
//               }}>
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "20px", 
//                   height: "20px", 
//                   backgroundColor: "#D4AF37", 
//                   borderRadius: "50%", 
//                   left: "8px", 
//                   top: "12px" 
//                 }} />
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "8px", 
//                   height: "20px", 
//                   backgroundColor: "#D4AF37", 
//                   borderRadius: "4px", 
//                   left: "0px", 
//                   top: "0px", 
//                   transform: "rotate(-15deg)"
//                 }} />
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "8px", 
//                   height: "20px", 
//                   backgroundColor: "#D4AF37", 
//                   borderRadius: "4px", 
//                   right: "0px", 
//                   top: "0px", 
//                   transform: "rotate(15deg)"
//                 }} />
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "12px", 
//                   height: "8px", 
//                   backgroundColor: "#D4AF37", 
//                   left: "12px", 
//                   bottom: "4px" 
//                 }} />
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "4px", 
//                   height: "4px", 
//                   backgroundColor: "black", 
//                   right: "12px", 
//                   top: "16px", 
//                   borderRadius: "50%" 
//                 }} />
//               </div>
//             </div>

//             <h1 style={{ 
//               fontSize: "1.875rem", 
//               fontWeight: "bold", 
//               letterSpacing: "0.1em",
//               margin: "0"
//             }}>PLAYBOY</h1>
//             <h2 style={{ 
//               fontSize: "1rem", 
//               letterSpacing: "0.4em",
//               margin: "4px 0 0 0"
//             }}>MEMBERSHIP CARD</h2>
//           </div>

//           {/* Body */}
//           <div style={{ 
//             display: "flex", 
//             flexDirection: "column", 
//             gap: "24px" 
//           }}>

//             {/* Photo + Name Block */}
//             <div style={{ 
//               display: "flex", 
//               gap: "16px" 
//             }}>
//               <div style={{ 
//                 width: "85px", 
//                 height: "105px", 
//                 border: "2px solid #D4AF37", 
//                 borderRadius: "8px", 
//                 overflow: "hidden", 
//                 backgroundColor: "#fecdd3",
//                 flexShrink: 0
//               }}>
//                 {image && <img src={image} alt="Profile" style={{ 
//                   width: "100%", 
//                   height: "100%", 
//                   objectFit: "cover" 
//                 }} />}
//               </div>
//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 justifyContent: "flex-start",
//                 flex: 1
//               }}>
//                 <div style={{ 
//                   textTransform: "uppercase", 
//                   fontWeight: "bold", 
//                   fontSize: "1.25rem", 
//                   lineHeight: "1.2" 
//                 }}>{name}</div>
//                 <div style={{ 
//                   fontSize: "0.75rem", 
//                   color: "#D4AF37", 
//                   marginTop: "12px" 
//                 }}>MEMBER NO.</div>
//                 <div style={{ 
//                   fontSize: "1.125rem", 
//                   fontWeight: "bold" 
//                 }}>{memberNumber}</div>
//               </div>
//             </div>

//             {/* City */}
//             <div style={{ 
//               textAlign: "left", 
//               fontSize: "1.125rem" 
//             }}>
//               <span style={{ fontSize: "0.875rem" }}>CITY:</span>{" "}
//               <strong style={{ 
//                 textTransform: "uppercase", 
//                 letterSpacing: "0.05em" 
//               }}>{city}</strong>
//             </div>
//           </div>

//           {/* Signature */}
//           <div style={{ 
//             borderTop: "1px solid #D4AF37", 
//             paddingTop: "16px", 
//             textAlign: "right" 
//           }}>
//             <div style={{ 
//               fontSize: "0.75rem", 
//               color: "#D4AF37", 
//               textAlign: "left",
//               marginBottom: "4px"
//             }}>SIGNATURE</div>
//             <div style={{ 
//               fontSize: "1.25rem", 
//               fontStyle: "italic", 
//               textDecoration: "underline",
//               fontFamily: "cursive, Arial, sans-serif"
//             }}>{generateSignature(name)}</div>
//           </div>
//         </div>
//       </div>

//       {/* Download Button */}
//       <Button
//         onClick={handleDownloadPDF}
//         className="mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 text-lg rounded-md shadow-lg hover:scale-105 transition"
//       >
//         <Download className="mr-2 h-5 w-5" /> Download Card
//       </Button>
//     </div>
//   );
// };

// export default PlayboyMembershipCardDocument;


// import React, { useRef } from "react";
// import { Button } from "../ui/button";
// import { Download } from "lucide-react";
// import html2pdf from "html2pdf.js";

// interface PlayboyMembershipCardDocumentProps {
//   name?: string;
//   memberNumber?: string;
//   city?: string;
//   image?: string | null;
// }

// // Default sample card details (you can change these)
// const DEFAULT_DATA = {
//   name: "John Doe",
//   memberNumber: "PBX-987654",
//   city: "Los Angeles",
//   image: null,
// };

// const PlayboyMembershipCardDocument: React.FC<PlayboyMembershipCardDocumentProps> = ({
//   name = DEFAULT_DATA.name,
//   memberNumber = DEFAULT_DATA.memberNumber,
//   city = DEFAULT_DATA.city,
//   image = DEFAULT_DATA.image,
// }) => {
//   const printRef = useRef<HTMLDivElement>(null);

//   const generateSignature = (fullName: string): string => {
//     const words = fullName.trim().split(" ");
//     if (words.length === 1) return words[0];
//     const first = words[0][0];
//     const last = words[words.length - 1];
//     return `${first}. ${last}`;
//   };

//   const handleDownloadPDF = () => {
//     if (!printRef.current) {
//       console.error("Print ref is null!"); // Debug if ref fails
//       return;
//     }
//     console.log("Generating PDF..."); // Debug log; remove after testing
//     setTimeout(() => {
//       const element = printRef.current!;
//       const opt = {
//         margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
//         filename: `Playboy_Membership_Card_${memberNumber}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { 
//           scale: 2, 
//           useCORS: true,
//           allowTaint: true,
//           letterRendering: true,
//           logging: false,
//           backgroundColor: '#ffffff'
//         },
//         jsPDF: { 
//           unit: "cm", 
//           format: "a4", 
//           orientation: "portrait" 
//         },
//         pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
//       };
//       html2pdf().set(opt).from(element).save();
//     }, 1000); // Delay to ensure image and styles load
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">

//       <div 
//         ref={printRef}
//         style={{
//           width: "21cm",
//           height: "29.7cm",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "white",
//           padding: "0",
//           boxSizing: "border-box",
//           fontFamily: "Arial, sans-serif" // Fallback font
//         }}
//       >
//         <div
//           style={{
//             width: "350px",
//             height: "550px",
//             background: "linear-gradient(145deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
//             border: "3px solid #D4AF37",
//             borderRadius: "20px",
//             padding: "24px",
//             color: "#D4AF37",
//             fontFamily: "Arial, sans-serif",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             boxSizing: "border-box",
//           }}
//         >

//           {/* Header */}
//           <div style={{ textAlign: "center" }}>
//             <div style={{ 
//               display: "flex", 
//               justifyContent: "center", 
//               marginBottom: "8px" 
//             }}>
//               <div style={{ 
//                 width: "36px", 
//                 height: "40px", 
//                 position: "relative" 
//               }}>
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "20px", 
//                   height: "20px", 
//                   backgroundColor: "#D4AF37", 
//                   borderRadius: "50%", 
//                   left: "8px", 
//                   top: "12px" 
//                 }} />
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "8px", 
//                   height: "20px", 
//                   backgroundColor: "#D4AF37", 
//                   borderRadius: "4px", 
//                   left: "0px", 
//                   top: "0px", 
//                   transform: "rotate(-15deg)"
//                 }} />
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "8px", 
//                   height: "20px", 
//                   backgroundColor: "#D4AF37", 
//                   borderRadius: "4px", 
//                   right: "0px", 
//                   top: "0px", 
//                   transform: "rotate(15deg)"
//                 }} />
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "12px", 
//                   height: "8px", 
//                   backgroundColor: "#D4AF37", 
//                   left: "12px", 
//                   bottom: "4px" 
//                 }} />
//                 <div style={{ 
//                   position: "absolute", 
//                   width: "4px", 
//                   height: "4px", 
//                   backgroundColor: "black", 
//                   right: "12px", 
//                   top: "16px", 
//                   borderRadius: "50%" 
//                 }} />
//               </div>
//             </div>

//             <h1 style={{ 
//               fontSize: "1.875rem", 
//               fontWeight: "bold", 
//               letterSpacing: "0.1em",
//               margin: "0"
//             }}>PLAYBOY</h1>
//             <h2 style={{ 
//               fontSize: "1rem", 
//               letterSpacing: "0.4em",
//               margin: "4px 0 0 0"
//             }}>MEMBERSHIP CARD</h2>
//           </div>

//           {/* Body */}
//           <div style={{ 
//             display: "flex", 
//             flexDirection: "column", 
//             gap: "24px" 
//           }}>

//             {/* Photo + Name Block */}
//             <div style={{ 
//               display: "flex", 
//               gap: "16px" 
//             }}>
//               <div style={{ 
//                 width: "85px", 
//                 height: "105px", 
//                 border: "2px solid #D4AF37", 
//                 borderRadius: "8px", 
//                 overflow: "hidden", 
//                 backgroundColor: "#fecdd3",
//                 flexShrink: 0
//               }}>
//                 {image && <img src={image} alt="Profile" style={{ 
//                   width: "100%", 
//                   height: "100%", 
//                   objectFit: "cover" 
//                 }} />}
//               </div>
//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 justifyContent: "flex-start",
//                 flex: 1
//               }}>
//                 <div style={{ 
//                   textTransform: "uppercase", 
//                   fontWeight: "bold", 
//                   fontSize: "1.25rem", 
//                   lineHeight: "1.2" 
//                 }}>{name}</div>
//                 <div style={{ 
//                   fontSize: "0.75rem", 
//                   color: "#D4AF37", 
//                   marginTop: "12px" 
//                 }}>MEMBER NO.</div>
//                 <div style={{ 
//                   fontSize: "1.125rem", 
//                   fontWeight: "bold" 
//                 }}>{memberNumber}</div>
//               </div>
//             </div>

//             {/* City */}
//             <div style={{ 
//               textAlign: "left", 
//               fontSize: "1.125rem" 
//             }}>
//               <span style={{ fontSize: "0.875rem" }}>CITY:</span>{" "}
//               <strong style={{ 
//                 textTransform: "uppercase", 
//                 letterSpacing: "0.05em" 
//               }}>{city}</strong>
//             </div>
//           </div>

//           {/* Signature */}
//           <div style={{ 
//             borderTop: "1px solid #D4AF37", 
//             paddingTop: "16px", 
//             textAlign: "right" 
//           }}>
//             <div style={{ 
//               fontSize: "0.75rem", 
//               color: "#D4AF37", 
//               textAlign: "left",
//               marginBottom: "4px"
//             }}>SIGNATURE</div>
//             <div style={{ 
//               fontSize: "1.25rem", 
//               fontStyle: "italic", 
//               textDecoration: "underline",
//               fontFamily: "cursive, Arial, sans-serif"
//             }}>{generateSignature(name)}</div>
//           </div>
//         </div>
//       </div>

//       {/* Download Button */}
//       <Button
//         onClick={handleDownloadPDF}
//         className="mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 text-lg rounded-md shadow-lg hover:scale-105 transition"
//       >
//         <Download className="mr-2 h-5 w-5" /> Download Card
//       </Button>
//     </div>
//   );
// };

// export default PlayboyMembershipCardDocument;



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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      <div 
        ref={printRef}
        className="w-[350px] h-[550px] bg-gradient-to-br from-black via-gray-900 to-black border-[3px] border-yellow-600 rounded-[20px] p-6 text-yellow-600 flex flex-col justify-between"
        style={{
          fontFamily: "Arial, sans-serif"
        }}
      >

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="w-9 h-10 relative">
              <div className="absolute w-5 h-5 bg-yellow-600 rounded-full left-2 top-3" />
              <div className="absolute w-2 h-5 bg-yellow-600 rounded left-0 top-0 -rotate-[15deg]" />
              <div className="absolute w-2 h-5 bg-yellow-600 rounded right-0 top-0 rotate-[15deg]" />
              <div className="absolute w-3 h-2 bg-yellow-600 left-3 bottom-1" />
              <div className="absolute w-1 h-1 bg-black right-3 top-4 rounded-full" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-widest m-0">PLAYBOY</h1>
          <h2 className="text-base tracking-[0.4em] mt-1 mb-0">MEMBERSHIP CARD</h2>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6">

          {/* Photo + Name Block */}
          <div className="flex gap-4">
            <div className="w-[85px] h-[105px] border-2 border-yellow-600 rounded-lg overflow-hidden bg-rose-200 flex-shrink-0">
              {image && <img src={image} alt="Profile" className="w-full h-full object-cover" />}
            </div>
            <div className="flex flex-col justify-start flex-1">
              <div className="uppercase font-bold text-xl leading-tight">{name}</div>
              <div className="text-xs text-yellow-600 mt-3">MEMBER NO.</div>
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
        <div className="border-t border-yellow-600 pt-4 text-right">
          <div className="text-xs text-yellow-600 text-left mb-1">SIGNATURE</div>
          <div className="text-xl italic underline" style={{ fontFamily: "cursive, Arial, sans-serif" }}>
            {generateSignature(name)}
          </div>
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