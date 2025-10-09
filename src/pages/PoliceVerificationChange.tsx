import type { ChangeEvent } from "react";
import { useFormStore } from "../store/formStore"; // Update the path to your store

interface PoliceVerificationChangeProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    policeFile?: File | null;
    policePreview?: string | null;
    [key: string]: unknown;
  };
}

export default function PoliceVerificationChange({
  nextStep,
  prevStep,
  updateData,
  formData,
}: PoliceVerificationChangeProps) {
  const { policePreview, setPoliceFile, setPolicePreview } = useFormStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPolicePreview(result);
        setPoliceFile(selectedFile);

        updateData("policePreview", result);
        updateData("policeFile", selectedFile);
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
        {policePreview && (
          <img src={policePreview} alt="Preview" className="mb-3 max-h-[300px]" />
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
