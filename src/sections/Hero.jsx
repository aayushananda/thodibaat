import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  // Refs for animation targeting
  const heroTextRef = useRef(null);
  const heroSectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const headingRef = useRef(null);

  // State for image rotation
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Healthcare images for rotation - using external URLs
  const healthcareImages = [
    "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000",
    "https://images.unsplash.com/photo-1583912267550-82da322ed0ca?q=80&w=1000",
    "https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=1000",
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000",
  ];

  // Media query for 14-inch laptops (typically around 1366px width)
  const is14InchLaptop = useMediaQuery({ minWidth: 1200, maxWidth: 1440 });

  // GSAP animations
  useGSAP(() => {
    // Animate hero text
    gsap.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );

    // Animate hero content
    gsap.fromTo(
      ".hero-content",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 0.5 }
    );

    // Animate image container
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power2.out" }
      );
    }

    // Animate heading with letter spacing
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { letterSpacing: "-0.05em", opacity: 0.8 },
        {
          letterSpacing: "0em",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }

    // Animate hero section background
    if (heroSectionRef.current) {
      gsap.to(heroSectionRef.current, {
        backgroundPosition: "50% 55%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  // Mouse move effect ONLY for image container
  useEffect(() => {
    // Cache DOM elements to avoid repeated lookups
    const section = document.getElementById("hero");
    const heroSection = heroSectionRef.current;
    const imageContainer = imageContainerRef.current;

    if (!section || !heroSection || !imageContainer) return;

    // Get all bg-image elements for smoother reference
    const bgImages = imageContainer.querySelectorAll(".bg-image");

    // Throttle function to limit execution rate
    let lastExecution = 0;
    const throttleDelay = 10; // ms

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastExecution < throttleDelay) return;
      lastExecution = now;

      // Calculate normalized mouse position relative to window
      const windowX = e.clientX / window.innerWidth;
      const windowY = e.clientY / window.innerHeight;

      // Apply subtle parallax effect to hero section
      gsap.to(heroSection, {
        backgroundPosition: `${50 + (windowX - 0.5) * 8}% ${
          50 + (windowY - 0.5) * 8
        }%`,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Apply parallax to current visible image
      bgImages.forEach((img) => {
        if (img.style.opacity !== "0") {
          gsap.to(img, {
            scale: 1.05,
            x: (windowX - 0.5) * -15,
            y: (windowY - 0.5) * -15,
            duration: 1,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      // Reset hero section background
      gsap.to(heroSection, {
        backgroundPosition: "50% 50%",
        duration: 1.5,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Reset all images
      bgImages.forEach((img) => {
        gsap.to(img, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    // Add event listeners
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % healthcareImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative overflow-hidden h-[80vh] custom-glass-section"
      style={{
        backgroundColor: "#5DB996",
        opacity: "1",
        backgroundSize: "110% 110%",
        transition: "background-position 0.3s ease",
      }}
    >
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent"></div>

      {/* Glass effect border highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300/20 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-green-300/20 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-green-300/20 to-transparent"></div>

      {/* Glass reflection elements */}
      <div className="absolute top-0 left-0 w-[40%] h-[30%] bg-gradient-radial from-green-100/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-[30%] h-[20%] bg-gradient-radial from-green-100/5 to-transparent rounded-full blur-xl"></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full md:px-2 lg:px-2 max-w-full mx-auto">
        {/* Left content area */}
        <div className="pl-7">
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300/200 to-transparent"></div>

          {/* Left highlight */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-green-300/30 to-transparent"></div>

          <div className="hero-content w-full relative">
            <p className="hero-title text-green-800 font-bold mb-3 tracking-wider text-xl md:text-base uppercase">
              Welcome to Sharjah Drug Store
            </p>
            <h1
              ref={headingRef}
              className="hero-title text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 leading-tight"
            >
              UAE's Leading
              <span className="text-black">
                <h3 className="text-3xl">Healthcare Products Distributor</h3>
              </span>
            </h1>
            <p className="hero-title text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Sharjah Drug Store L.L.C Supplies is proud and committed to
              providing consumers with the best treatment possible across UAE.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="hero-title custom-btn flex items-center gap-2">
                <FontAwesomeIcon icon={faCommentDots} className="text-sm" />
                <span>FREE CONSULTATIONS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Spacing between containers */}
        <div className="hidden md:block w-[3%]"></div>

        {/* Right image area with curved edge and gradient border */}
        <div
          ref={imageContainerRef}
          className="w-full md:w-[45%] h-[50vh] md:h-[75vh] relative md:mt-0"
        >
          {/* Main image container */}
          <div className="absolute inset-0 rounded-l-[300px] overflow-hidden">
            {healthcareImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 bg-image ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url('${img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transformOrigin: "center",
                }}
              ></div>
            ))}

            {/* Glass effect on image */}
            <div className="absolute inset-0 rounded-l-[300px] bg-gradient-to-r from-white/10 via-transparent to-green-900/10 backdrop-blur-[2px]"></div>

            {/* Additional decorative elements */}
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl"></div>
            <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-green-200/20 rounded-full blur-3xl"></div>
          </div>

          {/* Inner border highlight for dimension */}
          <div className="absolute top-0 bottom-0 left-[20px] w-px bg-gradient-to-b from-transparent via-green-300/50 to-transparent z-10"></div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-[15%] left-[10%] w-6 h-6 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-[20%] left-[15%] w-4 h-4 bg-green-400 rounded-full opacity-20 animate-ping"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute top-[30%] right-[20%] w-8 h-8 bg-green-300 rounded-full opacity-10 animate-pulse"
        style={{ animationDuration: "4s" }}
      ></div>

      {/* Custom button styles from Product.jsx */}
      <style jsx="true">{`
        .custom-btn {
          background: #1aab8a;
          color: #fff;
          border: none;
          position: relative;
          height: 60px;
          font-size: 1em;
          padding: 0 2em;
          cursor: pointer;
          transition: 800ms ease all;
          outline: none;
          font-family: "Poppins", sans-serif;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-btn:hover {
          background: #fff;
          color: #1aab8a;
        }

        .custom-btn:before,
        .custom-btn:after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          height: 2px;
          width: 0;
          background: #1aab8a;
          transition: 400ms ease all;
        }

        .custom-btn:after {
          right: inherit;
          top: inherit;
          left: 0;
          bottom: 0;
        }

        .custom-btn:hover:before,
        .custom-btn:hover:after {
          width: 100%;
          transition: 800ms ease all;
        }
      `}</style>
    </section>
  );
};

export default Hero;
