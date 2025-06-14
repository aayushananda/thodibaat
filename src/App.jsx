import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import AnimatedCounter from "./sections/Counter";
import Product from "./Product";
import AboutUs from "./AboutUs";
import ContactInfo from "./sections/ContactInfo";
import Filler from "./sections/Filler";
import ErrorBoundary from "./components/ErrorBoundary";

const HomePage = () => (
  <>
    <ErrorBoundary>
      <Hero />
    </ErrorBoundary>
    <FeatureCards />
    <AnimatedCounter />
    <Filler />
    <Contact />
  </>
);

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <ContactInfo />
      <Footer />
    </>
  );
};

export default App;
