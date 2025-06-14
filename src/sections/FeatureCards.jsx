import { abilities } from "../constants";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Reset cards refs array
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, abilities.length);
  }, []);

  // Add parallax and animation effects
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

    // Animate cards on scroll
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );

    // Mouse move effect for parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const sectionX = clientX / window.innerWidth;
      const sectionY = clientY / window.innerHeight;

      // Subtle background movement
      gsap.to(section, {
        backgroundPosition: `${50 + (sectionX - 0.5) * 5}% ${
          50 + (sectionY - 0.5) * 5
        }%`,
        duration: 1,
        ease: "power2.out",
      });

      // Cards hover effect
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const distanceX = (clientX - cardCenterX) / (window.innerWidth / 2);
        const distanceY = (clientY - cardCenterY) / (window.innerHeight / 2);

        gsap.to(card, {
          rotateY: -distanceX * 5,
          rotateX: distanceY * 5,
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
      cardsRef.current.forEach((card) => {
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
  }, []);

  return (
    <div
      id="features"
      ref={sectionRef}
      className="w-full padding-x-lg py-20 mb-15 relative custom-glass-section overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
        backgroundSize: "110% 110%",
        transition: "background-position 0.3s ease",
      }}
    >
      {/* Glass effect border highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

      {/* Glass reflection elements */}
      <div className="absolute top-0 left-0 w-[40%] h-[30%] bg-gradient-radial from-white/20 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-[30%] h-[20%] bg-gradient-radial from-white/15 to-transparent rounded-full blur-xl"></div>

      {/* Animated glass particles */}
      <div className="glass-particles">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="glass-particle absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4,
              animation: `float ${
                Math.random() * 10 + 10
              }s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Title header section - with glass effect */}
      <div className="relative z-10 text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-5 py-10 font-bold bg-gradient-to-r from-green-800 via-green-600 to-green-800 bg-clip-text text-transparent">
            Working together for a healthy life
          </h2>
      </div>

      {/* Feature cards grid - with glass effect */}
      <div className="service__grid relative z-10">
        {abilities.map(({ imgPath, title, desc }, index) => (
          <div
            key={title}
            ref={(el) => (cardsRef.current[index] = el)}
            className="service__card custom-glass-container transform-gpu"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Card highlight effects */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

            <span className="relative z-10">
              <i className={getIconClass(title)}></i>
            </span>
            <h4 className="relative z-10">{title}</h4>
            <p className="relative z-10">{desc}</p>

            {/* Inner glass reflection */}
            <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-radial from-white/5 to-transparent opacity-70 transform rotate-45"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to map titles to appropriate icons
const getIconClass = (title) => {
  const iconMap = {
    "Our History": "ri-microscope-line",
    "Constant Innovation": "ri-mental-health-line",
    "Societal Responsibility": "ri-hospital-line",
  };

  return iconMap[title] || "ri-microscope-line"; // Default icon if no match
};

export default FeatureCards;
