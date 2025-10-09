import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils";
import { AlertCircle, FileText, Download } from "lucide-react";
// import html2pdf from "../../types/html2pdf";
import html2pdf from "html2pdf.js";
interface FormData {
    name: string;
    fathersName: string;
    dateOfBirth: string;
    sex: string;
    idNumber: string;
    address: string;
    photoUrl: string;
    verified: boolean;
}

const VoterIDVerificationGenerator: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "D MANIKANDAN",
        fathersName: "DURAI SAMY",
        dateOfBirth: "1986-07-16",
        sex: "MALE",
        idNumber: "UTC02351",
        address: "ALKEY RESIDENCY 1ST CROSS\nBANGALORE - 560080",
        photoUrl: "",
        verified: true,
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

    const handleSelectChange = (name: string, value: string) => {
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

    const handleGeneratePreview = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: string[] = [];
        if (!formData.name) errors.push("Name is required.");
        if (!formData.fathersName) errors.push("Father's Name is required.");
        if (!formData.dateOfBirth) errors.push("Date of Birth is required.");
        if (!formData.sex) errors.push("Sex is required.");
        if (!formData.idNumber) errors.push("ID Number is required.");
        if (!formData.address) errors.push("Address is required.");

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
                filename: `Voter_ID_Verification_${formData.idNumber}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, width: 750 },
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
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="w-full bg-background">
            <div className="container">
                {/* Form Section */}
                <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 text-center">
                        Generate Voter ID Verification
                    </h2>
                    <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue/30 dark:border-blue/50 rounded-lg shadow-lg">
                        <CardContent className="p-3">
                            <form onSubmit={handleGeneratePreview}>
                                <div className="space-y-4">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Enter name..."
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Name is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Name is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Name is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Father's Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="fathersName" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Father's Name
                                        </Label>
                                        <Input
                                            id="fathersName"
                                            name="fathersName"
                                            placeholder="Enter father's name..."
                                            value={formData.fathersName}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Father's Name is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Father's Name is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Father's Name is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Date of Birth
                                        </Label>
                                        <Input
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Date of Birth is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Date of Birth is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Date of Birth is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Sex */}
                                    <div className="space-y-2">
                                        <Label htmlFor="sex" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Sex
                                        </Label>
                                        <Select value={formData.sex} onValueChange={(value: string) => handleSelectChange('sex', value)}>
                                            <SelectTrigger className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Sex is required.") && "border-destructive dark:border-red-500"
                                            )}>
                                                <SelectValue placeholder="Select sex..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MALE">MALE</SelectItem>
                                                <SelectItem value="FEMALE">FEMALE</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {formErrors.includes("Sex is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Sex is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* ID Number */}
                                    <div className="space-y-2">
                                        <Label htmlFor="idNumber" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            ID Number
                                        </Label>
                                        <Input
                                            id="idNumber"
                                            name="idNumber"
                                            placeholder="Enter ID number..."
                                            value={formData.idNumber}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("ID Number is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("ID Number is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                ID Number is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Address
                                        </Label>
                                        <Textarea
                                            id="address"
                                            name="address"
                                            placeholder="Enter address..."
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "w-full h-24 p-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Address is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Address is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Address is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Photo Upload */}
                                    <div className="space-y-2">
                                        <Label htmlFor="photo" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Upload Photo
                                        </Label>
                                        <Input
                                            id="photo"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200"
                                        />
                                    </div>

                                    {/* Generate PDF Preview Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-md dark:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    >
                                        <div className="flex items-center justify-center">
                                            <FileText className="mr-2 h-5 w-5" />
                                            Generate PDF Preview
                                        </div>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Section */}
                {showPreview && (
                    <div className="container w-full mx-auto py-8 preview-wrapper">
                        <div
                            ref={printRef}
                            className="bg-white p-6 shadow-lg relative font-sans print-card"
                        >
                            {/* Outer Border */}
                            <div className="border-4 border-green-600 p-4 relative">
                                {/* Title */}
                                <div className="text-center mb-4">
                                    <h1 className="text-xl font-bold text-green-600">Voter ID Verification</h1>
                                </div>

                                {/* Details Column */}
                                <div className="flex justify-between items-start">
                                    {/* Left Column - Details */}
                                    <div className="w-1/2 pr-4">
                                        <p className="mb-1 font-bold">Name</p>
                                        <p className="mb-3">{formData.name}</p>

                                        <p className="mb-1 font-bold">Father's Name</p>
                                        <p className="mb-3">{formData.fathersName}</p>

                                        <p className="mb-1 font-bold">Date of Birth</p>
                                        <p className="mb-3">{formatDate(formData.dateOfBirth)}</p>

                                        <p className="mb-1 font-bold">Sex</p>
                                        <p className="mb-3">{formData.sex}</p>

                                        <p className="mb-1 font-bold">ID Number</p>
                                        <p className="mb-3">{formData.idNumber}</p>
                                    </div>

                                    {/* Right Column - Voter Card */}
                                    <div className="w-1/2 pl-4 relative">
                                        {/* Voter Card Border */}
                                        <div className="border-2 border-black p-2 h-48 flex flex-col justify-between">
                                            {/* Top Part - Photo and Header */}
                                            <div className="flex justify-between items-start">
                                                <div className="w-20 h-24 border border-black flex items-center justify-center bg-gray-200">
                                                    {formData.photoUrl ? (
                                                        <img src={formData.photoUrl} alt="Photo" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="text-xs text-gray-500">Photo</div>
                                                    )}
                                                </div>
                                                <div className="text-xs">
                                                    <p>ELECTION COMMISSION OF INDIA</p>
                                                </div>
                                            </div>

                                            {/* Bottom Part - Address and Details */}
                                            <div className="text-xs">
                                                <p className="mb-1">Address: {formData.address.replace(/\n/g, ' ')}</p>
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="mb-1">Name</p>
                                                        <p className="mb-1">{formData.fathersName}</p>
                                                        <p className="mb-1">Date of Birth</p>
                                                        <p className="mb-1">{formatDate(formData.dateOfBirth)}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="mb-1">Date</p>
                                                        <p className="mb-1">09/09/2025</p>
                                                        <div className="flex items-center justify-end">
                                                            <p className="mr-2">Officer Signature</p>
                                                            <div className="w-20 h-6 border-b border-black"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Verified Badge */}
                                <div className="absolute bottom-2 right-2 flex items-center bg-green-100 border-2 border-green-600 p-2 rounded">
                                    <div className="text-green-600 font-bold mr-1">✓</div>
                                    <span className="text-green-600 font-bold">VERIFIED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Download Button */}
                {showPreview && (
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleDownload}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 border-2 border-blue-700 dark:border-blue-800 text-white hover:scale-105 transition-all duration-300 flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg dark:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        >
                            <Download className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                            Download PDF
                        </Button>
                    </div>
                )}
            </div>

            {/* Inline Styles */}
            <style>{`
                .preview-wrapper {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .preview-wrapper::-webkit-scrollbar {
                    display: none;
                }
                .print-card {
                    width: 700px;
                    margin: 0 auto;
                    background: white;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    position: relative;
                    overflow: visible;
                    font-family: Arial, sans-serif;
                }
                .dark .print-card { 
                    background: #1f2937; 
                }
                .print-card h1 {
                    font-size: 20px;
                    font-weight: bold;
                    color: #059669;
                }
                .print-card p {
                    font-size: 14px;
                    line-height: 1.4;
                    margin-bottom: 4px;
                }
                .print-card .font-bold {
                    font-weight: bold;
                }
                .print-card .voter-card {
                    height: 200px;
                    border: 2px solid black;
                    padding: 8px;
                    font-size: 10px;
                }
                .print-card .photo-placeholder {
                    width: 80px;
                    height: 96px;
                    border: 1px solid black;
                    background-color: #e5e7eb;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: #6b7280;
                }
                @media print {
                    .print-card {
                        box-shadow: none;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default VoterIDVerificationGenerator;