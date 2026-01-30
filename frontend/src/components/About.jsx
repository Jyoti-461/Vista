import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import VerticalImageScroll from "./VerticalImageScroll";

const eventImages = Array.from({ length: 9 }, (_, i) =>
  `/about/event/${i + 1}.jpg`
);

const collegeImages = Array.from({ length: 9 }, (_, i) =>
  `/about/college/${i + 1}.jpg`
);

// Floating Symbol Component
const FloatingSymbol = ({ symbol, delay, size = 40 }) => {
  return (
    <motion.div
      className="absolute text-gray-400/10 dark:text-gray-500/10 pointer-events-none"
      style={{ fontSize: `${size}px` }}
      initial={{ 
        opacity: 0,
        y: 100,
        rotate: -45
      }}
      animate={{ 
        opacity: [0.1, 0.2, 0.1],
        y: [100, -100, 100],
        rotate: [-45, 45, -45],
        x: ["-50%", "50%", "-50%"]
      }}
      transition={{
        duration: 30 + Math.random() * 20,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {symbol}
    </motion.div>
  );
};

// Binary Code Rain Component
const BinaryRain = () => {
  const symbols = ["{", "}", "<", ">", "/", "=", "#", "@", "*", "&", "|", "~"];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingSymbol
          key={i}
          symbol={symbols[i % symbols.length]}
          delay={i * 2}
          size={20 + Math.random() * 40}
        />
      ))}
    </div>
  );
};

// Circuit Lines Background
const CircuitBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0,0 L100,100 M100,0 L0,100" 
                  stroke="rgba(99, 102, 241, 0.3)" 
                  strokeWidth="0.5" 
                  fill="none"/>
            <circle cx="50" cy="50" r="2" fill="rgba(34, 211, 238, 0.2)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
};

// Interactive Particle Canvas
const InteractiveParticles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let particles = [];
    let mouse = { x: width / 2, y: height / 2 };
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? 
          'rgba(34, 211, 238, 0.3)' : 
          'rgba(168, 85, 247, 0.3)';
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
        
        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections
        particles.forEach(p2 => {
          const dx = p2.x - this.x;
          const dy = p2.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      }
    }
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    // Handle resize
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initParticles();
    };
    
    // Handle mouse move
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Initialize and start
    initParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
    />
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 px-6 overflow-hidden"     //reduce height
    >
      {/* Main Background Gradients */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 
                       dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full 
                      bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                      dark:from-cyan-500/5 dark:to-blue-500/5 
                      animate-volumetric-flow-x blur-3xl" />
        
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full 
                      bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                      dark:from-purple-500/5 dark:to-pink-500/5 
                      animate-volumetric-flow-y blur-3xl" />
        
        {/* Swirling Central Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[800px] h-[800px] rounded-full 
                      bg-gradient-to-r from-primary/10 via-transparent to-indigo-500/10 
                      dark:from-primary/5 dark:via-transparent dark:to-indigo-500/5 
                      animate-volumetric-swarm blur-3xl" />
      </div>
      
      {/* Circuit Pattern */}
      <CircuitBackground />
      
      {/* Interactive Particle Network */}
      <InteractiveParticles />
      
      {/* Floating Code Symbols */}
      <BinaryRain />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #888 1px, transparent 1px),
              linear-gradient(to bottom, #888 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />
      </div>
      
      

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">  {/*reduce gap*/}
        {/* ===== ABOUT COLLEGE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Section Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 
                        border border-white/20 dark:border-gray-700/50 shadow-2xl">
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full 
                              bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full 
                              bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />
                
               
                
                <h2 className="text-4xl md:text-5xl font-bold mb-8 
                             text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600
                             dark:from-cyan-400 dark:to-blue-500">
                  About <span className="volumetric-text">TIMSCDR</span>
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Thakur Institute of Management Studies, Career Development & Research (TIMSCDR)
                    </span> is an autonomous institute renowned for academic excellence and innovation-driven learning.
                  </p>
                  
                  <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                                dark:from-cyan-500/5 dark:to-blue-500/5 rounded-xl border border-cyan-500/20">
                    <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                      As an autonomous and linguistic minority institute, TIMSCDR proudly presents 
                      <strong className="text-gray-800 dark:text-gray-200"> Tech-Verse-Vista 2026</strong> — 
                      a dynamic fusion of technical brilliance, cultural expression, and sporting enthusiasm.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                {/* Floating Frame Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                              rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500" />
                
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 
                                group-hover:opacity-70 transition duration-500" />
                  
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl 
                                border border-gray-700/50 transform transition-transform duration-300 
                                group-hover:scale-[1.02]">
                    <VerticalImageScroll 
                      images={collegeImages} 
                      speed={60} 
                    />
                  </div>
                  
                  {/* Image Label */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full 
                                  border border-white/20">
                      <p className="text-sm text-white font-medium">
                        Campus Gallery 📸
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ===== ABOUT EVENT ===== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Section Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 
                        border border-white/20 dark:border-gray-700/50 shadow-2xl">
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative order-2 md:order-1"
              >
                {/* Floating Frame Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                              rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500" />
                
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 
                                group-hover:opacity-70 transition duration-500" />
                  
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl 
                                border border-gray-700/50 transform transition-transform duration-300 
                                group-hover:scale-[1.02]">
                    <VerticalImageScroll 
                      images={eventImages} 
                      speed={60} 
                    />
                  </div>
                  
                  {/* Image Label */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full 
                                  border border-white/20">
                      <p className="text-sm text-white font-medium">
                        Event Memories 🎉
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative order-1 md:order-2"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full 
                              bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full 
                              bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20" />
                
                
                
                <h2 className="text-4xl md:text-5xl font-bold mb-8 
                             text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600
                             dark:from-purple-400 dark:to-pink-500">
                  About <span className="volumetric-text">TechVerse Vista</span>
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                                dark:from-purple-500/5 dark:to-pink-500/5 rounded-xl border border-purple-500/20">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      We are proudly celebrating the{" "}
                      <strong className="text-purple-600 dark:text-purple-400">26th edition</strong> of our Technical Fest,
                      continuing a legacy of excellence spanning over{" "}
                      <strong className="text-purple-600 dark:text-purple-400">20 years</strong>.
                    </p>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong className="text-gray-800 dark:text-gray-200">
                      TechVerse Vista 2026
                    </strong> is TIMSCDR's flagship techno-cultural festival, bringing together innovation, creativity, and collaboration. 
                    Established in <strong className="text-gray-800 dark:text-gray-200">2006</strong>, the TIMSCDR Technical Fest has been a cornerstone of technological innovation.
                  </p>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 
                                dark:from-gray-800 dark:to-gray-900 rounded-xl">
                    <p className="text-gray-600 dark:text-gray-400 italic text-center">
                      <span className="text-primary dark:text-primary font-semibold">Tech</span> +{" "}
                      <span className="text-purple-500 dark:text-purple-400 font-semibold">Verse</span> +{" "}
                      <span className="text-cyan-500 dark:text-cyan-400 font-semibold">Vista</span> represents 
                      technology, a universe of ideas, and a forward-looking vision that shapes tomorrow.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
};

export default About;