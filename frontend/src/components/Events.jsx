import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
      "Build innovative UI/UX with Complex Clustering Problem Statement under time pressure with your team.",
    icon: <FaLaptopCode />,
    image: "/about/event/hackathon.png",
    route: "/events/webathon",
    gradient: "from-cyan-500/20 to-blue-500/20",
    stats: [
      { value: "20+", label: "Participants" },
      { value: "₹3.5K", label: "Prize Pool" },
      { value: "4h+", label: "Duration" }
    ]
  },
  {
    title: "BGMI E-Sports",
    description:
      "Battle it out in intense BGMI matches showcasing strategy, teamwork, and survival skills.",
    icon: <FaGamepad />,
    image: "/about/event/bgmi.png",
    route: "/events/bgmi",
    gradient: "from-green-500/20 to-emerald-500/20",
    stats: [
      { value: "20+", label: "Teams" },
      { value: "₹5K", label: "Prize Pool" },
      { value: "3h+", label: "Duration" }
    ]
  },
  {
    title: "Valorant E-Sports",
    description:
      "Battle it out in intense 5v5 Valorant matches showcasing powers, teamwork, and elimination skills.",
   icon: <FaCrosshairs />,
   image: "/about/event/valorant.png",
  route: "/events/valorant",
  gradient: "from-red-500/20 to-pink-500/20",
  stats: [
    { value: "12+", label: "Teams" },
    { value: "₹5K", label: "Prize Pool" },
    { value: "3h+", label: "Duration" }
  ]
  },
];

// Optimized Particle Component
const OptimizedParticles = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const particleCount = isMobile ? 8 : 15;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${
            i % 2 === 0 ? 'bg-cyan-400/30' : 'bg-purple-400/30'
          }`}
          style={{
            left: `${20 + i * 25}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const Events = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.1,
    margin: "-100px 0px"
  });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] // Cubic ease for smooth motion
      }
    }
  };

  return (
    <section
      id="events"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-lightbg dark:bg-darkbg transition-colors duration-500"
      style={{ scrollMarginTop: '80px' }}
    >
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Reduced background effects for mobile */}
        <div className={`absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 
                      rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 
                      ${!isMobile ? 'animate-volumetric-flow-x' : ''} blur-lg sm:blur-xl md:blur-2xl`} />
        
        <div className={`absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 
                      rounded-full bg-gradient-to-r from-blue-500/10 to-pink-500/10 
                      ${!isMobile ? 'animate-volumetric-flow-y' : ''} blur-lg sm:blur-xl md:blur-2xl`} />
      </div>

      {/* Optimized Particle Effects */}
      <OptimizedParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Optimized Heading */}
          <motion.div
            variants={itemVariants}
            className="inline-block"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-200">
              TechVerse Vista{" "}
              <span className="text-primary">
                Events
              </span>
            </h2>
            <div className="h-0.5 w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4 sm:mt-6 max-w-2xl mx-auto"
          >
            Dive into immersive experiences where technology meets entertainment. 
            Each event is a journey through innovation and excitement.
          </motion.p>
        </motion.div>

        {/* Cards Grid with Optimized Animations */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {events.map((event, index) => (
            <OptimizedEventCard
              key={index}
              index={index}
              {...event}
              isMobile={isMobile}
              onClick={() => navigate(event.route)}
            />
          ))}
        </motion.div>
      </div>

      {/* Simplified Light Beam - only on desktop */}
      {!isMobile && (
        <div className="absolute top-0 left-0 w-full h-0.5 
                       bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent 
                       animate-light-beam-volumetric opacity-30" />
      )}
    </section>
  );
};

// Optimized EventCard Component
const OptimizedEventCard = ({ 
  title, 
  description, 
  icon, 
  image, 
  gradient, 
  onClick, 
  index, 
  stats,
  isMobile 
}) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "-50px 0px"
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const hoverVariants = {
    rest: {
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      y: isMobile ? -3 : -8,
      scale: isMobile ? 1.01 : 1.03,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      
      className="relative group cursor-pointer"
      onClick={onClick}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Card Container */}
      <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        {/* Image */}
        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          
          {/* Icon */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl sm:text-3xl text-white/90">
            {icon}
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {title}
            </h3>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-6">
          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            {stats.map((stat, statIndex) => (
              <div key={statIndex} className="text-center">
                <div className="text-lg sm:text-xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="inline-flex items-center text-primary font-medium group/cta">
            <span className="relative">
               View Details
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover/cta:w-full transition-all duration-300" />
            </span>
            <div className="ml-2 transition-transform duration-300 group-hover/cta:translate-x-1">
              →
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Glow Effect on Hover */}
      <div className={`absolute -inset-0.5 ${gradient} rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
    </motion.div>
  );
};

export default Events;