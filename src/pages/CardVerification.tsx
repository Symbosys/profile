import type { ChangeEvent } from "react";
import { useFormStore } from "../store/formStore" // adjust path as needed

interface CardVerificationProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: string, value: unknown) => void;
  formData: {
    cardFile?: File | null;
    cardPreview?: string | null;
    [key: string]: unknown;
  };
}

export default function CardVerification({
  nextStep,
  prevStep,
  updateData,
  formData,
}: CardVerificationProps) {
  const { cardPreview, setCardPreview, setCardFile } = useFormStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCardPreview(result);
        setCardFile(selectedFile);

        updateData("cardPreview", result);
        updateData("cardFile", selectedFile);
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
        {cardPreview && (
          <img src={cardPreview} alt="Preview" className="mb-3 max-h-[300px]" />
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
