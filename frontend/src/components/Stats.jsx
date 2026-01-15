import { motion } from "framer-motion";
import AnimatedCounter from "../components/AnimatedCounter";

const statsData = [
  { label: "Participants", value: 1500 },
  { label: "Colleges", value: 50 },
  { label: "Events", value: 15 },
  { label: "Audience", value: 3000 },
];

const Stats = () => {
  return (
    <section className="py-20 px-6 bg-lightbg dark:bg-darkbg transition">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          TechVerse Vista <span className="text-primary">Highlights</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        bg-white dark:bg-darkcard
        border border-gray-200 dark:border-gray-700
        rounded-xl p-6
        neon-primary
      "
    >
      <h3 className="text-3xl font-extrabold text-primary mb-2">
        <AnimatedCounter value={value} />+
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {label}
      </p>
    </motion.div>
  );
};

export default Stats;
