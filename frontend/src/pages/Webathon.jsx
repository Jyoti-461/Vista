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
    <section className="min-h-screen bg-darkbg text-gray-200 px-6 py-24 relative">

      {/* ===== DESKTOP BACK BUTTON ===== */}
      <button
        onClick={() => navigate(-1)}
        className="
          hidden md:flex items-center gap-2
          fixed top-24 left-6 z-50
          px-4 py-2 rounded-lg
          bg-darkcard border border-gray-700
          text-gray-200
          hover:text-primary hover:border-primary
          transition
        "
      >
        <FaArrowLeft />
        Back
      </button>

      <div className="max-w-6xl mx-auto">
        
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-20"
        >
          AI Forge{" "}
          <span className="text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">
            Timeline
          </span>
        </motion.h1>

        

        {/* ===== RULES & REGULATIONS SECTION ===== */}
        {/* ===== CONTENT GRID ===== */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10"
>
  {/* ===== LEFT: RULES ===== */}
  <div className="md:col-span-2 bg-darkcard border border-gray-700 rounded-2xl p-8 md:p-10">
    <h2 className="text-3xl font-bold text-primary mb-6 text-center md:text-left">
      Rules & Regulations
    </h2>

    <ul className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed list-disc list-inside">
      
      <li>The website must fulfill the <strong>accuracy of the problem statement</strong>.</li>
      <li>Dataset and exact problem statement will be revealed only at the event time.</li>
      <li>Teams must train an <strong>AI/ML</strong> model using the given dataset and build a web application to showcase results.</li>
      <li>Frameworks/tools such as <strong>Python, PyTorch, NumPy, Flask / Django</strong> are allowed.</li>
      <li>Internet usage is allowed <strong>for AI tools or references</strong>.</li>
      <li>Only the provided dataset is allowed, Pre-built projects are <strong>strictly prohibited</strong>.</li>
      
      <li>Judging will be based on <strong>UI, functionality, innovation, and completeness</strong>.</li>
      <li>The decision of the judges and event heads will be <strong>final and binding</strong>.</li>
    </ul>
  </div>

  {/* ===== RIGHT: REGISTRATION + PRIZES ===== */}
  {/* ===== RIGHT: DETAILS + REGISTER ===== */}
  {/* Added h-fit (to shrink height) and self-center (to vertical align) */}
  <div className="bg-darkcard border border-gray-700 rounded-2xl p-8 flex flex-col justify-between h-fit self-center shadow-xl">
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Tournament Details
      </h2>

      <ul className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed list-disc list-inside">
        <li>
          <strong>Timing:</strong> 10:00 AM – 2:00 PM
        </li>
        <li>
          <strong>Reporting Time:</strong> 9:30 AM
        </li>
        <li>
          <strong>Registration Fee:</strong> ₹100 per team
        </li>
        <li>
          <strong>1st Prize:</strong> ₹2000
        </li>
        <li>
          <strong>1st Runner-Up:</strong> ₹1500
        </li>
        <li>
          <strong>Team Details:</strong> 2 Members
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
        bg-primary text-white
        font-medium
        neon-primary
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
          bg-primary text-white
          shadow-lg shadow-primary/40
          hover:scale-110 transition
        "
        aria-label="Back"
      >
        <FaArrowUp />
      </button>
    </section>
  );
};

export default Webathon;
