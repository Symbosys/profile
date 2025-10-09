import type { ChangeEvent } from "react";
import { useFormStore } from "../store/formStore"; // Adjust the import path if needed

interface JoiningFormChangeProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    joiningFile?: File | null;
    joiningPreview?: string | null;
    [key: string]: unknown;
  };
}

export default function JoiningFormChange({
  nextStep,
  prevStep,
  updateData,
  formData,
}: JoiningFormChangeProps) {
  const {
    joiningPreview,
    setJoiningPreview,
    setJoiningFile,
  } = useFormStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setJoiningPreview(result);
        setJoiningFile(selectedFile);

        updateData("joiningPreview", result);
        updateData("joiningFile", selectedFile);
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
        {joiningPreview && (
          <img src={joiningPreview} alt="Preview" className="mb-3 max-h-[300px]" />
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

