// claude

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertCircle, FileText, Download } from "lucide-react";
import html2pdf from "html2pdf.js";

interface FormData {
    applicationNumber: string;
    applicationDate: string;
    certificateDate: string;
    applicantName: string;
    fatherName: string;
    address: string;
    pincode: string;
    state: string;
    subject: string;
    stationName: string;
    remarks: string;
    photoUrl: string;
}

const PoliceClearanceGenerator: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        applicationNumber: "THCR1302400046815",
        applicationDate: "2024-11-04",
        certificateDate: "2024-11-04",
        applicantName: "PADIYAR MAYUR ESHWAR",
        fatherName: "Father's Name",
        address: "Senior building, room no 406, 4th floor, Khelan nagria no 3, road no 16, Ganesh chaook bhahswali, Wagle estate",
        pincode: "400604",
        state: "MAHARASHTRA",
        subject: "Verification of Character and Antecedents of PADIYAR MAYUR ESHWAR",
        stationName: "Thane CP Dept",
        remarks: "With reference to above, enquiries conducted through Sr Inspector of above nagar jt. station reveals that above named applicant has no adverse record mentioned in the Allocation Form from 01/1997 to 11/2024. There is nothing adverse against the above applicant on police record during his/her stay at the given address as per police station report dated 04/11/2024",
        photoUrl: ""
    });

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const printRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({ ...prev, photoUrl: event.target?.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGeneratePreview = () => {
        const errors: string[] = [];
        
        if (!formData.applicationNumber) errors.push("Application Number is required.");
        if (!formData.applicationDate) errors.push("Application Date is required.");
        if (!formData.certificateDate) errors.push("Certificate Date is required.");
        if (!formData.applicantName) errors.push("Applicant Name is required.");
        if (!formData.address) errors.push("Address is required.");
        if (!formData.subject) errors.push("Subject is required.");

        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors([]);
        setShowPreview(true);
    };

    const handleDownload = () => {
        if (printRef.current) {
            const element = printRef.current;
            const opt = {
                margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
                filename: `GST_Invoice_${formData.applicationNumber}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, width: 750 }, // Fixed width for PDF
                jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
            };

            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .catch((err: unknown) => console.error("PDF generation failed:", err));
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div className="w-full bg-background min-h-screen">
            <div className="container mx-auto p-4">
                {/* Form Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-8 text-center">
                        Police Clearance Certificate Generator
                    </h2>
                    <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-700 rounded-lg shadow-xl">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Application Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="applicationNumber" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Application Number
                                    </Label>
                                    <Input
                                        id="applicationNumber"
                                        name="applicationNumber"
                                        placeholder="Enter application number..."
                                        value={formData.applicationNumber}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Application Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="applicationDate" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Application Date
                                    </Label>
                                    <Input
                                        id="applicationDate"
                                        name="applicationDate"
                                        type="date"
                                        value={formData.applicationDate}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Certificate Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="certificateDate" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Certificate Date
                                    </Label>
                                    <Input
                                        id="certificateDate"
                                        name="certificateDate"
                                        type="date"
                                        value={formData.certificateDate}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Applicant Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="applicantName" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Applicant Name
                                    </Label>
                                    <Input
                                        id="applicantName"
                                        name="applicantName"
                                        placeholder="Enter full name..."
                                        value={formData.applicantName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Father's Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fatherName" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Father's Name
                                    </Label>
                                    <Input
                                        id="fatherName"
                                        name="fatherName"
                                        placeholder="Enter father's name..."
                                        value={formData.fatherName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Pincode */}
                                <div className="space-y-2">
                                    <Label htmlFor="pincode" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Pincode
                                    </Label>
                                    <Input
                                        id="pincode"
                                        name="pincode"
                                        placeholder="Enter pincode..."
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* State */}
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        State
                                    </Label>
                                    <Input
                                        id="state"
                                        name="state"
                                        placeholder="Enter state..."
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Station Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="stationName" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Police Station
                                    </Label>
                                    <Input
                                        id="stationName"
                                        name="stationName"
                                        placeholder="Enter police station name..."
                                        value={formData.stationName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Address */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Address
                                    </Label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        placeholder="Enter full address..."
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full h-24 p-3 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-blue-300 text-gray-900 dark:text-gray-200"
                                    />
                                </div>

                                {/* Subject */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="subject" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="Enter subject..."
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Photo Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="photo" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Upload Photo
                                    </Label>
                                    <Input
                                        id="photo"
                                        name="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-blue-300"
                                    />
                                </div>

                                {/* Spacer for alignment */}
                                <div></div>

                                {/* Remarks */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="remarks" className="text-blue-900 dark:text-blue-300 font-semibold">
                                        Remarks
                                    </Label>
                                    <textarea
                                        id="remarks"
                                        name="remarks"
                                        placeholder="Enter remarks..."
                                        value={formData.remarks}
                                        onChange={handleInputChange}
                                        className="w-full h-32 p-3 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-blue-300 text-gray-900 dark:text-gray-200"
                                    />
                                </div>

                                {/* Generate Button */}
                                <div className="md:col-span-2">
                                    <Button
                                        onClick={handleGeneratePreview}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
                                    >
                                        <FileText className="mr-2 h-5 w-5" />
                                        Generate PDF Preview
                                    </Button>
                                </div>

                                {/* Error Messages */}
                                {formErrors.length > 0 && (
                                    <div className="md:col-span-2 bg-red-50 border border-red-200 rounded-lg p-4">
                                        {formErrors.map((error, index) => (
                                            <p key={index} className="text-red-600 text-sm flex items-center">
                                                <AlertCircle className="h-4 w-4 mr-2" />
                                                {error}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Section */}
                {showPreview && (
                    <div className="mt-12 max-w-4xl mx-auto">
                        <div className="flex justify-center mb-4">
                            <Button
                                onClick={handleDownload}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg cursor-pointer"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Download PDF
                            </Button>
                        </div>
                        
                        <div
                            ref={printRef}
                            className="bg-white p-8 shadow-2xl border-2 border-gray-300 print-certificate"
                        >
                            {/* Header Section */}
                            <div className="border-2 border-black p-6">
                                <div className="flex justify-between items-start mb-6">
                                    {/* Left side - Police Logo placeholder */}
                                    <div className="flex items-center">
                                        <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xs mr-4">
                                            <div className="text-center">
                                                <div>POLICE</div>
                                                <div>★</div>
                                            </div>
                                        </div>
                                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                            <div className="text-center">
                                                <div>GOV</div>
                                                <div>🏛</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side - Barcode placeholder */}
                                    <div className="text-right">
                                        <div className="border border-black p-2 mb-2 bg-white">
                                            <div className="font-mono text-xs">|||||| |||| || ||||||||</div>
                                            <div className="text-xs mt-1 font-bold">PCC/R/24/600043</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Office Header */}
                                <div className="text-center mb-6">
                                    <h1 className="font-bold text-sm">Office of the Dy.Commissioner of Police Special Branch, Thane</h1>
                                </div>

                                {/* Application Details */}
                                <div className="flex justify-between mb-6">
                                    <div>
                                        <p className="text-sm mb-1"><strong>No. SIVR/PMPVL/24/0906/4654/2024</strong></p>
                                        <p className="text-sm mb-1"><strong>Application ID :</strong> {formData.applicationNumber}</p>
                                        <p className="text-sm"><strong>Date :</strong> {formatDate(formData.certificateDate)}</p>
                                    </div>
                                    <div className="w-32 h-40 border-2 border-black flex items-center justify-center bg-blue-50">
                                        {formData.photoUrl ? (
                                            <img src={formData.photoUrl} alt="Applicant" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-xs text-center text-gray-500 p-2">
                                                <div className="mb-2">📷</div>
                                                <div>Applicant Photo</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Certificate Title */}
                                <div className="text-center mb-6">
                                    <h2 className="font-bold text-lg underline">POLICE CLEARANCE CERTIFICATE</h2>
                                </div>

                                {/* To Section */}
                                <div className="mb-4">
                                    <p className="text-sm"><strong>To,</strong></p>
                                    <p className="text-sm"><strong>The Authorized Person</strong></p>
                                    <p className="text-sm"><strong>Speedo business solutions pvt ltd</strong></p>
                                </div>

                                {/* Subject */}
                                <div className="mb-6">
                                    <p className="text-sm leading-relaxed">
                                        <strong>Subject :</strong> {formData.subject} residing at {formData.address}, Thane (M Corp.), Thane- {formData.pincode}, {formData.state}
                                    </p>
                                </div>

                                {/* Main Content */}
                                <div className="mb-8">
                                    <p className="text-sm leading-relaxed text-justify">{formData.remarks}</p>
                                </div>

                                {/* Remarks Section */}
                                <div className="mb-8">
                                    <p className="text-sm"><strong>Remarks:</strong></p>
                                    <div className="mt-4 h-12 border-b border-black"></div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm mb-2"><strong>Signature valid</strong></p>
                                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            ✓
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm"><strong>For Dy. Commissioner of Police</strong></p>
                                        <p className="text-sm"><strong>Special Branch,</strong></p>
                                        <p className="text-sm"><strong>Thane</strong></p>
                                    </div>
                                </div>

                                {/* Bottom Text */}
                                <div className="mt-8 text-xs text-center border-t border-gray-300 pt-4">
                                    <p>This is a digitally signed document, hence is legally valid as per the Information Technology (IT) Act, 2000 To verify visit</p>
                                    <p className="font-bold text-blue-600 mt-1">https://mahapolice.maharashtra.gov.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-certificate, .print-certificate * {
                        visibility: visible;
                    }
                    .print-certificate {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100% !important;
                        max-width: none !important;
                        margin: 0 !important;
                        padding: 20px !important;
                        box-shadow: none !important;
                        border: none !important;
                    }
                }
                
                .print-certificate {
                    width: 210mm;
                    margin: 0 auto;
                    font-family: Arial, sans-serif;
                    color: black;
                    background: white;
                }
                
                @page {
                    size: A4;
                    margin: 1cm;
                }
            `}</style>
        </div>
    );
};

export default PoliceClearanceGenerator;