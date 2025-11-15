
import { useRef } from "react";
import { Button } from "../ui/button";
import html2pdf from "html2pdf.js";
import type { Profile } from "../../store/profile";


const MedicalKitChargeDocument= ({profile}: {profile: Profile | null}) => {
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
    <div className="w-full flex flex-col items-center py-4 sm:py-8 bg-gray-100">
      <div
        ref={printRef}
        className="bg-white p-4 sm:p-10 shadow-xl w-full max-w-[700px] leading-6 sm:leading-7 text-center font-serif text-black mx-auto"
      >
        <h2 className="text-base sm:text-lg font-semibold mb-2">Company / Organization Name</h2>

        <h1 className="text-base sm:text-xl font-bold mb-4 sm:mb-6">Service Charge Details /</h1>

        <h2 className="text-sm sm:text-base font-semibold mb-2">2. Medical Kit Charge / मेडिकल किट शुल्क</h2>

        <p className="font-semibold mb-1">Description:</p>

        <p className="text-xs sm:text-sm mb-3 sm:mb-4" style={{ textAlign: "justify" }}>
          This charge covers the cost of hygiene, health, and essential wellness materials provided during
          meetings, to ensure the safety, comfort, and well-being of both clients and associates.
        </p>

        <p className="text-xs sm:text-sm mb-4 sm:mb-6" style={{ textAlign: "justify" }}>
          यह शुल्क बैठक के दौरान ग्राहक और सहयोगियों की सुरक्षा, सुविधा और स्वास्थ्य सुनिश्चित करने हेतु 
          स्वच्छता, स्वास्थ्य तथा आवश्यक वेलनेस सामग्रियों की आपूर्ति की लागत को कवर करता है।
        </p>

        <h3 className="font-semibold mb-2 sm:mb-3">Included Items / शामिल सामग्री:</h3>

        <div className="space-y-1 text-xs sm:text-sm">
          <p>Condom / कंडोम</p>
          <p>Energy Drink / एनर्जी ड्रिंक</p>
          <p>Scotch / सकोच</p>
          <p>Basic Medicines (Pain Relief, Antacid, First-Aid) / मूल दवाइयाँ (दर्द निवारक, एंटीएसिड, फर्स्ट-एड)</p>
          <p>Sanitizer & Tissues / सेनिटाइज़र और टिश्यू</p>
          <p>Mask & Gloves / मास्क और दस्ताने</p>
          <p>Other Medical Essentials / अन्य चिकित्सीय आवश्यकताएँ</p>
        </div>

        <h3 className="font-semibold mt-6 sm:mt-8 mb-2 sm:mb-3">Refund Policy / वापसी नीति:</h3>

        <p className="text-xs sm:text-sm" style={{ textAlign: "justify" }}>
          Refundable – The full amount will be returned to the client upon successful completion of the service.
        </p>

        <p className="text-xs sm:text-sm" style={{ textAlign: "justify" }}>
          वापसी योग्य – सेवा पूर्ण होने के पश्चात संपूर्ण राशि ग्राहक को लौटा दी जाएगी।
        </p>
      </div>

      <Button
        className="mt-4 sm:mt-6 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:scale-105 transition"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </Button>
    </div>
  );
};

export default MedicalKitChargeDocument;