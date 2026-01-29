import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Countdown = () => {
  const eventDate = new Date("2026-02-09T09:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  const [isInView, setIsInView] = useState(false);
  const [prevTime, setPrevTime] = useState({ ...timeLeft });
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => {
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
      };
    });
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setPrevTime(prev => ({ ...prev }));
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden py-4"> {/* Adjust py-16 for vertical padding */}
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-900/20" />
      
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse blur-3xl" style={{ animationDelay: '1s' }} />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            className="absolute rounded-full bg-cyan-400/30"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <section className="relative z-10 py-8 text-center"> {/* Adjust py-12 for content padding */}
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Starts In</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-300"
          >
            February 9-10, 2026 • TIMSCDR Mumbai
          </motion.p>
          
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
        </motion.div>

        {/* Countdown */}
        <div className="relative">
          {/* Countdown Cards */}
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap relative z-20">
            <AnimatedTimeBox 
              label="Days" 
              value={timeLeft.days}
              previousValue={prevTime.days}
              index={0}
            />
            <AnimatedTimeBox 
              label="Hours" 
              value={timeLeft.hours}
              previousValue={prevTime.hours}
              index={1}
            />
            <AnimatedTimeBox 
              label="Minutes" 
              value={timeLeft.minutes}
              previousValue={prevTime.minutes}
              index={2}
            />
            <AnimatedTimeBox 
              label="Seconds" 
              value={timeLeft.seconds}
              previousValue={prevTime.seconds}
              index={3}
            />
          </div>
          
          {/* Bloom particles on seconds change */}
          <AnimatePresence>
            {timeLeft.seconds !== prevTime.seconds && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: "50%",
                      y: "50%",
                      opacity: 1,
                      scale: 0,
                    }}
                    animate={{ 
                      x: `calc(50% + ${Math.cos(i * 45) * 100}px)`,
                      y: `calc(50% + ${Math.sin(i * 45) * 100}px)`,
                      opacity: 0,
                      scale: 1.5,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    className={`absolute w-2 h-2 rounded-full ${
                      i % 3 === 0 ? 'bg-cyan-400' : 
                      i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
                    } blur-sm`}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Event Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <p className="text-gray-300">
              <span className="font-semibold text-cyan-400">Mark your calendar:</span> February 9-10, 2026
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const AnimatedTimeBox = ({ label, value, previousValue, index }) => {
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (value !== previousValue) {
      setIsChanging(true);
      const timer = setTimeout(() => setIsChanging(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1 + 0.3
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="relative"
    >
      {/* Glow effect */}
      {isChanging && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 via-purple-400/40 to-pink-400/40 blur-lg rounded-2xl"
        />
      )}
      
      {/* Main card */}
      <div className="
        relative
        bg-gradient-to-br from-gray-900/80 to-gray-800/80
        backdrop-blur-md
        border border-gray-700/50
        rounded-2xl
        px-6 py-5
        min-w-[100px]
        shadow-xl
        group
      ">
        {/* Number */}
        <div className="relative h-50 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={value}
              initial={{ 
                opacity: 0,
                y: 10,
                scale: 0.9
              }}
              animate={{ 
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0,
                y: -10,
                scale: 0.9
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 via-white to-purple-400"
            >
              {value.toString().padStart(2, "0")}
            </motion.p>
          </AnimatePresence>
        </div>
        
        {/* Label */}
        <motion.p
          animate={isChanging ? {
            color: "#22d3ee",
          } : {}}
          transition={{ duration: 0.2 }}
          className="text-sm text-gray-400 group-hover:text-cyan-300 transition-colors duration-300 mt-2 uppercase tracking-wider"
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Countdown;