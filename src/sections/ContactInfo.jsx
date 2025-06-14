import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

const ContactInfo = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Configure intersection observer
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Reset card refs array
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, 3); // 3 cards
  }, []);

  // Set combined ref for both gsap animations and intersection observer
  const setRefs = (element) => {
    sectionRef.current = element;
    inViewRef(element);
  };

  // Apply glass effect animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section background
    gsap.to(section, {
      backgroundPosition: "50% 55%",
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animate cards when in view
    if (inView && cardRefs.current.length > 0) {
      gsap.fromTo(
        cardRefs.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // Mouse move effect for parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const sectionX = clientX / window.innerWidth;
      const sectionY = clientY / window.innerHeight;

      // Subtle background movement
      gsap.to(section, {
        backgroundPosition: `${50 + (sectionX - 0.5) * 3}% ${
          50 + (sectionY - 0.5) * 3
        }%`,
        duration: 1,
        ease: "power2.out",
      });

      // Cards hover effect
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const distanceX = (clientX - cardCenterX) / (window.innerWidth / 2);
        const distanceY = (clientY - cardCenterY) / (window.innerHeight / 2);

        gsap.to(card, {
          rotateY: -distanceX * 3,
          rotateX: distanceY * 3,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      // Reset background position
      gsap.to(section, {
        backgroundPosition: "50% 50%",
        duration: 1,
        ease: "power2.out",
      });

      // Reset cards rotation
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [inView]);

  return (
    <section
      ref={setRefs}
      className="bg-gradient-to-r from-green-800 via-green-600 to-green-800 text-white py-12 px-6 relative overflow-hidden"
      style={{
        backgroundSize: "110% 110%",
        transition: "background-position 0.3s ease",
      }}
    >
      {/* Glass effect border highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

      {/* Glass reflection elements */}
      <div className="absolute top-0 left-0 w-[40%] h-[30%] bg-gradient-radial from-white/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-[30%] h-[20%] bg-gradient-radial from-white/10 to-transparent rounded-full blur-xl"></div>

      {/* Animated glass particles */}
      <div className="glass-particles">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="glass-particle absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${
                Math.random() * 10 + 15
              }s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            Connect With Us
          </h3>
          <p className="text-green-100 max-w-2xl mx-auto">
            Your trusted partner in healthcare - delivering quality medicines
            right to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Phone */}
          <div
            className="group transform-gpu"
            ref={(el) => (cardRefs.current[0] = el)}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 
                          hover:bg-white/15 transition-all duration-500 shadow-lg 
                          hover:shadow-green-300/20 hover:border-white/30 
                          relative overflow-hidden"
            >
              {/* Card highlight effects */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-white/50 via-white/30 to-transparent"></div>

              <div
                className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 
                            group-hover:bg-white/30 transition-all duration-300 
                            shadow-inner shadow-white/10"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">Call Us</h4>
              <p className="text-green-100 font-medium">(+971) 65430255</p>
              <p className="text-green-200 text-xs mt-1">
                Available 24/7 for emergencies
              </p>

              {/* Inner glass reflection */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-radial from-white/10 to-transparent opacity-70 transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div
            className="group transform-gpu"
            ref={(el) => (cardRefs.current[1] = el)}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 
                          hover:bg-white/15 transition-all duration-500 shadow-lg 
                          hover:shadow-green-300/20 hover:border-white/30 
                          relative overflow-hidden"
            >
              {/* Card highlight effects */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-white/50 via-white/30 to-transparent"></div>

              <div
                className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 
                            group-hover:bg-white/30 transition-all duration-300 
                            shadow-inner shadow-white/10"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">
                Visit Us
              </h4>
              <p className="text-green-100 font-medium text-sm">
                Industrial Area 8
              </p>
              <p className="text-green-100 font-medium text-sm">
                Sharjah, United Arab Emirates
              </p>
              <p className="text-green-200 text-xs mt-1">
                Fast delivery across UAE
              </p>

              {/* Inner glass reflection */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-radial from-white/10 to-transparent opacity-70 transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div
            className="group transform-gpu"
            ref={(el) => (cardRefs.current[2] = el)}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 
                          hover:bg-white/15 transition-all duration-500 shadow-lg 
                          hover:shadow-green-300/20 hover:border-white/30 
                          relative overflow-hidden"
            >
              {/* Card highlight effects */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-white/50 via-white/30 to-transparent"></div>

              <div
                className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 
                            group-hover:bg-white/30 transition-all duration-300 
                            shadow-inner shadow-white/10"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white">
                Email Us
              </h4>
              <p className="text-green-100 font-medium text-sm">
                info@sharjahdrugstore.com
              </p>
              <p className="text-green-200 text-xs mt-1">
                Quick response guaranteed
              </p>

              {/* Inner glass reflection */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-radial from-white/10 to-transparent opacity-70 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-lg rounded-full px-5 py-2 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300">
            <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-white font-medium text-sm">
              Online & Ready to Serve
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
