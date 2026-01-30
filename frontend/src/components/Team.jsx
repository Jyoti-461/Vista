import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Team data structure
const teamData = [
  // Core Committee
  { id: 1, name: "Anuj Yadav - 9819207484", council: "Core", image: 1 },
  { id: 2, name: "Raj Shirke - 8104966957", council: "Core", image: 2 },
  { id: 3, name: "Shruti Shinde - 9324233506", council: "Core", image: 3 },
  { id: 4, name: "Pratiksha Shetty - 8591026988", council: "Core", image: 4 },
  { id: 5, name: "Daneshh Rana - 9619794369", council: "Core", image: 5 },
  { id: 6, name: "Jyoti Jayant", council: "Technical", image: 15 },
  { id: 7, name: "Manish Jha", council: "Technical", image: 11 },
  { id: 9, name: "Samika Yadav", council: "Technical", image: 10 },  
  { id: 10, name: "John Sanchis", council: "Technical", image: 7 },
  { id: 8, name: "Atish Ghanekar", council: "Technical", image: 6 },
  { id: 11, name: "Omkar Surve", council: "Digital", image: 8 },
  { id: 12, name: "Omkar Manwacharya", council: "Digital", image: 12 },
];

// Filter options
const councilFilters = [
  "All",
  "Core Committee",
  "Technical Team",
  "Digital Team"
];

// Council mapping
const councilCategories = {
  "Core": "Core Committee",
  "Technical": "Technical Team",
  "Digital": "Digital Team",
};

const TeamMembers = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredTeam, setFilteredTeam] = useState(teamData);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.05,
    margin: "-50px 0px"
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredTeam(teamData);
    } else {
      const filtered = teamData.filter(member => 
        councilCategories[member.council] === activeFilter
      );
      setFilteredTeam(filtered);
    }
  }, [activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section
      id="Organisers"
      className="relative py-8 sm:py-12 md:py-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-500"
      style={{ 
        scrollMarginTop: '80px',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-500/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8 md:mb-12 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <div className="h-1 w-20 sm:w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto px-2">
            The passionate individuals behind TechVerse Vista 2026
          </p>
        </motion.div>

        {/* Filter Buttons - Horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 sm:mb-8 md:mb-12"
        >
          <div className="flex overflow-x-auto pb-2 -mx-3 px-3 sm:overflow-visible sm:justify-center sm:flex-wrap gap-2 sm:gap-3">
            {councilFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Team Grid - Responsive layout */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className={`
            grid grid-cols-2 
            ${isTablet ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            gap-3 sm:gap-4 md:gap-6
            px-2 sm:px-0
          `}
        >
          {filteredTeam.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredTeam.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg">
              No team members found for this category.
            </p>
          </motion.div>
        )}

        
      </div>
    </section>
  );
};

const TeamCard = ({ member, index, isMobile, isTablet }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "-30px 0px"
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Split name and phone for Core members (ids 1-5)
  const isCoreMember = member.council === "Core";
  let displayName = member.name;
  let phoneNumber = null;

  if (isCoreMember) {
    // Split by " - " to separate name and phone
    const parts = member.name.split(" - ");
    if (parts.length === 2) {
      displayName = parts[0];
      phoneNumber = parts[1];
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const hoverVariants = {
    rest: {
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    hover: {
      y: isMobile ? -2 : -4,
      scale: isMobile ? 1.02 : 1.04,
      transition: {
        duration: 0.2,
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
      
      className="group relative"
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      {/* Card */}
      <div className="relative bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Loading Skeleton */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
          
          {/* Actual Image */}
          <img
            src={`/images/${member.image}.jpeg`}
            alt={displayName}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onLoad={(e) => {
              e.target.style.opacity = 1;
            }}
            style={{ 
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Council Badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${
              councilCategories[member.council] === "Core Committee"
                ? "bg-primary/20 text-primary border border-primary/20"
                : councilCategories[member.council] === "Technical Team"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                : "bg-purple-500/20 text-purple-400 border border-purple-500/20"
            }`}>
              {councilCategories[member.council].split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {/* Name - always shown */}
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 mb-1 truncate">
            {displayName}
          </h3>
          
          {/* Phone number - only for Core members */}
          {isCoreMember && phoneNumber && (
            <p className="text-xs text-primary font-medium mb-1">
              {phoneNumber}
            </p>
          )}
          
          {/* Council Team */}
          <p className="text-xs sm:text-sm text-cyan-500 dark:text-cyan-400"
>
            {member.council} Team
          </p>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Glow Effect - only on desktop */}
      {!isMobile && (
        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
      )}
    </motion.div>
  );
};

export default TeamMembers;