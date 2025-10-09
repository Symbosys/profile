import type { ChangeEvent } from "react";
import { useFormStore } from "../store/formStore"; // Adjust the path as needed

interface MedicalKitChangeProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    medicalKitFile?: File | null;
    medicalKitPreview?: string | null;
    [key: string]: unknown;
  };
}

export default function MedicalKitChange({
  nextStep,
  prevStep,
  updateData,
  formData,
}: MedicalKitChangeProps) {
  const {
    medicalKitPreview,
    setMedicalKitPreview,
    setMedicalKitFile,
  } = useFormStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setMedicalKitPreview(result);
        setMedicalKitFile(selectedFile);

        updateData("medicalKitPreview", result);
        updateData("medicalKitFile", selectedFile);
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
          className="mb-3 border-1 border-gray-300 p-2 rounded-lg"
        />
        {medicalKitPreview && (
          <img src={medicalKitPreview} alt="Preview" className="mb-3 max-h-[300px]" />
        )}
      </div>

      <div className="flex justify-between mt-20">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={prevStep}
          type="button"
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={nextStep}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
