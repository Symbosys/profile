// import { useState } from "react";
// import type { ChangeEvent } from "react";

// interface SecretarySafetyChangeProps {
//   nextStep: () => void;
//   prevStep: () => void;
//   updateData: (key: string, value: unknown) => void;
//   formData: {
//     secretaryFile?: File | null;
//     secretaryPreview?: string | null;
//     [key: string]: unknown; // allow extra fields
//   };
// }

// export default function SecretarySafetyChange({
//   nextStep,
//   prevStep,
//   updateData,
//   formData,
// }: SecretarySafetyChangeProps) {
//   const [preview, setPreview] = useState<string | null>(
//     formData.secretaryPreview || null
//   );

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;

//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const result = reader.result as string;
//         setPreview(result);
//         updateData("secretaryPreview", result);
//         updateData("secretaryFile", selectedFile);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col justify-center items-center">
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="mb-3 border border-gray-300 p-2 rounded-lg"
//         />
//         {preview && (
//           <img src={preview} alt="Preview" className="mb-3 max-h-[300px]" />
//         )}
//       </div>

//       <div className="flex justify-between mt-20">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 rounded"
//           onClick={prevStep}
//         >
//           Previous
//         </button>
//         <button
//           type="button"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={nextStep}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



import type { ChangeEvent } from "react";
import { useFormStore } from "../store/formStore"; // Adjust path if needed

interface SecretarySafetyChangeProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    secretaryFile?: File | null;
    secretaryPreview?: string | null;
    [key: string]: unknown;
  };
}

export default function SecretarySafetyChange({
  nextStep,
  prevStep,
  updateData,
}: SecretarySafetyChangeProps) {
  const {
    secretaryPreview,
    setSecretaryPreview,
    setSecretaryFile,
  } = useFormStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSecretaryPreview(result);
        setSecretaryFile(selectedFile);

        updateData("secretaryPreview", result);
        updateData("secretaryFile", selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-3 border border-gray-300 p-2 rounded-lg"
        />
        {secretaryPreview && (
          <img src={secretaryPreview} alt="Preview" className="mb-3 max-h-[300px]" />
        )}
      </div>

      <div className="flex justify-between mt-20">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={prevStep}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}
