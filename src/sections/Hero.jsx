import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { words } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

const Hero = () => {
  // Refs for animation targeting
  const heroTextRef = useRef(null);

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
  }, []);

  // Dynamic styles based on screen size
  const textSizeClass = is14InchLaptop ? "md:text-[38px]" : "";
  const slideClass = is14InchLaptop
    ? "md:h-[70px] md:py-[22px] md:w-[250px]"
    : "";
  const iconClass = is14InchLaptop
    ? "md:size-6"
    : "xl:size-12 md:size-10 size-7";

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: "url('/images/heroImage.png')" }}
    >
      {/* Small Image Above Overlay */}
      <div className="absolute bottom-90 left-10 z-20 w-1/2">
        <img
          src="/images/heroWrapper.png"
          alt="Small Icon"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Optional overlay for better text visibility */}
      <div className="absolute inset-0 bg-opacity-40"></div>

      {/* Absolute positioning to place content at specific location */}
      <div className="absolute inset-x-0 bottom-40 z-10">
        <div className="w-full pb-10">
          {/* Hero Content - Positioned at the bottom with absolute positioning */}
          <header
            className={`flex flex-col md:w-4/5 w-full px-4 md:px-8${
              is14InchLaptop ? "md:py-8" : ""
            }`}
            ref={heroTextRef}
          >
            <div className="flex flex-col gap-5">
              <div className={`hero-text ${textSizeClass}`}>
                <h1 className="hero-title text-black-50">
                  Showcasing Indian
                  <span className={`slide ${slideClass}`}>
                    <span className="wrapper">
                      {words.map((word, index) => (
                        <span
                          key={index}
                          className={`flex items-center md:gap-2 gap-1 pb-2 ${
                            is14InchLaptop ? "md:pb-1" : ""
                          }`}
                        >
                          <img
                            src={word.imgPath}
                            alt={`${word.text} icon`}
                            className={`${iconClass} md:p-2 p-1 rounded-full bg-white-50`}
                          />
                          <span
                            className={
                              is14InchLaptop
                                ? "text-[36px] whitespace-nowrap"
                                : ""
                            }
                          >
                            {word.text}
                          </span>
                        </span>
                      ))}
                    </span>
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className={`hero-title text-black-50 ${textSizeClass}`}>
                    Karo Apno Se Baat on
                  </h1>
                  <h1 className={`hero-title text-blue-500 ${textSizeClass}`}>
                    THODI BAAT
                  </h1>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </section>
  );
};

export default Hero;
