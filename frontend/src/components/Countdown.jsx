import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Countdown = () => {
  const eventDate = new Date("2026-02-09T09:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isInView, setIsInView] = useState(false);
  const [eventEnded, setEventEnded] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
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

  const calculateTimeLeft = () => {
    const now = Date.now();
    const diff = eventDate - now;
    
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: true,
      };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      ended: false,
    };
  };

  // Main countdown effect
  useEffect(() => {
    const initial = calculateTimeLeft();
    setTimeLeft({
      days: initial.days,
      hours: initial.hours,
      minutes: initial.minutes,
      seconds: initial.seconds,
    });

    // Check on mount if event already ended
    if (initial.ended) {
      setEventEnded(true);
      setShowFireworks(true);
      return;
    }

    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setPrevTime(prev => ({
        days: timeLeft.days,
        hours: timeLeft.hours,
        minutes: timeLeft.minutes,
        seconds: timeLeft.seconds,
      }));
      
      setTimeLeft({
        days: updated.days,
        hours: updated.hours,
        minutes: updated.minutes,
        seconds: updated.seconds,
      });

      // Trigger when countdown reaches exactly 0
      if (updated.ended) {
        setEventEnded(true);
        setShowFireworks(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Remove timeLeft from dependencies to avoid infinite loop

  // Intersection Observer
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
    <div ref={containerRef} className="relative overflow-hidden py-4">
            
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
      <section className="relative z-10 py-8 text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Event{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {eventEnded ? "Is Live" : "Starts In"}
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-300"
          >
            February 9th-10th, 2026 • TIMSCDR Mumbai
          </motion.p>
          
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
        </motion.div>

        {/* Live Event Banner */}
        <AnimatePresence>
          {eventEnded && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8 flex justify-center"
            >
              <div className="relative bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/30 rounded-2xl px-8 py-4 backdrop-blur-md shadow-2xl shadow-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse" />
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                      LIVE NOW
                    </span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-lg text-gray-300">Join the event and participate!</span>
                </div>
                {/* Animated glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Countdown Cards - Always Visible */}
        <div className="relative">
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap relative z-20">
            <AnimatedTimeBox 
              label="Days" 
              value={timeLeft.days}
              previousValue={prevTime.days}
              index={0}
              isEventEnded={eventEnded}
            />
            <AnimatedTimeBox 
              label="Hours" 
              value={timeLeft.hours}
              previousValue={prevTime.hours}
              index={1}
              isEventEnded={eventEnded}
            />
            <AnimatedTimeBox 
              label="Minutes" 
              value={timeLeft.minutes}
              previousValue={prevTime.minutes}
              index={2}
              isEventEnded={eventEnded}
            />
            <AnimatedTimeBox 
              label="Seconds" 
              value={timeLeft.seconds}
              previousValue={prevTime.seconds}
              index={3}
              isEventEnded={eventEnded}
            />
          </div>
          
          {/* Bloom particles on seconds change - only when event hasn't ended */}
          <AnimatePresence>
            {!eventEnded && timeLeft.seconds !== prevTime.seconds && (
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
              <span className="font-semibold text-cyan-400">
                {eventEnded ? "Event in progress!" : "Mark your calendar:"}
              </span> 9th - 10th February
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const AnimatedTimeBox = ({ label, value, previousValue, index, isEventEnded }) => {
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (!isEventEnded && value !== previousValue) {
      setIsChanging(true);
      const timer = setTimeout(() => setIsChanging(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue, isEventEnded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1 + 0.3
      }}
      whileHover={{ 
        scale: isEventEnded ? 1 : 1.05,
        y: isEventEnded ? 0 : -5,
        transition: { duration: 0.2 }
      }}
      className="relative"
    >
      {/* Glow effect */}
      {isChanging && !isEventEnded && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 via-purple-400/40 to-pink-400/40 blur-lg rounded-2xl"
        />
      )}

      {/* Special glow when event has ended */}
      {isEventEnded && (
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-green-400/20 to-cyan-400/20 blur-lg rounded-2xl"
        />
      )}
      
      {/* Main card */}
      <div className={`
        relative
        bg-gradient-to-br ${isEventEnded 
          ? 'from-emerald-900/30 via-green-900/30 to-cyan-900/30 border-emerald-500/30' 
          : 'from-gray-900/80 to-gray-800/80 border-gray-700/50'
        }
        backdrop-blur-md
        border
        rounded-2xl
        px-6 py-5
        min-w-[100px]
        shadow-xl
        group
        transition-all duration-300
        ${isEventEnded ? 'shadow-emerald-500/10' : ''}
      `}>
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
              className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text ${
                isEventEnded 
                  ? 'bg-gradient-to-b from-emerald-400 via-green-300 to-cyan-400' 
                  : 'bg-gradient-to-b from-cyan-400 via-white to-purple-400'
              }`}
            >
              {value.toString().padStart(2, "0")}
            </motion.p>
          </AnimatePresence>
        </div>
        
        {/* Label */}
        <motion.p
          animate={isChanging && !isEventEnded ? {
            color: "#22d3ee",
          } : {}}
          transition={{ duration: 0.2 }}
          className={`text-sm transition-colors duration-300 mt-2 uppercase tracking-wider ${
            isEventEnded 
              ? 'text-emerald-300 group-hover:text-emerald-200' 
              : 'text-gray-400 group-hover:text-cyan-300'
          }`}
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Countdown;