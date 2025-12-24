import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-lightbg dark:bg-darkbg
        text-gray-900 dark:text-gray-200
        text-center px-4
      "
    >
      {/* Title */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-6xl font-extrabold"
      >
        TechVerse Vista{" "}
        <span className="text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
          2026
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="
          mt-6 max-w-2xl text-lg
          text-gray-600 dark:text-gray-400
        "
      >
        TIMSCDR Mumbai’s flagship Tech Fest — innovation, coding, creativity,
        and competition at its peak.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex flex-wrap gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-6 py-3 bg-primary text-white
            neon-primary
            rounded-lg font-medium
          "
        >
          Register Now
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-6 py-3
            border border-primary text-primary
            rounded-lg font-medium
            hover:bg-primary/10 transition
          "
        >
          Download Brochure
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
