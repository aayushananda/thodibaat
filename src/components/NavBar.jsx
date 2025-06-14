import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      // If not on homepage, navigate to homepage with contact section
      window.location.href = "/#contact";
    } else {
      // If already on homepage, just scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top header with logo, phone and email */}
      <div className="w-full bg-white py-4 px-5 md:px-20">
        <div className="flex justify-between items-center bg-white">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Sharjah Logo"
                className="h-22 w-auto"
              />
              <h1 className="text-3xl font-bold">
                <span className="text-green-600">Sarjah</span>
                <div className="text-gray-800">Drug Store</div>
              </h1>
            </div>
          </Link>
  {/* Main Navigation */}
      <header className="w-2l text-black">
        <div className="inner max-w-screen-xl mx-auto px-5 md:px-20 flex justify-center items-center">
          <nav className="desktop py-5">
            <ul className="flex gap-8">
              <li className="group">
                <Link to="/">
                  <span className="text-black">Home</span>
                  <span className="underline" />
                </Link>
              </li>

              {navLinks.map(
                ({ link, name }) =>
                  name !== "Home" && (
                    <li key={name} className="group">
                      {link.startsWith("/#") ? (
                        <a href={link.substring(1)}>
                          <span className="text-black">{name}</span>
                          <span className="underline" />
                        </a>
                      ) : (
                        <Link to={link}>
                          <span className="text-black">{name}</span>
                          <span className="underline" />
                        </Link>
                      )}
                    </li>
                  )
              )}
            </ul>
          </nav>
        </div>
      </header>
          {/* Contact Info and WhatsApp */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col">
              <a
                href="mailto:info@sharjahdrugstore.com"
                className="text-green-700 font-medium hover:text-green-800 transition-colors"
              >
                info@sharjahdrugstore.com
              </a>
              <a
                href="tel:+97165352225"
                className="text-gray-800 text-xl font-semibold hover:text-green-700 transition-colors"
              >
                (+971) 65352225
              </a>
            </div>

            {/* WhatsApp Icon */}
            <a
              href="https://api.whatsapp.com/send?phone=97165352225"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors"
            >
              <i className="ri-whatsapp-line text-xl"></i>
            </a>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default NavBar;
