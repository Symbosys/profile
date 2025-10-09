// claude ai

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import { AlertCircle, Printer, FileText, User, Mail, Phone, MapPin, Building, Calendar } from "lucide-react";

interface FormData {
    yourName: string;
    yourAddress: string;
    yourCity: string;
    yourPhone: string;
    yourEmail: string;
    recipientName: string;
    recipientAddress: string;
    recipientCity: string;
    collegeName: string;
    departmentName: string;
    salary: string;
    contractPeriod: string;
    date: string;
}

const JoiningLetterGenerator: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        yourName: "",
        yourAddress: "",
        yourCity: "",
        yourPhone: "",
        yourEmail: "",
        recipientName: "",
        recipientAddress: "",
        recipientCity: "",
        collegeName: "",
        departmentName: "",
        salary: "",
        contractPeriod: "",
        date: "",
    });

    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const printRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGeneratePreview = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: string[] = [];
        
        if (!formData.yourName) errors.push("Your Name is required.");
        if (!formData.yourAddress) errors.push("Your Address is required.");
        if (!formData.yourCity) errors.push("Your City is required.");
        if (!formData.yourPhone) errors.push("Your Phone is required.");
        if (!formData.yourEmail) errors.push("Your Email is required.");
        if (!formData.recipientName) errors.push("Recipient Name is required.");
        if (!formData.recipientAddress) errors.push("Recipient Address is required.");
        if (!formData.recipientCity) errors.push("Recipient City is required.");
        if (!formData.collegeName) errors.push("College Name is required.");
        if (!formData.departmentName) errors.push("Department Name is required.");
        if (!formData.salary) errors.push("Salary is required.");
        if (!formData.contractPeriod) errors.push("Contract Period is required.");
        if (!formData.date) errors.push("Date is required.");

        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors([]);
        setShowPreview(true);
    };

    const handlePrint = () => {
        if (printRef.current) {
            const element = printRef.current;
            const opt = {
                margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
                filename: `Joining_Letter_${formData.yourName.replace(/\s+/g, '_')}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, width: 750 },
                jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
            };

            // Use dynamic import to handle html2pdf
            import('html2pdf.js').then((html2pdf) => {
                html2pdf.default()
                    .set(opt)
                    .from(element)
                    .save()
                    .catch((err: unknown) => console.error("PDF generation failed:", err));
            });
        }
    };

    const InputField = ({ 
        label, 
        name, 
        value, 
        placeholder, 
        icon: Icon, 
        type = "text",
        required = true 
    }: {
        label: string;
        name: keyof FormData;
        value: string;
        placeholder: string;
        icon: React.ComponentType<{ className?: string }>;
        type?: string;
        required?: boolean;
    }) => {
        const errorMessage = `${label} is required.`;
        const hasError = required && formErrors.includes(errorMessage);

        return (
            <div className="space-y-2">
                <Label htmlFor={name} className="text-blue-900 dark:text-blue-300 font-semibold flex items-center">
                    <Icon className="w-4 h-4 mr-2 text-blue-500" />
                    {label}
                </Label>
                <Input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    className={cn(
                        "bg-white/50 dark:bg-gray-700/50 border-pink-300/30 dark:border-pink-400/50 focus:border-pink-500 dark:focus:border-pink-400 rounded-lg text-gray-900 dark:text-gray-200",
                        hasError && "border-destructive dark:border-red-500"
                    )}
                />
                {hasError && (
                    <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="w-full bg-background">
            <div className="container">
                {/* Form Section */}
                <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-6 text-center">
                        Generate Joining Letter
                    </h2>
                    <Card className="bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 border-2 border-pink-200/30 dark:border-pink-400/50 rounded-lg shadow-lg">
                        <CardContent className="p-6">
                            <form onSubmit={handleGeneratePreview}>
                                <div className="space-y-6">
                                    {/* Your Information Section */}
                                    <div className="bg-pink-50/50 dark:bg-gray-700/30 p-4 rounded-lg">
                                        <h3 className="font-semibold text-pink-700 dark:text-pink-300 mb-4 text-lg">Your Information</h3>
                                        <div className="space-y-4">
                                            <InputField
                                                label="Full Name"
                                                name="yourName"
                                                value={formData.yourName}
                                                placeholder="Enter your full name"
                                                icon={User}
                                            />
                                            <InputField
                                                label="Address"
                                                name="yourAddress"
                                                value={formData.yourAddress}
                                                placeholder="Enter your address"
                                                icon={MapPin}
                                            />
                                            <InputField
                                                label="City, State ZIP"
                                                name="yourCity"
                                                value={formData.yourCity}
                                                placeholder="City, State ZIP Code"
                                                icon={MapPin}
                                            />
                                            <InputField
                                                label="Phone Number"
                                                name="yourPhone"
                                                value={formData.yourPhone}
                                                placeholder="Your phone number"
                                                icon={Phone}
                                            />
                                            <InputField
                                                label="Email Address"
                                                name="yourEmail"
                                                value={formData.yourEmail}
                                                placeholder="Your email address"
                                                icon={Mail}
                                                type="email"
                                            />
                                        </div>
                                    </div>

                                    {/* Recipient Information Section */}
                                    <div className="bg-blue-50/50 dark:bg-gray-700/30 p-4 rounded-lg">
                                        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-4 text-lg">Recipient Information</h3>
                                        <div className="space-y-4">
                                            <InputField
                                                label="Recipient Name"
                                                name="recipientName"
                                                value={formData.recipientName}
                                                placeholder="Recipient's full name"
                                                icon={User}
                                            />
                                            <InputField
                                                label="Recipient Address"
                                                name="recipientAddress"
                                                value={formData.recipientAddress}
                                                placeholder="Recipient's address"
                                                icon={MapPin}
                                            />
                                            <InputField
                                                label="City, State ZIP"
                                                name="recipientCity"
                                                value={formData.recipientCity}
                                                placeholder="City, State ZIP Code"
                                                icon={MapPin}
                                            />
                                        </div>
                                    </div>

                                    {/* Position Details Section */}
                                    <div className="bg-green-50/50 dark:bg-gray-700/30 p-4 rounded-lg">
                                        <h3 className="font-semibold text-green-700 dark:text-green-300 mb-4 text-lg">Position Details</h3>
                                        <div className="space-y-4">
                                            <InputField
                                                label="College Name"
                                                name="collegeName"
                                                value={formData.collegeName}
                                                placeholder="Name of the college"
                                                icon={Building}
                                            />
                                            <InputField
                                                label="Department Name"
                                                name="departmentName"
                                                value={formData.departmentName}
                                                placeholder="Department name"
                                                icon={Building}
                                            />
                                            <InputField
                                                label="Salary"
                                                name="salary"
                                                value={formData.salary}
                                                placeholder="Annual salary (e.g., $75,000)"
                                                icon={FileText}
                                            />
                                            <InputField
                                                label="Contract Period"
                                                name="contractPeriod"
                                                value={formData.contractPeriod}
                                                placeholder="e.g., One Year, Two Years"
                                                icon={Calendar}
                                            />
                                            <InputField
                                                label="Date"
                                                name="date"
                                                value={formData.date}
                                                placeholder="Select date"
                                                icon={Calendar}
                                                type="date"
                                            />
                                        </div>
                                    </div>

                                    {/* Generate PDF Preview Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-600 dark:to-blue-600 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-md dark:shadow-[0_0_15px_rgba(219,39,119,0.5)]"
                                    >
                                        <div className="flex items-center justify-center cursor-pointer">
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
                            className="bg-white p-8 shadow-lg relative font-sans print-card"
                        >
                            {/* Header */}
                            <div className="header text-center mb-6">
                                <div className="text-pink-500 text-sm mb-4">www.letterseasy.com</div>
                                <h1 className="text-2xl font-bold text-pink-500 mb-2">Joining Letter Format for</h1>
                                <h2 className="text-xl font-bold text-pink-500">College Lecturer</h2>
                            </div>

                            {/* Content Layout */}
                            <div className="content-layout">
                                <div className="left-content">
                                    {/* Your Information */}
                                    <div className="info-section">
                                        <div className="text-blue-500 text-sm font-medium">{formData.yourName}</div>
                                        <div className="text-blue-500 text-sm">{formData.yourAddress}</div>
                                        <div className="text-blue-500 text-sm">{formData.yourCity}</div>
                                        <div className="text-blue-500 text-sm">{formData.yourPhone}</div>
                                        <div className="text-blue-500 text-sm">{formData.yourEmail}</div>
                                        <div className="text-blue-500 text-sm">{formData.date}</div>
                                    </div>

                                    {/* Recipient Information */}
                                    <div className="info-section">
                                        <div className="text-blue-500 text-sm">{formData.recipientName}</div>
                                        <div className="text-blue-500 text-sm">{formData.recipientAddress}</div>
                                        <div className="text-blue-500 text-sm">{formData.recipientCity}</div>
                                    </div>

                                    {/* Subject and Greeting */}
                                    <div className="info-section">
                                        <div className="text-blue-500 text-sm font-medium">
                                            Subject: Appointment Letter for the Position of Lecturer
                                        </div>
                                    </div>

                                    <div className="info-section">
                                        <div className="text-blue-500 text-sm">Dear {formData.recipientName},</div>
                                    </div>
                                </div>

                                {/* Illustration */}
                                <div className="illustration">
                                    <div className="lecturer-illustration">
                                        <div className="person"></div>
                                        <div className="podium"></div>
                                        <div className="audience">
                                            <div className="audience-member"></div>
                                            <div className="audience-member"></div>
                                            <div className="audience-member"></div>
                                            <div className="audience-member"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Letter Body */}
                            <div className="letter-body">
                                <p className="text-blue-500 text-sm mb-4">
                                    It is with great pleasure that I offer you the position of Lecturer in the 
                                    Department of {formData.departmentName} at {formData.collegeName}. We believe that 
                                    your expertise and experience will make a valuable contribution to our 
                                    college.
                                </p>

                                <p className="text-blue-500 text-sm mb-4">
                                    As per the terms of your appointment, your initial contract will be for a 
                                    period of {formData.contractPeriod}. You will be paid a salary of {formData.salary} 
                                    as well as other benefits and allowances as per the college's policies. You 
                                    will be required to perform the duties and responsibilities outlined in your 
                                    appointment letter.
                                </p>

                                <p className="text-blue-500 text-sm mb-4">
                                    Please find enclosed the necessary documents for your review and 
                                    signature. We request you to sign and return them at your earliest 
                                    convenience. We look forward to your arrival and wish you all the best for 
                                    your future endeavors.
                                </p>

                                <p className="text-blue-500 text-sm mb-8">
                                    Sincerely,
                                </p>

                                <p className="text-blue-500 text-sm">
                                    {formData.yourName}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="footer">
                                <div className="download-section">
                                    <div className="text-xs mb-2">Download:</div>
                                    <div className="download-icons">
                                        <div className="download-icon doc"></div>
                                        <div className="download-icon pdf"></div>
                                        <div className="download-icon docx"></div>
                                    </div>
                                </div>
                                <div className="branding">
                                    <div className="letters-text">Letters</div>
                                    <div className="easy-text">Easy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Print Button */}
                {showPreview && (
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handlePrint}
                            className="bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-600 dark:to-blue-600 border-2 border-pink-500 dark:border-pink-600 text-white hover:scale-105 transition-all duration-300 flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg dark:shadow-[0_0_15px_rgba(219,39,119,0.5)] cursor-pointer"
                        >
                            <Printer className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
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
                    min-height: 842px;
                }
                .dark .print-card {
                    background: #1f2937;
                }
                .header {
                    margin-bottom: 24px;
                }
                .content-layout {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 24px;
                }
                .left-content {
                    flex: 1;
                    padding-right: 20px;
                }
                .info-section {
                    margin-bottom: 16px;
                    line-height: 1.4;
                }
                .info-section div {
                    margin-bottom: 2px;
                }
                .illustration {
                    flex: 0 0 140px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }
                .lecturer-illustration {
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #fed7aa, #fda4af, #fed7aa);
                    border-radius: 50%;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                }
                .person {
                    width: 24px;
                    height: 24px;
                    background: #8b5cf6;
                    border-radius: 50%;
                    margin-bottom: 4px;
                    position: relative;
                }
                .person::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 16px;
                    height: 16px;
                    background: #fbbf24;
                    border-radius: 50%;
                }
                .podium {
                    width: 36px;
                    height: 18px;
                    background: #92400e;
                    border-radius: 2px;
                    margin-bottom: 4px;
                }
                .audience {
                    display: flex;
                    gap: 2px;
                    justify-content: center;
                }
                .audience-member {
                    width: 6px;
                    height: 10px;
                    background: #374151;
                    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                }
                .letter-body {
                    margin-bottom: 48px;
                    line-height: 1.5;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-top: auto;
                    padding-top: 20px;
                }
                .download-section {
                    display: flex;
                    flex-direction: column;
                }
                .download-icons {
                    display: flex;
                    gap: 4px;
                }
                .download-icon {
                    width: 20px;
                    height: 20px;
                    border: 1px solid;
                    border-radius: 2px;
                }
                .download-icon.doc {
                    background: #e0f2fe;
                    border-color: #0ea5e9;
                }
                .download-icon.pdf {
                    background: #fef2f2;
                    border-color: #ef4444;
                }
                .download-icon.docx {
                    background: #e0f2fe;
                    border-color: #0ea5e9;
                }
                .branding {
                    text-align: right;
                }
                .letters-text {
                    font-size: 18px;
                    font-weight: bold;
                    color: #f97316;
                    line-height: 1;
                }
                .easy-text {
                    font-size: 18px;
                    font-weight: bold;
                    color: #3b82f6;
                    line-height: 1;
                }
            `}</style>
        </div>
    );
};

export default JoiningLetterGenerator;