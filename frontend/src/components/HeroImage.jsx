import { motion, useScroll, useTransform } from "framer-motion";

const HeroImage = () => {
  const { scrollY } = useScroll();

  // Parallax movement (image moves slower than page)
  const y = useTransform(scrollY, [0, 400], [0, -120]);

  return (
    <section
      className="
        relative
        w-full
        min-h-screen
        bg-black dark:bg-black
        light:bg-white
        flex items-center justify-center
        overflow-hidden
      "
    >
      {/* Poster Image */}
      <motion.img
        src="/vista.jpg"
        alt="TechVerse Vista 2026 Poster"
        style={{ y }}
        className="
          w-full
          max-w-[1400px]
          h-auto
          object-contain
          select-none
          pointer-events-none
        "
      />
    </section>
  );
};

export default HeroImage;
