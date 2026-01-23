import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BGMI = () => {
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
          BGMI{" "}
          <span className="text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">
            E-Sports
          </span>
        </motion.h1>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-primary/40 hidden md:block" />

          <TimelineCard
            align="left"
            title="Entry & Team Details"
            date="Entry Fee"
            time="₹200 per team"
            description="Each team must consist of 4 main players. A maximum of 1 substitute is allowed. A player may not play for more than one team."
          />

          <TimelineCard
            align="right"
            title="Allowed & Restricted Items"
            date="Equipment Rules"
            time="Strictly Enforced"
            description="No iPads or air triggers allowed. Finger sleeves, headphones or earphones must be brought by participants themselves."
          />

          <TimelineCard
            align="left"
            title="Game Mode & Maps"
            date="Match Format"
            time="Best of 3 Matches"
            description="Matches will be played only on Erangel, Miramar, and Rondo maps. Additional rules may be disclosed on the spot."
          />

          <TimelineCard
            align="right"
            title="Code of Conduct"
            date="Discipline"
            time="Mandatory"
            description="No abusive or vulgar language is allowed during match. Any malpractice, cheating, or hacking will lead to immediate disqualification."
          />

          <TimelineCard
            align="left"
            title="Scoring System"
            date="Points Allocation"
            time="Per Match"
            description="Per kill: 1 point. Placement points — 1st: 10, 2nd: 6, 3rd: 5, 4th: 4, 5th: 3, 6th: 2, 7th–8th: 1, 9th–16th: 0."
          />

          <TimelineCard
            align="right"
            title="Final Decision"
            date="Judgement"
            time="Event Day"
            description="Winner will be finalized on the basis of Points Table by Event Judge's. Winners will be declared on the event day."
          />

        </div>
      </div>

      {/* ===== MOBILE FLOATING BACK BUTTON ===== */}
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

export default BGMI;
