import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedCounter from "../components/AnimatedCounter";

const statsData = [
  { 
    label: "Participants", 
    value: 1500,
    gradient: "from-cyan-500/20 to-blue-500/20",
    icon: "👥",
    description: "Active developers & gamers"
  },
  { 
    label: "Colleges", 
    value: 50,
    gradient: "from-emerald-500/20 to-teal-500/20",
    icon: "🏫",
    description: "Participating institutions"
  },
  { 
    label: "Events", 
    value: 15,
    gradient: "from-violet-500/20 to-purple-500/20",
    icon: "🎪",
    description: "Competitions & workshops"
  },
  { 
    label: "Audience", 
    value: 3000,
    gradient: "from-rose-500/20 to-pink-500/20",
    icon: "👁️",
    description: "Live stream viewers"
  },
];

// Optimized Particle Network Component
const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const resizeTimeoutRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize particles
    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 12 : 20;
      
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.2, // Reduced speed
        vy: (Math.random() - 0.5) * 0.2,
        radius: 1 + Math.random(), // Smaller particles
        color: i % 3 === 0 ? 'rgba(34, 211, 238, 0.3)' : 
                i % 3 === 1 ? 'rgba(168, 85, 247, 0.3)' : 
                'rgba(99, 102, 241, 0.3)'
      }));
    };
    
    initParticles();
    
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    
    // Optimized resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime) => {
      animationRef.current = requestAnimationFrame(animate);
      
      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);
      
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Update and draw particles
      particlesRef.current.forEach(p => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around edges
        if (p.x < 0) p.x = 100;
        if (p.x > 100) p.x = 0;
        if (p.y < 0) p.y = 100;
        if (p.y > 100) p.y = 0;
        
        const x = (p.x / 100) * width;
        const y = (p.y / 100) * height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      // Only draw connections on desktop
      if (window.innerWidth >= 768) {
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            
            const x1 = (p1.x / 100) * width;
            const y1 = (p1.y / 100) * height;
            const x2 = (p2.x / 100) * width;
            const y2 = (p2.y / 100) * height;
            
            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
              const opacity = 1 - (distance / 80) * 0.1;
              
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          }
        }
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-10 sm:opacity-20"
    />
  );
};

const Stats = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.1,
    margin: "-100px 0px"
  });
  
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
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] // Cubic ease
      }
    }
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-purple-900/30" />
      
      {/* Particle Network */}
      <ParticleNetwork />
      
      {/* Animated Orbs - Reduced opacity */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 animate-volumetric-flow-x blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-volumetric-flow-y blur-xl" />
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-block relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-100">
              TechVerse Vista{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Impact
              </span>
            </h2>
            
            {/* Underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-0.5 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
            />
          </div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-300 mt-4 sm:mt-6 max-w-2xl mx-auto px-2 sm:px-4"
          >
            Numbers that tell our story of innovation, community, and excellence in tech entertainment.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {statsData.map((stat, index) => (
            <StatCard 
              key={index} 
              index={index}
              {...stat} 
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// StatCard Component
const StatCard = ({ label, value, gradient, icon, description, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
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
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="relative group"
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)' 
      }}
    >
      {/* Card Glow Effect */}
      <div className={`absolute -inset-0.5 ${gradient} rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
      
      {/* Glass Card */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6 overflow-hidden">
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">
            {icon}
          </div>

          {/* Counter Value */}
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-gray-100">
            <div className="flex items-end">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                <AnimatedCounter value={value} duration={1.5} />
              </div>
              <span className="text-cyan-400 text-xl sm:text-2xl ml-1">+</span>
            </div>
          </div>

          {/* Label */}
          <h3 className="text-base sm:text-lg font-semibold mb-1 text-gray-100">
            {label}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
            {description}
          </p>

          {/* Progress Bar */}
          <div className={`h-0.5 rounded-full ${gradient} overflow-hidden`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                delay: index * 0.1 + 0.3, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              className="h-full bg-gradient-to-r from-current to-current"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;