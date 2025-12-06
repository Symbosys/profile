import { Image, Phone, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api/api";
import AdminLayout from "./AdminLayout";

interface QRCodeData {
  id: number;
  phone: string | null;
  image: { public_id: string; secure_url: string } | null;
  createdAt: string;
  updatedAt: string;
}

export default function QRCodeManager() {
  const [formData, setFormData] = useState({
    phone: "",
    image: null as File | null,
  });
  const [qrCode, setQrCode] = useState<QRCodeData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.phone && !formData.image) {
      newErrors.form = "Either phone number or image is required";
    }
    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    return newErrors;
  };

  useEffect(() => {
    const newErrors = validateForm();
    setErrors(newErrors);
  }, [formData.phone, formData.image]);

  useEffect(() => {
    const fetchQRCode = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/qr/get");
        const qrData = response.data.data;
        setQrCode(qrData);
        setFormData((prev) => ({
          ...prev,
          phone: qrData.phone || "",
        }));
      } catch (error: any) {
        if (error.response?.status === 404) {
          setQrCode(null);
          toast.info("No QR code exists. Please create one.");
        } else {
          toast.error(
            error.response?.data?.message || "Failed to fetch QR code"
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchQRCode();
  }, []);

  const handlePhoneChange = (value: string) => {
    const formattedValue = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: formattedValue }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Only JPEG, PNG, and WEBP images are allowed",
        }));
        setFormData((prev) => ({ ...prev, image: null }));
        setPreviewUrl(null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "File size must be less than 10MB",
        }));
        setFormData((prev) => ({ ...prev, image: null }));
        setPreviewUrl(null);
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async () => {
    if (isLoading || Object.keys(errors).length > 0) {
      return;
    }
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      if (formData.phone) {
        formDataToSend.append("phone", formData.phone);
      }
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
      const response = await api.put("/qr/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setQrCode(response.data.data);
      setFormData({ phone: response.data.data.phone || "", image: null });
      setPreviewUrl(null);
      toast.success(
        qrCode
          ? "QR code updated successfully!"
          : "QR code created successfully!"
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewUrl(null);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      <div className="space-y-6">
        {/* Info Header */}
        <div className="bg-blue-50 border border-blue-100 p-4 sm:p-5 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            QR Code Manager
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            {qrCode
              ? "Update the existing QR code for payments."
              : "Create a QR code for payments."}
          </p>
          <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
            <li>Provide either a phone number, an image, or both</li>
            <li>Image must be JPEG, PNG, or WEBP (max 10MB)</li>
            <li>Phone number must be 10 digits</li>
          </ul>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center my-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              {qrCode ? "Update Details" : "Create New"}
            </h3>
          </div>
          
          <div className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Phone Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 inline mr-1 text-gray-500" />
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Image Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <Image className="w-4 h-4 inline mr-1 text-gray-500" />
                  QR Code Image
                </label>
                
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  disabled={isLoading}
                  className={`block w-full text-sm text-gray-500
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    cursor-pointer
                    ${errors.image ? "text-red-500" : ""}`}
                />

                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}

                {/* Preview Image */}
                {previewUrl && (
                  <div className="mt-4 relative inline-block group">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full max-w-[200px] h-auto object-contain rounded-lg border border-gray-200 shadow-sm"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-md text-red-600 hover:text-red-800 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {errors.form && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                <p className="text-red-600 text-sm text-center font-medium">{errors.form}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleSubmit}
                disabled={isLoading || Object.keys(errors).length > 0}
                className={`w-full sm:w-auto sm:min-w-[150px] px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all flex items-center justify-center mx-auto sm:mx-0 ${
                  isLoading || Object.keys(errors).length > 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:transform active:scale-95"
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  qrCode ? "Update Changes" : "Create QR Code"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Current Details Card */}
        {qrCode && (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
             <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Current Configuration
              </h3>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Info Column */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide font-semibold text-gray-500 mb-1">
                      Registered Phone
                    </p>
                    <p className="text-lg text-gray-900 font-medium font-mono bg-gray-50 inline-block px-3 py-1 rounded">
                      {qrCode.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                     <p className="text-xs uppercase tracking-wide font-semibold text-gray-500 mb-1">
                      Last Updated
                    </p>
                     <p className="text-sm text-gray-600">
                      {new Date(qrCode.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Image Column */}
                <div>
                  <p className="text-xs uppercase tracking-wide font-semibold text-gray-500 mb-2">
                    Active QR Image
                  </p>
                  <div className="bg-gray-50 p-2 rounded-lg border border-dashed border-gray-300 inline-block">
                    {qrCode.image && qrCode.image.secure_url ? (
                      <img
                        src={qrCode.image.secure_url}
                        alt="Current QR Code"
                        className="w-full max-w-[200px] h-auto object-contain rounded"
                      />
                    ) : (
                      <div className="w-32 h-32 flex items-center justify-center text-gray-400 text-sm italic">
                        No image
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}