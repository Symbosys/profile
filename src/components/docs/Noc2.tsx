import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertCircle, FileText, Download } from "lucide-react";

interface FormData {
    certificateNumber: string;
    issueDate: string;
    renewalDate: string;
    schoolName: string;
    schoolAddress: string;
    buildingName: string;
    surveyNumber: string;
    village: string;
    district: string;
    ownerName: string;
    ownerDesignation: string;
    ownerAddress: string;
    previousCertificateNumber: string;
    previousCertificateDate: string;
    reportNumber: string;
    reportDate: string;
    stationOfficer: string;
    stationName: string;
    validityPeriod: string;
    renewalNote: string;
    stationSeal: string;
    officerSignature: string;
}

const NoObjectionCertificateGenerator: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        certificateNumber: "06/2021",
        issueDate: "2021-03-25",
        renewalDate: "2021-03-25",
        schoolName: "M.P International school",
        schoolAddress: "kasaragod 6162+B1+G+3] storied",
        buildingName: "Higher Secondary Educational Building",
        surveyNumber: "Survey No.11/6,11/6-10, 11/6-9A In",
        village: "Kasaragod District",
        district: "Madhur Gramapanchayth",
        ownerName: "Sri. Shaheen Mohammed Shafi",
        ownerDesignation: "M.P",
        ownerAddress: "House Nellimunnu",
        previousCertificateNumber: "E-848/2016",
        previousCertificateDate: "26/04/2016",
        reportNumber: "06/2021",
        reportDate: "25/02/2021",
        stationOfficer: "Station Officer",
        stationName: "Fire And Rescue Station Kasaragod",
        validityPeriod: "one year",
        renewalNote: "This Certificate is valid for one year from the date of issue. After one year the certificate must be Renewed. Non renewal of the certificate within the time limit will result in loss of eligibility for Insurance coverage appropriated legal action by local self government / revenue department",
        stationSeal: "",
        officerSignature: ""
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

    const handleGeneratePreview = () => {
        const errors: string[] = [];
        
        if (!formData.certificateNumber) errors.push("Certificate Number is required.");
        if (!formData.issueDate) errors.push("Issue Date is required.");
        if (!formData.schoolName) errors.push("School Name is required.");
        if (!formData.buildingName) errors.push("Building Name is required.");
        if (!formData.ownerName) errors.push("Owner Name is required.");
        if (!formData.stationOfficer) errors.push("Station Officer is required.");

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

    return (
        <div className="w-full bg-background min-h-screen">
            <div className="container mx-auto p-4">
                {/* Form Section */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-8 text-center">
                        No Objection Certificate (Renewal) Generator
                    </h2>
                    <Card className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 border-2 border-red-200 dark:border-red-700 rounded-lg shadow-xl">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Certificate Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="certificateNumber" className="text-red-800 dark:text-red-300 font-semibold">
                                        Certificate Number
                                    </Label>
                                    <Input
                                        id="certificateNumber"
                                        name="certificateNumber"
                                        placeholder="e.g., 06/2021"
                                        value={formData.certificateNumber}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="issueDate" className="text-red-800 dark:text-red-300 font-semibold">
                                        Issue Date
                                    </Label>
                                    <Input
                                        id="issueDate"
                                        name="issueDate"
                                        type="date"
                                        value={formData.issueDate}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="renewalDate" className="text-red-800 dark:text-red-300 font-semibold">
                                        Renewal Date
                                    </Label>
                                    <Input
                                        id="renewalDate"
                                        name="renewalDate"
                                        type="date"
                                        value={formData.renewalDate}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* School/Institution Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="schoolName" className="text-red-800 dark:text-red-300 font-semibold">
                                        School/Institution Name
                                    </Label>
                                    <Input
                                        id="schoolName"
                                        name="schoolName"
                                        placeholder="Enter school name..."
                                        value={formData.schoolName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="schoolAddress" className="text-red-800 dark:text-red-300 font-semibold">
                                        School Address
                                    </Label>
                                    <Input
                                        id="schoolAddress"
                                        name="schoolAddress"
                                        placeholder="Enter school address..."
                                        value={formData.schoolAddress}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="buildingName" className="text-red-800 dark:text-red-300 font-semibold">
                                        Building Name
                                    </Label>
                                    <Input
                                        id="buildingName"
                                        name="buildingName"
                                        placeholder="Enter building name..."
                                        value={formData.buildingName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Location Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="surveyNumber" className="text-red-800 dark:text-red-300 font-semibold">
                                        Survey Number
                                    </Label>
                                    <Input
                                        id="surveyNumber"
                                        name="surveyNumber"
                                        placeholder="Enter survey number..."
                                        value={formData.surveyNumber}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="village" className="text-red-800 dark:text-red-300 font-semibold">
                                        Village/Area
                                    </Label>
                                    <Input
                                        id="village"
                                        name="village"
                                        placeholder="Enter village/area..."
                                        value={formData.village}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="district" className="text-red-800 dark:text-red-300 font-semibold">
                                        District/Panchayath
                                    </Label>
                                    <Input
                                        id="district"
                                        name="district"
                                        placeholder="Enter district/panchayath..."
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Owner Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="ownerName" className="text-red-800 dark:text-red-300 font-semibold">
                                        Owner Name
                                    </Label>
                                    <Input
                                        id="ownerName"
                                        name="ownerName"
                                        placeholder="Enter owner name..."
                                        value={formData.ownerName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ownerDesignation" className="text-red-800 dark:text-red-300 font-semibold">
                                        Owner Designation
                                    </Label>
                                    <Input
                                        id="ownerDesignation"
                                        name="ownerDesignation"
                                        placeholder="Enter designation..."
                                        value={formData.ownerDesignation}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ownerAddress" className="text-red-800 dark:text-red-300 font-semibold">
                                        Owner Address
                                    </Label>
                                    <Input
                                        id="ownerAddress"
                                        name="ownerAddress"
                                        placeholder="Enter owner address..."
                                        value={formData.ownerAddress}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Previous Certificate Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="previousCertificateNumber" className="text-red-800 dark:text-red-300 font-semibold">
                                        Previous Certificate Number
                                    </Label>
                                    <Input
                                        id="previousCertificateNumber"
                                        name="previousCertificateNumber"
                                        placeholder="Enter previous cert number..."
                                        value={formData.previousCertificateNumber}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="previousCertificateDate" className="text-red-800 dark:text-red-300 font-semibold">
                                        Previous Certificate Date
                                    </Label>
                                    <Input
                                        id="previousCertificateDate"
                                        name="previousCertificateDate"
                                        placeholder="e.g., 26/04/2016"
                                        value={formData.previousCertificateDate}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Report Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="reportNumber" className="text-red-800 dark:text-red-300 font-semibold">
                                        Report Number
                                    </Label>
                                    <Input
                                        id="reportNumber"
                                        name="reportNumber"
                                        placeholder="Enter report number..."
                                        value={formData.reportNumber}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reportDate" className="text-red-800 dark:text-red-300 font-semibold">
                                        Report Date
                                    </Label>
                                    <Input
                                        id="reportDate"
                                        name="reportDate"
                                        type="date"
                                        value={formData.reportDate}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Officer Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="stationOfficer" className="text-red-800 dark:text-red-300 font-semibold">
                                        Station Officer
                                    </Label>
                                    <Input
                                        id="stationOfficer"
                                        name="stationOfficer"
                                        placeholder="Enter officer name..."
                                        value={formData.stationOfficer}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="stationName" className="text-red-800 dark:text-red-300 font-semibold">
                                        Station Name
                                    </Label>
                                    <Input
                                        id="stationName"
                                        name="stationName"
                                        placeholder="Enter station name..."
                                        value={formData.stationName}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="validityPeriod" className="text-red-800 dark:text-red-300 font-semibold">
                                        Validity Period
                                    </Label>
                                    <Input
                                        id="validityPeriod"
                                        name="validityPeriod"
                                        placeholder="e.g., one year"
                                        value={formData.validityPeriod}
                                        onChange={handleInputChange}
                                        className="bg-white/50 dark:bg-gray-700/50 border-red-300"
                                    />
                                </div>

                                {/* Renewal Note */}
                                <div className="space-y-2 md:col-span-3">
                                    <Label htmlFor="renewalNote" className="text-red-800 dark:text-red-300 font-semibold">
                                        Renewal Note/Terms
                                    </Label>
                                    <textarea
                                        id="renewalNote"
                                        name="renewalNote"
                                        placeholder="Enter renewal terms and conditions..."
                                        value={formData.renewalNote}
                                        onChange={handleInputChange}
                                        className="w-full h-24 p-3 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-red-300 text-gray-900 dark:text-gray-200"
                                    />
                                </div>

                                {/* Generate Button */}
                                <div className="md:col-span-3">
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
                                    <div className="md:col-span-3 bg-red-50 border border-red-200 rounded-lg p-4">
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
                            className="bg-white p-8 shadow-2xl border border-gray-300 print-certificate"
                        >
                            {/* Header Section */}
                            <div className="text-center mb-8">
                                {/* Government Emblem */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                                        <div className="text-center text-xs">
                                            <div>🛡️</div>
                                            <div>GOVT</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="font-bold text-sm mb-2">WE SERVE TO SAVE</div>
                                <div className="font-bold text-sm mb-2">DEPARTMENT OF FIRE AND RESCUE SERVICES</div>
                                <div className="font-bold text-sm mb-6">GOVERNMENT OF KERALA</div>
                                
                                {/* Certificate Number and Date */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-left">
                                        <div className="text-sm font-bold">No.{formData.certificateNumber}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold">Date:{formatDate(formData.issueDate)}</div>
                                    </div>
                                </div>
                                
                                {/* Office Details */}
                                <div className="text-center font-bold text-sm mb-6">
                                    OFFICE OF THE STATION OFFICER , FIRE AND RESCUE STATION , KASARAGOD
                                </div>
                                
                                {/* Certificate Title */}
                                <div className="text-center mb-4">
                                    <h2 className="font-bold text-lg underline">NO OBJECTION CERTIFICATE</h2>
                                    <h3 className="font-bold text-lg underline mt-2">(RENEWAL)</h3>
                                </div>
                            </div>

                            {/* Certificate Content */}
                            <div className="text-sm leading-relaxed space-y-4">
                                <div>
                                    <span className="font-bold">1.</span> The Board headed by the <span className="font-bold">{formData.stationOfficer}, {formData.stationName}</span> had inspected the <span className="font-bold">{formData.schoolName}, {formData.schoolAddress}</span> storied <span className="font-bold">{formData.buildingName}</span> in <span className="font-bold">{formData.surveyNumber}</span> <span className="font-bold">{formData.village}</span> under <span className="font-bold">{formData.district}</span> owned by <span className="font-bold">{formData.ownerName} {formData.ownerDesignation} {formData.ownerAddress}</span> and recommended to renew No objection Certificate No <span className="font-bold">{formData.previousCertificateNumber}</span> dated <span className="font-bold">{formData.previousCertificateDate}</span> of the <span className="font-bold">Regional Fire Officer,Kasaragod</span> for the occupation of the said building as per <span className="font-bold">Report No {formData.reportNumber}</span> dated <span className="font-bold">{formatDate(formData.reportDate)}</span> of the <span className="font-bold">{formData.stationOfficer}, {formData.stationName}</span> for <span className="font-bold">{formData.validityPeriod}</span>.
                                </div>
                                
                                <div>
                                    <span className="font-bold">2.</span> In the circumstances, this certificate is issued under my seal and authority for the continuous occupation of the above building. <span className="font-bold">No further construction will be allowed in the vacant space Provided in the approved plan</span>.
                                </div>
                                
                                <div>
                                    <span className="font-bold">3.</span> <span className="font-bold">{formData.renewalNote}</span>
                                </div>
                            </div>

                            {/* Footer Section */}
                            <div className="flex justify-between items-end mt-16">
                                {/* Station Seal */}
                                <div className="text-center">
                                    <div className="w-24 h-24 border-2 border-blue-900 rounded-full flex items-center justify-center mb-2 text-xs font-bold text-blue-900">
                                        <div className="text-center">
                                            <div>STATION</div>
                                            <div>SEAL</div>
                                            <div>🔥🚒</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Officer Signature */}
                                <div className="text-center">
                                    <div className="mb-16 text-right">
                                        <div className="w-32 h-12 border-b border-gray-400 mb-2"></div>
                                        <div className="text-sm font-bold">{formData.stationOfficer}</div>
                                        <div className="text-sm font-bold">{formData.stationName}</div>
                                    </div>
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

export default NoObjectionCertificateGenerator;