import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Contact from "./Contact";
import Specialists from "./Spescalists/Specialists";
import AddContact from "./AddContact";
import Documents from "./documents/Documents";
import News from "./News";
import Lifehacks from "./lifehacks/Lifehacks";
import SpecialistDetails from "./Spescalists/SpecialistDetails";
import DonationComponent from "./DonationComponent";
import ArticlesPage from "./lifehacks/Lifehacks";
import EntryRulesBrazil from "./lifehacks/EntryRulesBrazil";
import FlorianopolisLifeHacks from "./lifehacks/FlorianopolisLifehacks";
import MaternityHospitals from "./lifehacks/MaternityHoospitals";
import VisaExtension from "./documents/VisaExtension";
import ChildCitizenshipBrazil from "./documents/ChildCitizenship";
import ForChild from "./lifehacks/ForChild";
import SUSGuide from "./documents/SUSGuide";
import PrivacyPolicy from "./Privacy";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null;
};

export default function AppRouter() {
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <div className="content">
          <ScrollToTop /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/specialists" element={<Specialists />} />
            <Route path="/specialist/:name" element={<SpecialistDetails />} />
            <Route path="/addcontact" element={<AddContact />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/news" element={<News />} />
            <Route path="/lifehacks" element={<Lifehacks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<DonationComponent />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/lifehacks" element={<ArticlesPage />} />
            <Route path="/lifehacks/brazil-relocation" element={<EntryRulesBrazil />} />
            <Route path="/lifehacks/florianopolis-lifehacks" element={<FlorianopolisLifeHacks />} />
            <Route path="/lifehacks/maternity-hospital" element={<MaternityHospitals />} />
            <Route path="/documents/visa-extension" element={<VisaExtension />} />
            <Route path="/documents/child-citizenship" element={<ChildCitizenshipBrazil />} />
            <Route path="/documents/sus" element={<SUSGuide />} />
            <Route path="/lifehacks/for-child" element={<ForChild />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}