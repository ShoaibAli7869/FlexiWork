// src/pages/LandingPage.jsx

import Navbar from "../../components/Landing/Navbar";
import Hero from "../../components/Landing/Hero";
import LogoTicker from "../../components/Landing/LogoTicker";
import Problems from "../../components/Landing/Problems";
import Features from "../../components/Landing/Features";
import HowItWorks from "../../components/Landing/HowItWorks";
import Comparison from "../../components/Landing/Comparison";
import Stats from "../../components/Landing/Stats";
import Testimonials from "../../components/Landing/Testimonials";
import Pricing from "../../components/Landing/Pricing";
import CTA from "../../components/Landing/CTA";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Hero />
      <LogoTicker />
      <Problems />
      <Features />
      <HowItWorks />
      <Comparison />
      <Stats />
      <Testimonials />
      <Pricing />
      <CTA />
    </div>
  );
};

export default LandingPage;
