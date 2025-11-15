
import React, { useState, useEffect } from "react";
import AdminLayout from "../admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/api";

export default function ManagerPaymentFee() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    fetchFee();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("Profile_admin_token");
    if (!token) {
      navigate("/manage-payment-fee");
    }
  }, []);

  // Fetch payment fee data
  const fetchFee = async () => {
    setLoading(true);
    try {
      const response = await api.get("/fee/payment-fees");
      const fee = response.data.data;

      setFormData({
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
      toast.error("Error fetching payment fee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update payment fee data
  const updatePaymentFee = async (formData: any) => {
    try {
      await api.put("/fee/payment-fees", formData, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePaymentFee(formData);
      toast.success("Payment fee updated successfully");
      fetchFee();
    } catch {
      toast.error("Error updating payment fee. Please try again.");
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
        <div className="p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Payment Fees
          </h1>
          <p className="text-gray-600">
            View and update the payment fee configurations
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

// Reusable Input Component
function InputField({ label, name, value, onChange }: any) {
  return (
    <div className="w-1/2">   {/* ⬅️ Reduced input width */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
        required
      />
    </div>
  );
}
