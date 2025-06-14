import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Reset form and stop loading
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center py-16 px-5 md:px-20 max-w-7xl mx-auto"
    >
      {/* Message Us Today Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h3 className="text-amber-700 font-medium mb-2">
          WE ARE HERE TO HELP YOU
        </h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          <span className="text-green-600">Message</span> Us Today!
        </h2>
        <p className="text-gray-600">
          We are excited to post contents on the website. This space is reserved
          for more information about the company. Additional business details
          soon.
        </p>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-4xl mb-20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-green-600"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-green-600"
            required
          />

          <input
            type="text"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message(s)"
            className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-green-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center min-w-36 px-6 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                Submit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Testimonials and Map Section */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 rounded-xl overflow-hidden">
        {/* Testimonials Section */}
        <div className="p-10">
          <div className="mb-8">
            <h3 className="text-amber-700 font-medium mb-2">
              OUR TESTIMONIALS
            </h3>
            <h2 className="text-4xl font-bold mb-5">
              <span className="text-green-600">Client</span> Reviews
            </h2>
          </div>

          {/* Testimonial 1 */}
          <div className="mb-8">
            <div className="flex mb-3">
              <span className="text-5xl text-green-600">"</span>
            </div>
            <h4 className="text-xl font-bold mb-2">Dummy Name</h4>
            <p className="text-gray-600">
              This space is reserved for more information about the company.
              Additional business details soon.
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="mb-8">
            <div className="flex mb-3">
              <span className="text-5xl text-green-600">"</span>
            </div>
            <h4 className="text-xl font-bold mb-2">Dummy Name</h4>
            <p className="text-gray-600">
              This space is reserved for more information about the company.
              Additional business details soon.
            </p>
          </div>

          {/* Read More Button */}
          <button className="bg-green-600 text-white px-8 py-3 rounded-full flex items-center">
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Map Section - Keep the existing map */}
        <div className="h-full min-h-[500px]">
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: "url('/images/Map.png')" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
