import React, { useState, useRef, useEffect } from "react";
import { counterItems } from "../constants";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

const AnimatedCounter = () => {
  const [counterStarted, setCounterStarted] = useState(false);
  const sectionRef = useRef(null);
  const counterCardsRef = useRef([]);

  // Reset counter cards refs array
  useEffect(() => {
    counterCardsRef.current = counterCardsRef.current.slice(
      0,
      counterItems.length
    );
  }, []);

  // Configure intersection observer (trigger when 50% visible)
  const { ref: counterRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Start counters when section enters viewport
  useEffect(() => {
    if (inView && !counterStarted) {
      setCounterStarted(true);
    }
  }, [inView, counterStarted]);

  // Apply glass effect animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate section background
    gsap.to(section, {
      backgroundPosition: "50% 55%",
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animate counter cards when in view
    if (inView && counterCardsRef.current.length > 0) {
      gsap.fromTo(
        counterCardsRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 1,
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
        backgroundPosition: `${50 + (sectionX - 0.5) * 5}% ${
          50 + (sectionY - 0.5) * 5
        }%`,
        duration: 1,
        ease: "power2.out",
      });

      // Cards hover effect
      counterCardsRef.current.forEach((card, index) => {
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
      counterCardsRef.current.forEach((card) => {
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
  }, [inView, counterStarted]);

  // Set combined ref for both gsap animations and intersection observer
  const setRefs = (element) => {
    sectionRef.current = element;
    counterRef(element);
  };

  return (
    <div
      id="counter"
      ref={setRefs}
      className="custom-glass-section bg-gradient-to-r from-green-800 via-green-600 to-green-800 text-white padding-x-lg py-16 mb-20 relative overflow-hidden"
      style={{
        backgroundSize: "110% 110%",
        transition: "background-position 0.3s ease",
      }}
    >
      {/* Glass effect border highlights */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/100 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/90 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/90 to-transparent"></div>

      {/* Glass reflection elements */}
      <div className="absolute top-0 left-0 w-[40%] h-[30%] bg-gradient-radial from-white/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-[30%] h-[20%] bg-gradient-radial from-white/10 to-transparent rounded-full blur-xl"></div>

      {/* Animated glass particles */}
      <div className="glass-particles">
        {[...Array(5)].map((_, i) => (
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
        {/* <div className="text-center mb-10">
          <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            Our Numbers
          </h3>
          <p className="text-green-100 max-w-2xl mx-auto">
            We are proud of our achievements and milestones in delivering
            quality healthcare services
          </p>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {counterItems.map((item, index) => (
            <div
              key={item.label}
              ref={(el) => (counterCardsRef.current[index] = el)}
              className="group transform-gpu"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="custom-glass-counter bg-white/100 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-300 relative overflow-hidden">
                {/* Card highlight effects */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

                <div className="counter-number text-white text-5xl font-bold mb-3 relative z-10">
                  {counterStarted ? (
                    <CountUp
                      suffix={item.suffix}
                      end={item.value}
                      duration={2.5}
                    />
                  ) : (
                    // Show starting value before animation
                    <span>0{item.suffix}</span>
                  )}
                </div>
                <div className="text-green-100 text-lg relative z-10">
                  {item.label}
                </div>

                {/* Inner glass reflection */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-radial from-white/10 to-transparent opacity-70 transform rotate-45"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCounter;
