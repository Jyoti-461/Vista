import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import collegeLogo from "../assets/college-logo.png";
import vistaLogo from "../assets/vista-logo.png";
import iiclogo from "../assets/csi-logo.png"; 
import csilogo from "../assets/iic-logo.png"; 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Events", id: "events" },
    { label: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const offset = 80;
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-white/80 dark:bg-darkbg/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between relative">

        {/* ===== LEFT: LOGOS + EVENT NAME ===== */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-4 cursor-pointer z-20"
        >
          {/* Logos Wrapper */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* College Logo - Rectangular */}
            <div className="flex items-center justify-center transition-transform hover:scale-105">
              <img 
                src={collegeLogo} 
                alt="College Logo" 
                className="h-14 w-auto md:h-16 object-contain" 
              />
            </div>

            {/* Vista Logo - Bigger in circle with less padding */}
            <div className="flex items-center justify-center transition-transform hover:scale-105 rounded-full bg-white shadow-sm overflow-hidden p-1 h-14 w-14 md:h-16 md:w-16">
              <img 
                src={vistaLogo} 
                alt="Vista Logo" 
                className="h-12 w-12 md:h-14 md:w-14 object-contain" 
              />
            </div>

            {/* Event Name */}
            <h1 className="hidden sm:block text-xl md:text-2xl font-extrabold tracking-wide text-primary neon-primary whitespace-nowrap">
              TechVerse Vista <span className="text-gray-300">2026</span>
            </h1>
          </div>
        </div>

        {/* ===== CENTER: NAV LINKS (Desktop) ===== */}
        <ul className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-10 text-lg font-medium text-gray-300 z-10">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative group cursor-pointer hover:text-primary transition"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>
        

        {/* ===== RIGHT: CONTROLS + LOGOS ===== */}
        <div className="flex items-center gap-3 md:gap-4 z-20">
          
          {/* Right-side logos - Visible on both mobile and desktop */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* IIC Logo - Bigger in circle with less padding */}
            <div className="flex items-center justify-center transition-transform hover:scale-105 rounded-full bg-white shadow-sm overflow-hidden p-1 h-14 w-14 md:h-16 md:w-16">
              <img 
                src={iiclogo} 
                alt="IIC Logo" 
                className="h-12 w-12 md:h-14 md:w-14 object-contain" 
              />
            </div>
            
            {/* CSI Logo - Bigger in circle with less padding */}
            <div className="flex items-center justify-center transition-transform hover:scale-105 rounded-full bg-white shadow-sm overflow-hidden p-1 h-14 w-14 md:h-16 md:w-16">
              <img 
                src={csilogo} 
                alt="CSI Logo" 
                className="h-12 w-12 md:h-14 md:w-14 object-contain" 
              />
            </div>
          </div>

          

          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`h-0.5 w-6 bg-gray-200 transition ${menuOpen && "rotate-45 translate-y-2"}`} />
            <span className={`h-0.5 w-6 bg-gray-200 transition ${menuOpen && "opacity-0"}`} />
            <span className={`h-0.5 w-6 bg-gray-200 transition ${menuOpen && "-rotate-45 -translate-y-2"}`} />
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-darkcard border-t border-gray-200 dark:border-gray-800 shadow-xl"
          >
            <ul className="flex flex-col px-6 py-8 gap-6 text-center text-lg font-medium">
              {/* Show Title in Menu for Mobile context if hidden in navbar */}
              <li className="sm:hidden mb-4 text-xl font-bold text-primary">TechVerse Vista 2026</li>
              
              {navItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-primary transition"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;