import type { ChangeEvent } from "react";
import { useFormStore } from "../store/formStore"; // Update path if needed

interface LocationVerificationChangeProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    locationFile?: File | null;
    locationPreview?: string | null;
    [key: string]: unknown;
  };
}

export default function LocationVerificationChange({
  nextStep,
  prevStep,
  updateData,
  formData,
}: LocationVerificationChangeProps) {
  const {
    locationPreview,
    setLocationPreview,
    setLocationFile,
  } = useFormStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLocationPreview(result);
        setLocationFile(selectedFile);

        updateData("locationPreview", result);
        updateData("locationFile", selectedFile);
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
        {locationPreview && (
          <img src={locationPreview} alt="Preview" className="mb-3 max-h-[300px]" />
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
