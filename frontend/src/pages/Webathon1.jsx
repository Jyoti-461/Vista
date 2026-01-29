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

        {/* Timeline */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-primary/40 hidden md:block" />

          <TimelineCard
            align="left"
            title="Web-a-Thon"
            date="Event Day"
            time="On-spot Problem Statement"
            description="Participants must design and develop a model based on a given problem statement within a limited time."
          />

          <TimelineCard
            align="right"
            title="Team & Registration"
            date="Registration Fee"
            time="₹100 per team"
            description="Team size: 2 members. Exciting cash prizes and certificates will be awarded."
          />

          <TimelineCard
            align="left"
            title="Judging Criteria"
            date="Evaluation"
            time="Final Decision"
            description="Judging will be based on UI, functionality, innovation, and completeness. The decision of the judges and event heads will be final."
          />

        </div>

        {/* ===== RULES & REGULATIONS SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 bg-darkcard border border-gray-700 rounded-2xl p-8 md:p-10"
        >
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Rules & Regulations
          </h2>

          <ul className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed list-disc list-inside">
            <li>Participants must design a website along with backend support.</li>
            <li>The website must fullfill the<strong> accurracy of Statement</strong>.</li>
            <li>The problem statement will be provided on the event day.</li>
            <li>Frameworks/tools such as <strong>Scikit-learn, TensorFlow, Python, Flask / Django</strong> are allowed.</li>
            <li>Internet usage is allowed <strong>for AI or References</strong>.</li>
            <li>The website must be <strong>original</strong> and developed during the event.</li>
            <li>Use of pre-built or ready-made templates is <strong>strictly prohibited</strong>.</li>
            <li>Judging will be based on UI, functionality, innovation, and completeness.</li>
            <li>The decision of the judges and event heads will be <strong>final and binding</strong>.</li>
          </ul>
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

const TimelineCard = ({ align, title, date, time, description }) => {
  const isLeft = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`
        relative mb-20
        flex ${isLeft ? "md:justify-start" : "md:justify-end"}
      `}
    >
      {/* Dot */}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 top-6
          w-4 h-4 rounded-full bg-primary
          shadow-[0_0_15px_rgba(99,102,241,0.9)]
          hidden md:block
        "
      />

      {/* Card */}
      <div
        className="
          w-full md:w-[45%]
          bg-darkcard border border-gray-700
          rounded-2xl p-6
          shadow-lg
        "
      >
        <h3 className="text-xl font-semibold text-primary mb-2">
          {title}
        </h3>

        <p className="text-sm text-pink-400 mb-1">
          {date}
        </p>

        <p className="text-sm text-yellow-400 mb-3">
          {time}
        </p>

        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default Webathon;
