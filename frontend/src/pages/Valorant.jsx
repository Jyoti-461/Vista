import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Valorant = () => {
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
          VALORANT{" "}
          <span className="text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">
            5v5 Tournament
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
            time="₹300 per team"
            description="Each team must consist of 5 main players. A maximum of 1 substitute is allowed. A player may not play for more than one team."
          />

          <TimelineCard
            align="right"
            title="Game Settings"
            date="Mode"
            time="Custom Tournament"
            description="Game Type: Custom Game. Mode: Standard. Lobby Settings: Tournament Mode ON."
          />

          <TimelineCard
            align="left"
            title="Match Format"
            date="Structure"
            time="Single Elimination"
            description="All matches are 5v5. Tournament Type: Single Elimination. Matches are BO1. Grand Final may be BO3 based on organizer decision."
          />

          <TimelineCard
            align="right"
            title="Map Selection"
            date="Coin Toss"
            time="Map / Side Choice"
            description="Map selection will be decided by a coin toss or veto system. Toss winner may choose the map or starting side."
          />

          <TimelineCard
            align="left"
            title="Agent Rules"
            date="Agents"
            time="All Allowed"
            description="All VALORANT agents are allowed unless specific restrictions are announced by organizers."
          />

          <TimelineCard
            align="right"
            title="Round Rules"
            date="Scoring"
            time="First to 13"
            description="Standard VALORANT competitive rules apply. First team to win 13 rounds wins. Overtime is played at 12–12."
          />

          <TimelineCard
            align="left"
            title="Disconnection Policy"
            date="Timeout"
            time="5 Minutes"
            description="Match may be paused for up to 5 minutes. If player fails to reconnect, team must continue or forfeit."
          />

          <TimelineCard
            align="right"
            title="Code of Conduct"
            date="Fair Play"
            time="Strictly Enforced"
            description="Abusive language, racism, harassment, or spamming is prohibited. Admins may warn, mute, or disqualify teams."
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

export default Valorant;
