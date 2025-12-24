import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaPalette, FaQuestion } from "react-icons/fa";

const events = [
  {
    title: "Hackathon",
    description:
      "Build innovative solutions under time pressure with your team.",
    icon: <FaLaptopCode />,
  },
  {
    title: "Coding Contest",
    description:
      "Test your problem-solving skills with competitive coding challenges.",
    icon: <FaCode />,
  },
  {
    title: "UI/UX Challenge",
    description:
      "Design intuitive and creative interfaces for real-world problems.",
    icon: <FaPalette />,
  },
  {
    title: "Tech Quiz",
    description:
      "Show your tech knowledge across programming, AI, and IT trends.",
    icon: <FaQuestion />,
  },
];

const Events = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        py-20 px-6
        bg-lightbg dark:bg-darkbg
      "
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="
          text-3xl md:text-4xl font-bold mb-12
          text-gray-900 dark:text-gray-200
        ">
          TechVerse Vista{" "}
          <span className="text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.7)]">
            Events
          </span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const EventCard = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260 }}
      className="
        relative
        bg-white dark:bg-darkcard
        border border-gray-200 dark:border-gray-700
        rounded-2xl p-6 text-left group
      "
    >
      {/* Neon glow */}
      <div
        className="
          absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition
          bg-gradient-to-br from-primary/30 to-indigo-500/30
          blur-xl -z-10
        "
      />

      {/* Icon */}
      <div className="text-3xl text-primary mb-4 neon-primary">
        {icon}
      </div>

      {/* Title */}
      <h3 className="
        text-xl font-semibold mb-2
        text-gray-900 dark:text-gray-200
      ">
        {title}
      </h3>

      {/* Description */}
      <p className="
        text-sm mb-6
        text-gray-600 dark:text-gray-400
      ">
        {description}
      </p>

      {/* CTA */}
      <button className="text-sm font-medium text-primary hover:underline">
        View Details →
      </button>
    </motion.div>
  );
};

export default Events;
