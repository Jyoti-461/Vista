import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Custom hook for responsive padding
const useResponsivePadding = () => {
  const [topPadding, setTopPadding] = useState(80); // Default in pixels
  
  // Adjust padding based on screen size
  useEffect(() => {
    const updatePadding = () => {
      if (window.innerWidth < 640) {
        setTopPadding(60); // Mobile
      } else if (window.innerWidth < 1024) {
        setTopPadding(80); // Tablet
      } else {
        setTopPadding(100); // Desktop
      }
    };
    
    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);
  
  return topPadding;
};

// Highlight control component (for development/debugging)
const HighlightControls = ({ 
  onIncrease, 
  onDecrease, 
  isVisible = false,
  paddingValue 
}) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-2xl"
    >
      <div className="text-white text-sm mb-2 font-medium">Padding Controls</div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 border border-red-500/30"
        >
          -
        </button>
        <div className="text-white text-sm min-w-[60px] text-center">
          {paddingValue}px
        </div>
        <button
          onClick={onIncrease}
          className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-300 border border-green-500/30"
        >
          +
        </button>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [topPadding, setTopPadding] = useState(80); // Default top padding in pixels
  const [showControls, setShowControls] = useState(false); // Toggle for controls
  const responsivePadding = useResponsivePadding();
  
  // Use responsive padding by default, but allow manual override
  useEffect(() => {
    setTopPadding(responsivePadding);
  }, [responsivePadding]);

  useEffect(() => {
    // Stop the main collision animation after 3 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToRegister = () => {
    const section = document.getElementById("register");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const increasePadding = () => {
    setTopPadding(prev => Math.min(prev + 10, 200)); // Max 200px
  };

  const decreasePadding = () => {
    setTopPadding(prev => Math.max(prev - 10, 20)); // Min 20px
  };

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      style={{ paddingTop: `${topPadding}px` }}
    >
      {/* Highlight Controls */}
      <HighlightControls
        onIncrease={increasePadding}
        onDecrease={decreasePadding}
        isVisible={showControls}
        paddingValue={topPadding}
      />
      
      {/* Highlight indicator */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 z-40"
        />
      )}

      {/* VOLCANO GRADIENT BACKGROUND EFFECT */}
      <div className="absolute inset-0 z-0">
        {/* Left Gradient Moving Right */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ 
            x: isAnimating ? "50%" : "40%",
            scale: isAnimating ? 1.2 : 1
          }}
          transition={{
            duration: isAnimating ? 2 : 0.5,
            ease: isAnimating ? "easeOut" : "easeInOut"
          }}
          className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-purple-600/30 via-violet-500/40 to-transparent blur-3xl"
        />
        
        {/* Right Gradient Moving Left */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ 
            x: isAnimating ? "-50%" : "-40%",
            scale: isAnimating ? 1.2 : 1
          }}
          transition={{
            duration: isAnimating ? 2 : 0.5,
            ease: isAnimating ? "easeOut" : "easeInOut"
          }}
          className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-600/30 via-indigo-500/40 to-transparent blur-3xl"
        />
        
        {/* Collision Point & Upward Spread */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isAnimating ? 1 : 0.8,
            opacity: isAnimating ? 0.6 : 0.3
          }}
          transition={{
            delay: isAnimating ? 1.8 : 0,
            duration: isAnimating ? 1.2 : 0.8,
            ease: "easeOut"
          }}
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-indigo-600/50 via-purple-500/40 to-transparent rounded-full blur-2xl"
        />
        
        {/* Upward Spread Particles/Effect */}
        {isAnimating && (
          <>
            {/* Main upward spread */}
            <motion.div
              initial={{ y: 0, height: 0 }}
              animate={{ y: "-100vh", height: "100vh" }}
              transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-64 bg-gradient-to-t from-indigo-600/30 via-transparent to-transparent"
            />
            
            {/* Particle sparks */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 0 
                }}
                animate={{ 
                  x: Math.sin(i) * 100,
                  y: -300 - (i * 40),
                  scale: 1,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: 2 + (i * 0.1),
                  ease: "easeOut"
                }}
                className={`absolute left-1/2 bottom-0 w-4 h-4 rounded-full ${
                  i % 2 === 0 ? 'bg-indigo-400/60' : 'bg-purple-400/60'
                } blur-sm`}
              />
            ))}
          </>
        )}
        
        {/* Subtle background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-indigo-400/40' : 
                i % 3 === 1 ? 'bg-purple-400/40' : 'bg-blue-400/40'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/20 dark:to-gray-900/40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-gray-900/10 dark:to-gray-900/20"></div>
        </div>
      </div>

      {/* HERO CONTENT */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="
          relative z-10
          flex flex-col items-center justify-center
          text-center px-4
          min-h-[calc(100vh-80px)]
          text-gray-900 dark:text-gray-200
        "
        style={{ 
          minHeight: `calc(100vh - ${topPadding}px)`,
          paddingTop: `${topPadding > 80 ? topPadding - 20 : 0}px`
        }}
      >
        {/* Animated Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="max-w-6xl"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-6"
          >
            <span className="text-white drop-shadow-[0_2px_10px_rgba(99,102,241,0.8)]">
              TechVerse
            </span>{" "}
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(99,102,241,0.7)",
                  "0 0 20px rgba(99,102,241,0.9)",
                  "0 0 10px rgba(99,102,241,0.7)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary"
            >
              Vista
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              2026
            </motion.span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.4 }}
            className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto text-gray-300 dark:text-gray-300 px-2 sm:px-4"
          >
            TIMSCDR Mumbai's{" "}
            <span className="text-primary font-semibold">flagship Tech Fest</span>
            <br />
            Where innovation, creativity, and competition ignite!
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, delay: 3.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 sm:mt-8 rounded-full"
          />

          {/* Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 4 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            {/* Register Button */}
            <motion.a
              href="https://forms.gle/roQx1zrMLPbZpYzVA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="
                relative
                px-6 sm:px-8 py-3 sm:py-4
                bg-gradient-to-r from-indigo-600 to-purple-600
                text-white text-base sm:text-lg font-semibold
                rounded-xl
                shadow-2xl
                overflow-hidden
                cursor-pointer
                group
                w-full sm:w-auto
              "
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-lg sm:text-xl"
                >
                  ✨
                </motion.span>
                Register Now
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  className="text-lg sm:text-xl"
                >
                  🚀
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            {/* Brochure Button */}
            <motion.button
  onClick={() => {
    const pdfUrl = "/TechVerseVista2026_Brochure.pdf";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile: Just open - let browser handle it
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } else {
      // On desktop: Open in new tab AND offer download
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
      
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "TechVerseVista2026_Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }}
  whileHover={{ 
    scale: 1.05,
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)"
  }}
  whileTap={{ scale: 0.95 }}
  className="
    px-6 sm:px-8 py-3 sm:py-4
    rounded-xl font-semibold text-base sm:text-lg
    border-2 border-primary/50
    text-primary
    bg-white/10 dark:bg-gray-900/50
    backdrop-blur-sm
    hover:bg-primary/10
    transition-all
    group
    w-full sm:w-auto
  "
>
  <span className="flex items-center justify-center gap-2">
    <motion.span
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      📄
    </motion.span>
    Download Brochure
  </span>
</motion.button>
          </motion.div>

          {/* Countdown or Date Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4.5 }}
            className="mt-8 sm:mt-10 p-4 sm:p-6 bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 max-w-md mx-auto"
          >
            <p className="text-base sm:text-lg text-gray-300">
              <span className="text-primary font-bold">9th - 10th</span> • February 2026
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Get ready for the biggest tech extravaganza of the year!
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8 sm:mt-12"
          >
            <div className="text-gray-400 text-xs sm:text-sm mb-2">Explore More</div>
            <div className="w-6 h-10 border-2 border-gray-400/50 rounded-full mx-auto">
              <div className="w-1 h-3 bg-primary rounded-full mx-auto mt-2 animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Padding Info (for debugging) */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm"
        >
          Current top padding: {topPadding}px
        </motion.div>
      )}
    </div>
  );
};

export default Hero;