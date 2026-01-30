import { FaInstagram, FaLinkedin, FaMapMarkerAlt, FaArrowUp, FaHeart } from "react-icons/fa";
import { useEffect, useRef } from "react";

// Efficient Particle Network Component
const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: 20 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.5 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(168, 85, 247, 0.4)'
      }));
    };

    const resizeCanvas = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update particles
      particlesRef.current.forEach(p => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // Keep within bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Draw connections
        particlesRef.current.forEach(p2 => {
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    
    // Initialize and start animation
    initParticles();
    animate();
    
    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    />
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-800 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-t border-gray-800/50 dark:border-gray-700/30 py-14 px-6 transition-all duration-500">

      {/* Particle Network Background */}
      <ParticleNetwork />
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-purple-900/5" />
      
      {/* Grain Texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
      
      {/* Animated Orbs */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 animate-volumetric-flow-x blur-3xl" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-volumetric-flow-y blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT: Address with Enhanced Styling */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <FaMapMarkerAlt className="text-2xl text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Event Venue
                </h3>
              </div>

              <div className="bg-gray-800/30 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <p className="text-xl font-semibold text-gray-100 mb-3 leading-tight">
                  Thakur Institute of Management Studies, Career Development & Research
                </p>

                <div className="space-y-2">
                  <p className="text-gray-300 leading-relaxed flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                    Gate No. 4, Thakur Educational Campus
                  </p>
                  <p className="text-gray-300 leading-relaxed flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                    Thakur MCA, Thakur Road, Thakur Village
                  </p>
                  <p className="text-gray-300 leading-relaxed flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                    Kandivali East, Mumbai, Maharashtra – 400101
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Google Map with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            
            <div className="relative overflow-hidden rounded-xl border border-gray-700/50 group hover:border-cyan-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative z-10 w-full h-[280px] rounded-xl overflow-hidden">
                <iframe
                  title="TIMSCDR Location"
                  src="https://www.google.com/maps?q=TIMSCDR%20Thakur%20Institute%20of%20Management%20Studies&output=embed"
                  className="w-full h-full border-0 scale-100 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-gray-800/50 dark:border-gray-700/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">
              Made with 
            </p>
            <FaHeart className="text-red-400 animate-pulse" />
            <p className="text-sm text-gray-400">
              by {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold">
                Vista &nbsp;
              </span>
              Technical Team.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/timscdr.official?igsh=Nnliengyc2ZtcGgw"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
            </a>

            <a
              href="https://in.linkedin.com/school/thakurinstituteofmanagementstudiescareerdevelopmentandresearch/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
            </a>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500">
           © 2026 TechVerse Vista — Where innovation meets celebration
          </p>
        </motion.div>
      </div>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full
        bg-gradient-to-br from-cyan-500 to-purple-600 text-white
        shadow-lg hover:shadow-xl hover:shadow-purple-500/20
        hover:scale-110 active:scale-95 transition-all duration-300
        border border-cyan-400/30 group"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </footer>
  );
};

// Add missing motion import
import { motion } from "framer-motion";

export default Footer;