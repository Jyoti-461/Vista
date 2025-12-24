import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ FORCE DARK MODE ON FIRST LOAD
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = ["About", "Events", "Register", "Team", "Contact"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-white/80 dark:bg-darkbg/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-lg font-bold text-primary neon-primary">
          TechVerse Vista{" "}
          <span className="text-gray-700 dark:text-gray-300">2026</span>
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-700 dark:text-gray-300">
          {navItems.map((item) => (
            <li
              key={item}
              className="relative cursor-pointer hover:text-primary transition"
            >
              {item}
              <span
                className="
                  absolute -bottom-1 left-0 w-0 h-[2px]
                  bg-primary transition-all duration-300
                  hover:w-full
                "
              />
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-lg
              border border-gray-300 dark:border-gray-700
              hover:bg-gray-100 dark:hover:bg-darkcard
              transition
            "
          >
            {dark ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-indigo-600" />
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-gray-800 dark:bg-gray-200 transition ${
                menuOpen && "rotate-45 translate-y-2"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-800 dark:bg-gray-200 transition ${
                menuOpen && "opacity-0"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-800 dark:bg-gray-200 transition ${
                menuOpen && "-rotate-45 -translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="
              md:hidden
              bg-white dark:bg-darkcard
              border-t border-gray-200 dark:border-gray-800
            "
          >
            <ul className="flex flex-col px-6 py-6 gap-6 text-sm">
              {navItems.map((item) => (
                <li
                  key={item}
                  onClick={() => setMenuOpen(false)}
                  className="
                    cursor-pointer
                    text-gray-700 dark:text-gray-300
                    hover:text-primary transition
                  "
                >
                  {item}
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
