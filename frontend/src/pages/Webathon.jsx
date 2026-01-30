import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Webathon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <section className="min-h-screen text-gray-200 px-6 py-24 relative overflow-hidden">
      
      {/* ===== MODERN AI/ML HACKATHON BACKGROUND ===== */}
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black z-0" />
      
      {/* Circuit Board Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.2) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 2px, transparent 2px),
            linear-gradient(90deg, transparent 49%, rgba(99, 102, 241, 0.1) 50%, transparent 51%),
            linear-gradient(transparent 49%, rgba(99, 102, 241, 0.1) 50%, transparent 51%)
          `,
          backgroundSize: '60px 60px, 60px 60px, 30px 30px, 30px 30px',
        }}
      />
      
      {/* Animated Binary Code Overlay (Optimized for mobile) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xs sm:text-sm text-primary/10 font-mono whitespace-nowrap"
            style={{
              top: `${(i * 12.5)}%`,
              animation: `scrollBinary ${15 + i * 2}s linear infinite`,
              animationPlayState: 'running',
            }}
          >
            {Array(20).fill(0).map((_, j) => (
              Math.random() > 0.5 ? '1' : '0'
            )).join(' ')}
          </div>
        ))}
      </div>
      
      {/* Floating AI/ML Icons (Optimized for mobile performance) */}
      <div className="absolute inset-0 z-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl sm:text-4xl"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {['🤖', '🧠', '💻', '⚡', '🔬', '📊'][i]}
          </div>
        ))}
      </div>

      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* ===== DESKTOP BACK BUTTON ===== */}
      <button
        onClick={() => navigate(-1)}
        className="
          hidden md:flex items-center gap-2
          fixed top-24 left-6 z-50
          px-4 py-2 rounded-lg
          bg-gray-900/80 backdrop-blur-sm border border-gray-700
          text-gray-200
          hover:text-primary hover:border-primary hover:bg-gray-900
          transition-all duration-300
          shadow-lg
        "
      >
        <FaArrowLeft />
        Back
      </button>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-20"
        >
          ML2Web-a-thon{" "}
           </motion.h1>

        {/* ===== RULES & REGULATIONS SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* ===== LEFT: RULES ===== */}
          <div className="md:col-span-2 bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-10 shadow-xl hover:border-primary/50 transition-all duration-300">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center md:text-left">
              Rules & Regulations
            </h2>

            <ul className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed list-disc list-inside">
              <li>Dataset and exact problem statement will be revealed only at the event time.</li>
              <li>Teams must train an <strong className="text-primary">AI/ML</strong> model using the given dataset and build a web application to showcase results.</li>
              <li>Frameworks/tools such as <strong className="text-primary">Python, PyTorch, NumPy, Flask / Django</strong> are allowed.</li>
              <li>Internet usage is allowed <strong className="text-primary">for AI tools or references</strong>.</li>
              <li>Only the provided dataset is allowed, Pre-built projects are <strong className="text-primary">strictly prohibited</strong>.</li>
              <li>Judging will be based on <strong className="text-primary">UI model, functionality, innovation, and completeness</strong>.</li>
              <li>The decision of the judges and event heads will be <strong className="text-primary">final and binding</strong>.</li>
            </ul>
          </div>

          {/* ===== RIGHT: DETAILS + REGISTER ===== */}
          <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 flex flex-col justify-between h-fit self-center shadow-xl hover:border-primary/50 transition-all duration-300">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                Tournament Details
              </h2>

              <ul className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-primary">Timing:</strong> 10:00 AM – 2:00 PM
                </li>
                <li>
                  <strong className="text-primary">Reporting Time:</strong> 9:30 AM
                </li>
                <li>
                  <strong className="text-primary">Registration Fee:</strong> ₹100 per team
                </li>
                <li>
                  <strong className="text-primary">1st Prize:</strong> ₹2000
                </li>
                <li>
                  <strong className="text-primary">1st Runner-Up:</strong> ₹1500
                </li>
                <li>
                  <strong className="text-primary">Team Details:</strong> 2 Members
                </li>
              </ul>
            </div>

            {/* REGISTER BUTTON */}
            <motion.a
              href="https://forms.gle/roQx1zrMLPbZpYzVA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="
                mt-10
                inline-block
                text-center
                px-6 py-3
                rounded-lg
                bg-gradient-to-r from-primary to-purple-600
                text-white
                font-medium
                shadow-lg shadow-primary/30
                hover:shadow-primary/50
                transition-all duration-300
                cursor-pointer
              "
            >
              Register Now
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ===== MOBILE FLOATING ARROW BUTTON ===== */}
      <button
        onClick={() => navigate(-1)}
        className="
          md:hidden
          fixed bottom-6 right-6 z-50
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-gradient-to-r from-primary to-purple-600
          text-white
          shadow-lg shadow-primary/40
          hover:scale-110 transition
          backdrop-blur-sm
        "
        aria-label="Back"
      >
        <FaArrowUp />
      </button>

      {/* Add CSS animations in a separate style tag */}
      <style>
        {`
          @keyframes scrollBinary {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          /* Optimize for mobile - pause animations on mobile for performance */
          @media (max-width: 640px) {
            .absolute > div[style*="animation"] {
              animation-play-state: paused !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Webathon;