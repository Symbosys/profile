import { Loader2 } from "lucide-react"; 
import { useEffect } from "react";
import { useQRStore } from "../../hook/useQrCode";

export default function QRPaymentDisplay() {
  const { qrCode, loading, fetchQRCode } = useQRStore();

  useEffect(() => {
    if (!qrCode && !loading) {
      fetchQRCode();
    }
  }, [qrCode, loading, fetchQRCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!qrCode || !qrCode.image) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center">
          <p className="text-red-600 font-semibold">No QR code available at the moment.</p>
          <p className="text-gray-500 mt-2">Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Scan to Pay
          </h1>
          <p className="text-gray-600">Quick and secure payment via UPI</p>
        </div>

        {/* QR Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-100">
          {/* QR Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={qrCode.image.secure_url}
                alt="Payment QR Code"
                className="w-48 h-48 rounded-xl shadow-lg border-4 border-white bg-white p-2"
              />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                ✓
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Or Send To</p>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg transform hover:shadow-xl transition-shadow duration-300">
              <span className="text-2xl font-mono font-bold">{qrCode.phone}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3 text-center">
            <p className="text-sm text-gray-600">
              Open your UPI app (Google Pay, PhonePe, Paytm) and scan the QR code above.
            </p>
            <p className="text-sm text-gray-600">
              Or, enter the phone number manually to send money instantly.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-2xl pointer-events-none"></div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>Safe & Secure • Instant Transfer</p>
        </div>
      </div>
    </div>
  );
}