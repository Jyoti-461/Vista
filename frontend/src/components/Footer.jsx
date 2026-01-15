import { FaInstagram, FaLinkedin, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-lightbg dark:bg-darkbg border-t border-gray-300 dark:border-gray-800 py-14 px-6 transition-colors">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT: Address */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
            Venue <FaMapMarkerAlt />
          </h3>

          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Thakur Institute of Management Studies, Career Development & Research
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            Gate No. 4, Thakur Educational Campus,<br />
            Thakur MCA, Thakur Road,<br />
            Thakur Village, Kandivali East,<br />
            Mumbai, Maharashtra – 400101
          </p>
        </div>

        {/* RIGHT: Google Map */}
        <div className="w-full h-[280px] rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
          <iframe
            title="TIMSCDR Location"
            src="https://www.google.com/maps?q=TIMSCDR%20Thakur%20Institute%20of%20Management%20Studies&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">

        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2026 TechVerse Vista — Made with ❤️ by Team{" "}
          <span className="text-primary">Vista</span>
        </p>

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full
        bg-primary text-white shadow-lg
        hover:scale-110 transition neon-primary"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
