import Gst from "./components/docs/Gst";
import Noc from "./components/docs/Noc";
import PlayBoy from "./components/docs/PlayBoy";
import GovermentStamp from "./components/docs/Stamp";
import Tds from "./components/docs/Tds";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CyberSecurityGenerator from "./components/docs/CyberSecurity";
import JoiningLetterGenerator from "./components/docs/JoiningLetter";
import NoObjectionCertificateGenerator from "./components/docs/Noc2";
import PoliceClearance from "./components/docs/PoliceVerification";
import ReferenceVerificationForm from "./components/docs/ReferenceVerification";
import StudentEnquiryFormGenerator from "./components/docs/StudentEnquiry";
import VoterIDVerificationGenerator from "./components/docs/VoterIDVerification";
// import ImageUploadStep2 from "./components/Step/ImageUploadStep2";
//import  ImageUploadStep   from "./components/Step/ImageUploadStep";
import { Home } from "./HomePage/Home";
import Card from "./HomePage/Card"

import Applications from "./admin/Applications";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/adminPage" element={<adminPage />} /> */}


      <Route path="/playboy" element={<PlayBoy />} />
      <Route path="/stamp" element={<GovermentStamp />} />
      <Route path="/gst" element={<Gst />} />
      <Route path="/tds" element={<Tds />} />
      <Route path="/noc" element={<Noc />} />

      {/* <Route path="/card-verification" element={<CardVerification />} /> */}
      {/* <Route path="/medical-kit" element={<MedicalKit />} /> */}

      <Route path="cyber-security" element={<CyberSecurityGenerator />} />
      <Route path="/police-verification" element={<PoliceClearance />} />
      <Route path="/reference-and-address" element={<ReferenceVerificationForm />} />
      <Route path="/joining-letter" element={<JoiningLetterGenerator />} />
      <Route path="/student-enquiry" element={<StudentEnquiryFormGenerator />} />
      <Route path="voter-id-verification" element={<VoterIDVerificationGenerator />} />
      <Route path="/noc-2" element={<NoObjectionCertificateGenerator />} />
      {/* <Route path="/image/upload" element={<ImageUploadStep />} /> */}

      //admin page routes

      <Route path="/applications/*" element={<Applications />} />
      <Route path="*" element={<Applications />} />

      
     <Route path="/card" element={<Card  />} />
    </Routes>
  </Router>
);

export default App;
