// claude

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertCircle, FileText, Download } from "lucide-react";

interface FormData {
    date: string;
    applicantName: string;
    permanentAddress: string;
    yearsKnown: string;
    refereeSignature: string;
    refereeTelephone: string;
    refereeName: string;
    refereeAddress: string;
    refereeOccupation: string;
    visitorsAccountNo: string;
    refereeType: string;
    memberNumber: string;
    companyName: string;
}

const ReferenceVerificationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        date: new Date().toISOString().split('T')[0],
        applicantName: "Mr/Mrs/Miss",
        permanentAddress: "",
        yearsKnown: "",
        refereeSignature: "",
        refereeTelephone: "",
        refereeName: "",
        refereeAddress: "",
        refereeOccupation: "",
        visitorsAccountNo: "",
        refereeType: "Applicant's Employer",
        memberNumber: "",
        companyName: "Victoria Mutual"
    });

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const printRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGeneratePreview = () => {
        const errors: string[] = [];
        
        if (!formData.date) errors.push("Date is required.");
        if (!formData.applicantName || formData.applicantName === "Mr/Mrs/Miss") errors.push("Applicant Name is required.");
        if (!formData.permanentAddress) errors.push("Permanent Address is required.");
        if (!formData.yearsKnown) errors.push("Years Known is required.");
        if (!formData.refereeName) errors.push("Referee Name is required.");

        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors([]);
        setShowPreview(true);
    };

    const handleDownload = () => {
        if (printRef.current) {
            window.print();
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const refereeTypes = [
        "Applicant's Employer",
        "School Principal / University Lecturer",
        "Medical Doctor",
        "Army Officer (Major and above)",
        "Manager / Senior Officer of a Regulated Financial Institution",
        "Attorney at Law",
        "Justice of the Peace / Notary Public",
        "Custos of Parish",
        "Police Officer (Inspector and above)"
    ];

    return (
        <div className="w-full bg-background min-h-screen">
            <div className="container mx-auto p-4">
                {/* Form Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-8 text-center">
                        Reference and Address Verification Form Generator
                    </h2>
                    <Card className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 border-2 border-red-200 dark:border-red-700 rounded-lg shadow-xl">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="date" className="text-red-800 dark:text-red-300 font-semibold">
                                        Date
                                    </Label>
                                    <Input
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="companyName" className="text-red-800 dark:text-red-300 font-semibold">
                                        Company Name
                                    </Label>
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        placeholder="Enter company name..."
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Applicant Details */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="applicantName" className="text-red-800 dark:text-red-300 font-semibold">
                                        Applicant Name
                                    </Label>
                                    <Input
                                        id="applicantName"
                                        name="applicantName"
                                        placeholder="Enter full name (Mr/Mrs/Miss)..."
                                        value={formData.applicantName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="permanentAddress" className="text-red-800 dark:text-red-300 font-semibold">
                                        Permanent Address
                                    </Label>
                                    <textarea
                                        id="permanentAddress"
                                        name="permanentAddress"
                                        placeholder="Enter full permanent address..."
                                        value={formData.permanentAddress}
                                        onChange={handleInputChange}
                                        className="w-full h-24 p-3 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-red-300 text-gray-900 dark:text-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="yearsKnown" className="text-red-800 dark:text-red-300 font-semibold">
                                        Years Known
                                    </Label>
                                    <Input
                                        id="yearsKnown"
                                        name="yearsKnown"
                                        placeholder="e.g., 5 years 6 months"
                                        value={formData.yearsKnown}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="visitorsAccountNo" className="text-red-800 dark:text-red-300 font-semibold">
                                        Visitor's Account No (if applicable)
                                    </Label>
                                    <Input
                                        id="visitorsAccountNo"
                                        name="visitorsAccountNo"
                                        placeholder="Enter account number..."
                                        value={formData.visitorsAccountNo}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Referee Details */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="refereeName" className="text-red-800 dark:text-red-300 font-semibold">
                                        Referee Name
                                    </Label>
                                    <Input
                                        id="refereeName"
                                        name="refereeName"
                                        placeholder="Enter referee full name..."
                                        value={formData.refereeName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="refereeAddress" className="text-red-800 dark:text-red-300 font-semibold">
                                        Referee Address
                                    </Label>
                                    <textarea
                                        id="refereeAddress"
                                        name="refereeAddress"
                                        placeholder="Enter referee full address..."
                                        value={formData.refereeAddress}
                                        onChange={handleInputChange}
                                        className="w-full h-20 p-3 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-red-300 text-gray-900 dark:text-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="refereeOccupation" className="text-red-800 dark:text-red-300 font-semibold">
                                        Referee Occupation
                                    </Label>
                                    <Input
                                        id="refereeOccupation"
                                        name="refereeOccupation"
                                        placeholder="Enter occupation..."
                                        value={formData.refereeOccupation}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="refereeTelephone" className="text-red-800 dark:text-red-300 font-semibold">
                                        Referee Telephone
                                    </Label>
                                    <Input
                                        id="refereeTelephone"
                                        name="refereeTelephone"
                                        placeholder="Enter telephone number..."
                                        value={formData.refereeTelephone}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Referee Type Selection */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="refereeType" className="text-red-800 dark:text-red-300 font-semibold">
                                        Referee Type
                                    </Label>
                                    <select
                                        id="refereeType"
                                        name="refereeType"
                                        value={formData.refereeType}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-red-300 text-gray-900 dark:text-gray-200"
                                    >
                                        {refereeTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="memberNumber" className="text-red-800 dark:text-red-300 font-semibold">
                                        Member Number
                                    </Label>
                                    <Input
                                        id="memberNumber"
                                        name="memberNumber"
                                        placeholder="Enter member number..."
                                        value={formData.memberNumber}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Generate Button */}
                                <div className="md:col-span-2">
                                    <Button
                                        onClick={handleGeneratePreview}
                                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
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
                                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Download PDF
                            </Button>
                        </div>
                        
                        <div
                            ref={printRef}
                            className="bg-white shadow-2xl border border-gray-300 print-certificate"
                        >
                            {/* Header Section */}
                            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 relative">
                                <div className="absolute left-4 top-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <div className="text-red-600 font-bold text-xs text-center">
                                            <div>VM</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <div className="bg-red-800 text-white px-4 py-2 rounded inline-block font-bold text-sm">
                                        REFERENCE AND ADDRESS VERIFICATION FORM
                                    </div>
                                </div>
                                
                                <div className="absolute right-4 top-4">
                                    <div className="text-right">
                                        <div className="text-xs font-bold">Date: {formatDate(formData.date)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Company Info */}
                                <div className="flex items-center mb-6">
                                    <div className="text-red-600 font-bold text-lg mr-4">{formData.companyName}</div>
                                    <div className="text-xs text-gray-600 flex-1">
                                        For every financial step we take
                                    </div>
                                </div>

                                {/* Form Content */}
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <strong>Dear Sir/s,</strong>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span>I declare that</span>
                                        <div className="border-b border-black flex-1 px-2">{formData.applicantName}</div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <span>whose permanent address is</span>
                                        <div className="border-b border-black flex-1 px-2 min-h-[60px]">
                                            <div className="whitespace-pre-wrap">{formData.permanentAddress}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <span>has been personally known to me for the past</span>
                                        <div className="border-b border-black px-2 min-w-[100px]">{formData.yearsKnown}</div>
                                        <span>years/months.</span>
                                    </div>

                                    <div className="leading-relaxed">
                                        He/She is desirous of opening an account with your Society. To the best of my knowledge, information and belief, he/she is of good character and is fit and proper person to conduct business with your organization.
                                    </div>

                                    <div>
                                        I also confirm that the name and address stated above are to the best of my knowledge true and correct.
                                    </div>

                                    <div className="mt-8">
                                        <div>Yours faithfully,</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 mt-12">
                                        <div>
                                            <div className="border-b border-black h-12 mb-2"></div>
                                            <div className="text-xs">(Signature of Referee)</div>
                                        </div>
                                        <div>
                                            <div className="border-b border-black h-12 mb-2"></div>
                                            <div className="text-xs">(Telephone Number of Referee)</div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="border-b border-black h-12 mb-2"></div>
                                        <div className="text-xs">(Name of Referee)</div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="font-bold mb-2">Address of Referee</div>
                                        <div className="border border-black h-24 p-2">
                                            <div className="whitespace-pre-wrap text-sm">{formData.refereeAddress}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 mt-6">
                                        <div>
                                            <div className="border-b border-black h-8 mb-2">{formData.refereeOccupation}</div>
                                            <div className="text-xs">(Occupation of Referee)</div>
                                        </div>
                                        <div>
                                            <div className="border-b border-black h-8 mb-2">{formData.visitorsAccountNo}</div>
                                            <div className="text-xs">Visitor Account No. (if applicable)</div>
                                        </div>
                                    </div>

                                    {/* Referee Type Selection */}
                                    <div className="mt-8">
                                        <div className="bg-red-600 text-white p-2 text-center font-bold text-xs mb-4">
                                            Referee to tick the appropriate box
                                        </div>

                                        <div className="border border-black p-4">
                                            <div className="text-xs font-bold mb-3">I am</div>
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                {refereeTypes.map((type, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <div className="w-3 h-3 border border-black rounded-sm flex items-center justify-center">
                                                            {formData.refereeType === type && <div className="w-2 h-2 bg-black rounded-sm"></div>}
                                                        </div>
                                                        <span>{type}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="grid grid-cols-3 gap-4 mt-4 text-xs">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-3 h-3 border border-black rounded-sm"></div>
                                                    <span>Permanent Staff of VM Group</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-3 h-3 border border-black rounded-sm"></div>
                                                    <span>Director of a company where VM Group</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-3 h-3 border border-black rounded-sm"></div>
                                                    <span>Divisional Officer - High Commission</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 text-center">
                                            <div className="border-b border-black w-32 mx-auto h-8 mb-2"></div>
                                            <div className="text-xs">Referee to place Stamp or Seal of Office above</div>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center">
                                        <div className="bg-gray-800 text-white p-2 text-xs">
                                            <strong>Member No.</strong> {formData.memberNumber}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 bg-red-600 text-white p-2 text-xs text-center">
                                    Toll Free from USA: 1-866-VIS-VUES (997-8837) • From US & CAN: 1-866-866-8827 • From UK 0-800-096-8067 • e-mail: manager@vmbs.com
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

export default ReferenceVerificationForm;