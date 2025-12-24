import { motion } from "framer-motion";

const sponsors = [
  { name: "Google", logo: "/sponsors/google.png" },
  { name: "Microsoft", logo: "/sponsors/microsoft.png" },
  { name: "Amazon", logo: "/sponsors/amazon.png" },
  { name: "Meta", logo: "/sponsors/meta.png" },
  { name: "Infosys", logo: "/sponsors/infosys.png" },
  { name: "TCS", logo: "/sponsors/tcs.png" },
];

const Sponsors = () => {
  return (
    <section className="py-24 px-6 bg-lightbg dark:bg-darkbg transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-14 text-gray-900 dark:text-gray-200"
        >
          Our <span className="text-primary">Sponsors</span>
        </motion.h2>

        {/* Moving Grid */}
        <div className="relative">
          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SponsorCard = ({ sponsor }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="min-w-[220px] h-[120px]
      bg-white dark:bg-darkcard
      border border-gray-300 dark:border-gray-700
      rounded-xl flex items-center justify-center
      shadow-md dark:shadow-none
      transition neon-secondary"
    >
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        className="max-h-[60px] object-contain grayscale hover:grayscale-0 transition"
      />
    </motion.div>
  );
};

export default Sponsors;
