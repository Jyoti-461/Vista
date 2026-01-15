import { motion } from "framer-motion";

const Hero = () => {
  const scrollToRegister = () => {
    const section = document.getElementById("register");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        relative
        flex flex-col items-center justify-center
        text-center px-4
        pt-32 pb-20
        text-gray-900 dark:text-gray-200
      "
    >
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-6xl font-extrabold"
      >
        TechVerse Vista{" "}
        <span className="text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
          2026
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
      >
        TIMSCDR Mumbai’s flagship Tech Fest — innovation, coding, creativity,
        and competition at its peak.
      </motion.p>

      <motion.button
        onClick={scrollToRegister}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="
          mt-10 px-6 py-3
          bg-primary text-white
          rounded-lg font-medium
          neon-primary
        "
      >
        Register Now
      </motion.button>
    </motion.section>
  );
};

export default Hero;
