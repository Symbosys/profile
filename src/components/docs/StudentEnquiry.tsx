import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils";
import { AlertCircle, FileText, Download } from "lucide-react";
import html2pdf from "html2pdf.js";

interface FormData {
    name: string;
    age: string;
    educationLevel: string;
    reasonForEnquiry: string;
    courseInfo: boolean;
    admissionProcess: boolean;
    scholarshipOpportunities: boolean;
    preferredMethodEmail: boolean;
    preferredMethodPhone: boolean;
    bestTimeToContact: string;
    questionsComments: string;
    infoPacket: boolean;
    guidanceCounselor: boolean;
    campusTour: boolean;
}

const StudentEnquiryFormGenerator: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        age: "",
        educationLevel: "",
        reasonForEnquiry: "",
        courseInfo: false,
        admissionProcess: false,
        scholarshipOpportunities: false,
        preferredMethodEmail: false,
        preferredMethodPhone: false,
        bestTimeToContact: "",
        questionsComments: "",
        infoPacket: false,
        guidanceCounselor: false,
        campusTour: false,
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

    const handleCheckboxChange = (name: keyof FormData) => {
        setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const handleGeneratePreview = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: string[] = [];
        if (!formData.name) errors.push("Name is required.");
        if (!formData.age) errors.push("Age is required.");
        if (!formData.educationLevel) errors.push("Current Level of Education is required.");
        if (!formData.reasonForEnquiry) errors.push("Reason for Enquiry is required.");
        if (!formData.bestTimeToContact) errors.push("Best Time to Contact is required.");
        if (!formData.questionsComments) errors.push("Questions or Comments is required.");

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
                filename: `Student_Enquiry_Form_${formData.name || 'User'}.pdf`,
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

    return (
        <div className="w-full bg-background">
            <div className="container">
                {/* Form Section */}
                <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6 text-center">
                        Generate Student Enquiry Form
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

                                    {/* Age */}
                                    <div className="space-y-2">
                                        <Label htmlFor="age" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Age
                                        </Label>
                                        <Input
                                            id="age"
                                            name="age"
                                            type="number"
                                            placeholder="Enter age..."
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Age is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Age is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Age is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Current Level of Education */}
                                    <div className="space-y-2">
                                        <Label htmlFor="educationLevel" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Current Level of Education
                                        </Label>
                                        <Input
                                            id="educationLevel"
                                            name="educationLevel"
                                            placeholder="Enter current level of education..."
                                            value={formData.educationLevel}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Current Level of Education is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Current Level of Education is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Current Level of Education is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Reason for Enquiry */}
                                    <div className="space-y-2">
                                        <Label htmlFor="reasonForEnquiry" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Reason for Enquiry
                                        </Label>
                                        <Input
                                            id="reasonForEnquiry"
                                            name="reasonForEnquiry"
                                            placeholder="Enter reason for enquiry..."
                                            value={formData.reasonForEnquiry}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Reason for Enquiry is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Reason for Enquiry is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Reason for Enquiry is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Course Information Checkbox */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="courseInfo"
                                                checked={formData.courseInfo}
                                                onCheckedChange={() => handleCheckboxChange('courseInfo')}
                                            />
                                            <Label htmlFor="courseInfo" className="text-blue-900 dark:text-blue-300 font-semibold">
                                                Course Information
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Admission Process Checkbox */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="admissionProcess"
                                                checked={formData.admissionProcess}
                                                onCheckedChange={() => handleCheckboxChange('admissionProcess')}
                                            />
                                            <Label htmlFor="admissionProcess" className="text-blue-900 dark:text-blue-300 font-semibold">
                                                Admission Process
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Scholarship Opportunities Checkbox */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="scholarshipOpportunities"
                                                checked={formData.scholarshipOpportunities}
                                                onCheckedChange={() => handleCheckboxChange('scholarshipOpportunities')}
                                            />
                                            <Label htmlFor="scholarshipOpportunities" className="text-blue-900 dark:text-blue-300 font-semibold">
                                                Scholarship Opportunities
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Preferred Method of Contact - Email */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="preferredMethodEmail"
                                                checked={formData.preferredMethodEmail}
                                                onCheckedChange={() => handleCheckboxChange('preferredMethodEmail')}
                                            />
                                            <Label htmlFor="preferredMethodEmail" className="text-blue-900 dark:text-blue-300 font-semibold">
                                                Preferred Method of Contact: Email
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Preferred Method of Contact - Phone */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="preferredMethodPhone"
                                                checked={formData.preferredMethodPhone}
                                                onCheckedChange={() => handleCheckboxChange('preferredMethodPhone')}
                                            />
                                            <Label htmlFor="preferredMethodPhone" className="text-blue-900 dark:text-blue-300 font-semibold">
                                                Preferred Method of Contact: Phone
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Best Time to Contact */}
                                    <div className="space-y-2">
                                        <Label htmlFor="bestTimeToContact" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Best Time to Contact
                                        </Label>
                                        <Input
                                            id="bestTimeToContact"
                                            name="bestTimeToContact"
                                            placeholder="Enter best time to contact..."
                                            value={formData.bestTimeToContact}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue rounded-lg text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Best Time to Contact is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Best Time to Contact is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Best Time to Contact is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Questions or Comments */}
                                    <div className="space-y-2">
                                        <Label htmlFor="questionsComments" className="text-blue-900 dark:text-blue-300 font-semibold">
                                            Questions or Comments
                                        </Label>
                                        <Textarea
                                            id="questionsComments"
                                            name="questionsComments"
                                            placeholder="Please list any specific questions or additional comments you may have below..."
                                            value={formData.questionsComments}
                                            onChange={handleInputChange}
                                            className={cn(
                                                "w-full h-24 p-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 border-blue/30 dark:border-blue/50 focus:border-blue dark:focus:border-blue text-gray-900 dark:text-gray-200",
                                                formErrors.includes("Questions or Comments is required.") && "border-destructive dark:border-red-500"
                                            )}
                                        />
                                        {formErrors.includes("Questions or Comments is required.") && (
                                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                Questions or Comments is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Information Packet Checkbox */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="infoPacket"
                                                checked={formData.infoPacket}
                                                onCheckedChange={() => handleCheckboxChange('infoPacket')}
                                            />
                                            <Label htmlFor="infoPacket" className="text-blue-900 dark:text-blue-300 font-semibold">
                                                Information Packet Requested
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Guidance Counselor Appointment Checkbox */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="guidanceCounselor"
                                                checked={formData.guidanceCounselor}
                                                onCheckedChange={() => handleCheckboxChange('guidanceCounselor')}
                                            />
                                            <Label htmlFor="guidanceCounselor" className="text-blue-900 dark:text-blue-300 font-semibold">
                                                Guidance Counselor Appointment
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Campus Tour Scheduled Checkbox */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="campusTour"
                                                checked={formData.campusTour}
                                                onCheckedChange={() => handleCheckboxChange('campusTour')}
                                            />
                                            <Label htmlFor="campusTour" className="text-blue-900 dark:text-blue-300 font-semibold">
                                                Campus Tour Scheduled
                                            </Label>
                                        </div>
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
                            {/* Title */}
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold text-blue-600 uppercase border-b-2 border-blue-600 pb-2">
                                    Student Enquiry Form
                                </h1>
                            </div>

                            {/* Personal Information */}
                            <div className="mb-6">
                                <h2 className="font-bold text-lg mb-2">Personal Information</h2>
                                <p className="mb-1"><strong>Name:</strong> {formData.name}</p>
                                <p className="mb-1"><strong>Age:</strong> {formData.age}</p>
                                <p className="mb-4"><strong>Current Level of Education:</strong> {formData.educationLevel}</p>
                            </div>

                            {/* Enquiry Area of Interest */}
                            <div className="mb-6">
                                <h2 className="font-bold text-lg mb-2">Enquiry Area of Interest</h2>
                                <p className="mb-1"><strong>Reason for Enquiry:</strong> {formData.reasonForEnquiry}</p>
                                <div className="ml-4 mb-4">
                                    <p className={cn("mb-1", formData.courseInfo ? "font-bold" : "text-gray-500")}>
                                        ☑ {formData.courseInfo ? "✓" : "☐"} Course Information
                                    </p>
                                    <p className={cn("mb-1", formData.admissionProcess ? "font-bold" : "text-gray-500")}>
                                        ☑ {formData.admissionProcess ? "✓" : "☐"} Admission Process
                                    </p>
                                    <p className={cn("mb-4", formData.scholarshipOpportunities ? "font-bold" : "text-gray-500")}>
                                        ☑ {formData.scholarshipOpportunities ? "✓" : "☐"} Scholarship Opportunities
                                    </p>
                                </div>
                            </div>

                            {/* Contact Preferences */}
                            <div className="mb-6">
                                <h2 className="font-bold text-lg mb-2">Contact Preferences</h2>
                                <p className="mb-1">
                                    <strong>Preferred Method of Contact:</strong> {formData.preferredMethodEmail ? "Email" : ""} {formData.preferredMethodPhone ? "Phone" : ""}
                                </p>
                                <p className="mb-4"><strong>Best Time to Contact:</strong> {formData.bestTimeToContact}</p>
                            </div>

                            {/* Questions or Comments */}
                            <div className="mb-6">
                                <h2 className="font-bold text-lg mb-2">Questions or Comments</h2>
                                <p className="mb-4">{formData.questionsComments}</p>
                            </div>

                            {/* Student Checklist */}
                            <div className="mb-6">
                                <h2 className="font-bold text-lg mb-2">Student Checklist Requested</h2>
                                <div className="ml-4">
                                    <p className={cn("mb-1", formData.infoPacket ? "font-bold" : "text-gray-500")}>
                                        ☑ {formData.infoPacket ? "✓" : "☐"} Information Packet
                                    </p>
                                    <p className={cn("mb-1", formData.guidanceCounselor ? "font-bold" : "text-gray-500")}>
                                        ☑ {formData.guidanceCounselor ? "✓" : "☐"} Guidance Counselor Appointment
                                    </p>
                                    <p className={cn("mb-4", formData.campusTour ? "font-bold" : "text-gray-500")}>
                                        ☑ {formData.campusTour ? "✓" : "☐"} Campus Tour Scheduled
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="text-center text-sm text-gray-500 mt-8 border-t pt-4">
                                <p>Copyright @Sampleforms.com</p>
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
                .print-card h1, .print-card h2 {
                    font-size: 18px;
                    font-weight: bold;
                }
                .print-card p {
                    font-size: 14px;
                    line-height: 1.4;
                    margin-bottom: 8px;
                }
                .print-card strong {
                    font-weight: bold;
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

export default StudentEnquiryFormGenerator;