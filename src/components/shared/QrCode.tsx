import { Loader2, Copy, Check } from "lucide-react"; 
import { useEffect, useState } from "react";
import { useQRStore } from "../../hook/useQrCode";
import { toast } from "sonner";

export default function QRPaymentDisplay() {
  const { qrCode, loading, fetchQRCode } = useQRStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!qrCode && !loading) {
      fetchQRCode();
    }
  }, [qrCode, loading, fetchQRCode]);

  const handleCopy = async () => {
    if (qrCode?.phone) {
      try {
        await navigator.clipboard.writeText(qrCode.phone);
        setCopied(true);
        toast.success("Phone number copied!");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy", error);
        toast.error("Failed to copy phone number");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!qrCode || !qrCode.image) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-red-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg">No QR code available at the moment.</p>
          <p className="text-gray-500 mt-2">Please contact support for assistance.</p>
        </div>
      </div>
    );
  }

  // Cache-buster to ensure fresh image load
  const imageSrc = `${qrCode.image.secure_url}?t=${Date.now()}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Scan to Pay
          </h1>
          <p className="text-gray-600 font-medium">Quick and secure payment via UPI</p>
        </div>

        {/* QR Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
          {/* QR Image */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-white rounded-xl p-4 shadow-md border border-gray-200">
              <img
                src={imageSrc}
                alt="Payment QR Code"
                className="w-48 h-48 object-contain"
                width={192}
                height={192}
                onError={(e) => {
                  // Fallback if image fails to load
                  console.error("QR Image load error");
                  (e.target as HTMLImageElement).src = `${qrCode?.image?.secure_url}?t=${Date.now() + 1}`;
                }}
              />
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-md">
                ✓
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="text-center mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Or Send To</p>
            <div className="flex justify-center items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-md border border-blue-500/20 min-w-0 flex-1 max-w-xs">
                <span className="text-xl font-mono font-semibold truncate">{qrCode.phone}</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-2.5 bg-black hover:bg-blue/30 rounded-lg transition-colors duration-200 flex items-center justify-center border border-white/30 shadow-sm hover:shadow-md"
                title={copied ? "Copied!" : "Copy number"}
                type="button"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-300" />
                ) : (
                  <Copy className="h-4 w-4 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2 text-center text-sm">
            <p className="text-gray-700 font-medium">
              Open your UPI app (Google Pay, PhonePe, Paytm) and scan the QR code.
            </p>
            <p className="text-gray-600">
              Or, enter the phone number manually to send money instantly.
            </p>
          </div>

          {/* Subtle Decorative Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/2 via-indigo-500/2 to-purple-500/2 rounded-2xl pointer-events-none"></div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500 font-medium">
          <p>Safe & Secure • Instant Transfer</p>
        </div>
      </div>
    </div>
  );
}