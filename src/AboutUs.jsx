import { motion } from "framer-motion";

const AboutUs = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full font-sans">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-24 mt-25 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
      </div>

      {/* About Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-16 bg-white">
        <motion.div
          className="max-w-xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
        >
          <img
            src="/images/Dukaan.png"
            alt="capsules"
            style={{
              border: "2px solid #000", // black border of 2px
              borderRadius: "8px", // optional: smooth corners
            }}
          />
        </motion.div>

        <motion.div
          className="max-w-2xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            Working together for a healthy life
          </h2>
          <h3 className="text-3xl font-bold mb-4">
            Sharjah Drug Store LLC is a Leading Retailer And Distributor Of
            Health Care Products Across UAE
          </h3>
          <p className="text-gray-600">
            We are committed to providing a comprehensive solution and customer
            satisfaction in healthcare and consumer needs. We maintain the
            highest level of operational reliability, consistency, and integrity
            in a powerful engine of success: Trust and outstanding care.
          </p>
          <p className="mt-4 font-bold text-xl text-green-800">
            Established in 2004
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-green-100 py-16 px-6">
        <motion.h2
          className="text-center text-3xl font-bold text-green-800 mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          Our Values
        </motion.h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: "Continuous Improvement, Innovation & Excellence",
              desc: "We believe that everything we do can be done better, more efficiently, in a healthier and sustainably driven ecosystem.",
            },
            {
              title: "Social & Environmental Responsibility",
              desc: "We promote and maintain local commitments and give full respect to our employees, community, and the environment.",
            },
            {
              title: "Transparency",
              desc: "Our goal is to achieve complete transparency in business activities across our organization as well as its projects and stakeholders.",
            },
            {
              title: "Quality, Health, Safety & Security",
              desc: "We believe in delivering the highest standards of quality, health, and safety through all available mechanisms in our industry.",
            },
            {
              title: "Teamwork With Integrity",
              desc: "We are a goal-driven team that aspires to provide the utmost professionalism and support in all operations.",
            },
            {
              title: "Efficiency & Effectiveness",
              desc: "Our aim is to deliver best-in-class and innovative solutions in order to achieve maximum quality and value while minimizing resource overheads.",
            },
            {
              title: "Reliability & Accountability",
              desc: "We strive to exceed our clients' expectations and their customer satisfaction. We deliver on every step.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-green-700 font-semibold text-lg mb-2">
                {value.title}
              </h4>
              <p className="text-gray-700 text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-6 bg-white flex flex-col md:flex-row gap-12 items-center justify-center">
        <motion.div
          className="max-w-2xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Our History
          </h2>
          <p className="text-gray-600">
            Sharjah Drug Store LLC was established by Sultan Alsoori (UAE
            National) who has vast local network within all key UAE Governmental
            Medical Institutions & MOH. The company also distributes for known
            pharmaceutical brands. With its expansion strategy, the agency aims
            to distribute for health care products in the whole UAE area.
          </p>
        </motion.div>

        <motion.div
          className="max-w-xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazlvZzhybjJzdHlnY3c1Ym5tcDhsdHRjZTlobGJkeXlhdTB4dmptdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKz2eMXx7dn95FS/giphy.gif"
            alt="Science experiment animation"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
