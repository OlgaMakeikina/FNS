import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Contact from "./Contact";
import Organizations from "./Organizations";
import Specialists from "./Spescalists/Specialists";
import AddContact from "./AddContact";
import Documents from "./Documents";
import News from "./News";
import Lifehacks from "./Lifehacks";
import SpecialistDetails from "./Spescalists/SpecialistDetails";
import DonationComponent from "./DonationComponent";

export default function AppRouter() {
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/specialists" element={<Specialists />} />
            <Route path="/specialist/:name" element={<SpecialistDetails />} />
            <Route path="/addcontact" element={<AddContact />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/news" element={<News />} />
            <Route path="/lifehacks" element={<Lifehacks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<DonationComponent />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
