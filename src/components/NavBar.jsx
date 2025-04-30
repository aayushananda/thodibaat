import { useState, useEffect } from "react";

// Removed navLinks import since we're not using it
// import { navLinks } from "../constants";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className={`logo ${scrolled ? "scrolled" : ""}`}>
          <div className="flex items-center gap-1">
            <img
              src="/images/logo.png"
              alt="Thodi Baat Logo"
              className="h-15 w-auto"
            />
            <span>THODI BAAT</span>
          </div>
        </a>

        {/* Empty spacer div to push buttons to the right */}
        <div className="flex-1"></div>

        <div className="flex items-center gap-3">
          <a href="#features" className="features-btn">
            <div className="inner">
              <span>Features</span>
            </div>
          </a>
          <a href="#contact" className="contact-btn">
            <div className="inner">
              <span>Contact Us</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
