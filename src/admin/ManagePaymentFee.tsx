import React, { useState, useEffect } from "react";
import AdminLayout from "../admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/api";

export default function ManagerPaymentFee() {
  const [loading, setLoading] = useState(true);
  
  // 1. Added all missing fields to state
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    whatsapp1: "",
    whatsapp2: "",
    whatsapp3: "",
    whatsapp4: "",
    registrationFee: "",
    cardVerificationFee: "",
    hotelBookingFee: "",
    medicalKitFee: "",
    policeVerificationFee: "",
    nocFee: "",
    locationVerificationFee: "",
    secretarySafetyFee: "",
    enquiryVerificationFee: "",
    incomeGstFee: "",
    phoneVerificationFee: "",
    joiningFromFee: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Basic auth check
    const token = localStorage.getItem("Profile_admin_token");
    if (!token) {
      // Logic seems circular in original code (navigating to same page), 
      // typically you'd redirect to /login, but keeping as requested.
      navigate("/manage-payment-fee"); 
    }
    fetchFee();
  }, [navigate]);

  // Fetch payment fee data
  const fetchFee = async () => {
    setLoading(true);
    try {
      const response = await api.get("/fee/payment-fees");
      const fee = response.data.data;

      // 2. Map API response to state
      setFormData({
        phoneNumber: fee?.phoneNumber || "",
        email: fee?.email || "",
        whatsapp1: fee?.whatsapp1 || "",
        whatsapp2: fee?.whatsapp2 || "",
        whatsapp3: fee?.whatsapp3 || "",
        whatsapp4: fee?.whatsapp4 || "",
        registrationFee: fee?.registrationFee || "",
        cardVerificationFee: fee?.cardVerificationFee || "",
        hotelBookingFee: fee?.hotelBookingFee || "",
        medicalKitFee: fee?.medicalKitFee || "",
        policeVerificationFee: fee?.policeVerificationFee || "",
        nocFee: fee?.nocFee || "",
        locationVerificationFee: fee?.locationVerificationFee || "",
        secretarySafetyFee: fee?.secretarySafetyFee || "",
        enquiryVerificationFee: fee?.enquiryVerificationFee || "",
        incomeGstFee: fee?.incomeGstFee || "",
        phoneVerificationFee: fee?.phoneVerificationFee || "",
        joiningFromFee: fee?.joiningFromFee || "",
      });
    } catch (error: any) {
      toast.error("Error fetching configuration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/fee/payment-fees", formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Configuration updated successfully");
      fetchFee();
    } catch {
      toast.error("Error updating configuration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            System Configuration
          </h1>
          <p className="text-gray-600">
            Manage contact details and payment fees
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8"
        >
          {/* Section 1: Contact Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                label="Primary Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 2: WhatsApp Support */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              WhatsApp Support Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="WhatsApp 1"
                name="whatsapp1"
                value={formData.whatsapp1}
                onChange={handleChange}
              />
              <InputField
                label="WhatsApp 2"
                name="whatsapp2"
                value={formData.whatsapp2}
                onChange={handleChange}
              />
              <InputField
                label="WhatsApp 3"
                name="whatsapp3"
                value={formData.whatsapp3}
                onChange={handleChange}
              />
              <InputField
                label="WhatsApp 4"
                name="whatsapp4"
                value={formData.whatsapp4}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 3: Fee Configuration */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Fee Structure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Registration Fee"
                name="registrationFee"
                value={formData.registrationFee}
                onChange={handleChange}
              />
              <InputField
                label="Card Verification Fee"
                name="cardVerificationFee"
                value={formData.cardVerificationFee}
                onChange={handleChange}
              />
              <InputField
                label="Hotel Booking Fee"
                name="hotelBookingFee"
                value={formData.hotelBookingFee}
                onChange={handleChange}
              />
              <InputField
                label="Medical Kit Fee"
                name="medicalKitFee"
                value={formData.medicalKitFee}
                onChange={handleChange}
              />
              <InputField
                label="Police Verification Fee"
                name="policeVerificationFee"
                value={formData.policeVerificationFee}
                onChange={handleChange}
              />
              <InputField
                label="NOC Fee"
                name="nocFee"
                value={formData.nocFee}
                onChange={handleChange}
              />
              <InputField
                label="Location Verification Fee"
                name="locationVerificationFee"
                value={formData.locationVerificationFee}
                onChange={handleChange}
              />
              <InputField
                label="Secretary Safety Fee"
                name="secretarySafetyFee"
                value={formData.secretarySafetyFee}
                onChange={handleChange}
              />
              <InputField
                label="Enquiry Verification Fee"
                name="enquiryVerificationFee"
                value={formData.enquiryVerificationFee}
                onChange={handleChange}
              />
              <InputField
                label="Income GST Fee"
                name="incomeGstFee"
                value={formData.incomeGstFee}
                onChange={handleChange}
              />
              <InputField
                label="Phone Verification Fee"
                name="phoneVerificationFee"
                value={formData.phoneVerificationFee}
                onChange={handleChange}
              />
              <InputField
                label="Joining Form Fee"
                name="joiningFromFee"
                value={formData.joiningFromFee}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

// Updated Input Component
// Now takes 'type' prop (defaults to text) and uses w-full to let parent Grid control width
function InputField({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        required
      />
    </div>
  );
}