import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaGamepad,
  FaCrosshairs,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const events = [
  {
    title: "Web-a-Thon",
    description:
      "Build innovative websites under time pressure with your team.",
    icon: <FaLaptopCode />,
    image: "/about/event/hackathon.png",
    route: "/events/webathon",
  },
  
  {
    title: "BGMI E-Sports",
    description:
      "Battle it out in intense BGMI matches showcasing strategy, teamwork, and survival skills.",
    icon: <FaGamepad />,
    image: "/about/event/bgmi.png",
    route: "/events/bgmi", // future
  },
  {
    title: "Valorant E-Sports",
    description:
      "Battle it out in intense 5v5 Valorant matches showcasing powers, teamwork, and elimination skills.",
   icon: <FaCrosshairs />,
   image: "/about/event/valorant.png",
  route: "/events/valorant" // future
  },
];

const Events = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="events"
      className="py-20 bg-lightbg dark:bg-darkbg transition-colors duration-300"
    >
      <div className="text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-14 text-gray-900 dark:text-gray-200">
          TechVerse Vista{" "}
          <span className="text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.7)]">
            Events
          </span>
        </h2>

        {/* Cards Grid */}
        <div
          className="
            grid
    grid-cols-1
    md:grid-cols-3
    gap-10
    max-w-7xl
    mx-auto
    px-8
    justify-items-center
          "
        >
          {events.map((event, index) => (
            <EventCard
              key={index}
              {...event}
              onClick={() => navigate(event.route)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const EventCard = ({ title, description, icon, image, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260 }}
      className="
        relative
        bg-white dark:bg-darkcard
        border border-gray-200 dark:border-gray-700
        rounded-2xl
        overflow-hidden
        text-left
        cursor-pointer
      "
      onClick={onClick}
    >
      {/* ===== IMAGE SECTION (NEW) ===== */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* subtle overlay to match neon theme */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
      </div>

      {/* ===== CARD CONTENT (UNCHANGED DESIGN) ===== */}
      <div className="p-6">
        {/* Neon Glow */}
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
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* CTA */}
        <span className="text-sm font-medium text-primary hover:underline">
          View Details →
        </span>
      </div>
    </motion.div>
  );
};

export default Events;
