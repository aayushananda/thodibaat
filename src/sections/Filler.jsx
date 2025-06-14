import { useEffect, useRef } from "react";

const Filler = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.backgroundPositionY = `${
          scrollPosition * 0.5
        }px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { id: 1, name: "Agency", icon: "ri-medicine-bottle-line" },
    { id: 2, name: "Distribution", icon: "ri-capsule-line" },
    { id: 3, name: "Export", icon: "ri-first-aid-kit-line" },
  ];

  return (
    <section
      ref={parallaxRef}
      className="relative py-16 overflow-hidden bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/medicine-5029089_1920.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90 z-0"></div>

      <div className="container mx-auto px-5 md:px-20 z-10 relative">
        {/* Welcome Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-green-600">Our</span> Coverage
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We are excited to post contents on the website. This space is
            reserved for more information about the company. Additional business
            details will be uploaded on this website soon. You are reading dummy
            text as placeholders for this layout. Dummy text for the reader to
            review. Words shown on this layout are placeholders. We are excited
            to post contents on the website. This space is reserved for more
            information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Services Section */}
          <div className="bg-green-50/80 rounded-xl p-8 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded-lg">
                <img src="/images/" alt="Services" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Services</h2>
                <p className="text-green-600 font-medium">WE OFFER</p>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-green-600 text-white rounded-full px-6 py-3 flex justify-between items-center hover:bg-green-700 transition-colors cursor-pointer"
                >
                  <span className="font-medium">{service.name}</span>
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pharmacist Consultation Section */}
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w mb-6 lg:mb-0">
              <img
                src="/images/Dukaan.png"
                alt="Pharmacist"
                className="rounded-xl shadow-lg"
              />
            </div>
            {/* <div className="lg:w-1/2 lg:pl-8">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="text-amber-700 font-medium mb-2">
                  CONSULT WITH A
                </h3>
                <h2 className="text-3xl font-bold mb-4">Pharmacist</h2>
                <p className="text-gray-600 mb-6">
                  We are excited to post contents on the website. This space is
                  reserved for more information soon.
                </p>
                <button className="group relative bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-green-600 group-hover:scale-0 transition-transform duration-300 rounded-full"></div>
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                  <i className="ri-arrow-right-line relative z-10 text-xl group-hover:text-green-600 transition-colors duration-300"></i>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filler;
