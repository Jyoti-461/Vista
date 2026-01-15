import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll for navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force dark mode on first load
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  // Navigation items (must match section ids)
  const navItems = [
    { label: "About", id: "about" },
    { label: "Events", id: "events" },
    { label: "Register", id: "register" },
    { label: "Contact", id: "contact" },
  ];

  // Smooth scroll handler with offset
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const offset = 80; // navbar height
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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-bold text-primary neon-primary cursor-pointer"
        >
          TechVerse Vista{" "}
          <span className="text-gray-700 dark:text-gray-300">2026</span>
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-700 dark:text-gray-300">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative cursor-pointer hover:text-primary transition"
            >
              {item.label}
              <span
                className="
                  absolute -bottom-1 left-0 w-0 h-[2px]
                  bg-primary transition-all duration-300
                  group-hover:w-full
                "
              />
            </li>
          ))}
        </ul>

        {/* Right Controls */}
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
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="
                    cursor-pointer
                    text-gray-700 dark:text-gray-300
                    hover:text-primary transition
                  "
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
