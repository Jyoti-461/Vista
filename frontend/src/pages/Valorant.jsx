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

        {/* ===== RULES & REGULATIONS SECTION ===== */}
        {/* ===== CONTENT GRID ===== */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10"
>
  {/* ===== LEFT: RULES & REGULATIONS ===== */}
  <div className="md:col-span-2 bg-darkcard border border-gray-700 rounded-2xl p-8 md:p-10">
    <h2 className="text-3xl font-bold text-primary mb-6 text-center md:text-left">
      Rules & Regulations
    </h2>

    <ul className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed list-disc list-inside">
      <li>The Organisers will Provide <strong>Desktop.</strong>Bring your own <strong>Headphone</strong></li>
      <li>Matches will be played in <strong>Custom Game</strong> mode.</li>
      <li>Game settings must be <strong>Standard</strong> with <strong>Tournament Mode ON</strong>.</li>
      <li>All matches will be conducted in a <strong>5v5 format</strong>.</li>
      <li>The tournament will follow a <strong>Single Elimination</strong> format.</li>
      <li>Each match will be <strong>Best of 1 (BO1)</strong>; the final match may be <strong>Best of 3 (BO3)</strong>.</li>
      <li>Map selection will be decided through <strong>Coin Toss or Veto</strong>.</li>
      <li>The toss winner can choose either the <strong>Map</strong> or the <strong>Side (Attack/Defense)</strong>.</li>
      <li><strong>All agents</strong> available in VALORANT are allowed.</li>
      <li>The first team to <strong>win 13 rounds</strong> wins the match.</li>
      <li>If the score reaches <strong>12–12</strong>, <strong>Overtime</strong> will be played.</li>
      <li>In case of disconnection, the match may be paused for up to <strong>5 minutes</strong>.</li>
      <li>If the player does not return, the team must <strong>continue or forfeit</strong>.</li>
      <li><strong>Toxic behavior</strong> of any kind is strictly prohibited.</li>
      <li>Admins may <strong>warn, mute, or disqualify</strong> teams violating rules.</li>
    </ul>
  </div>

  {/* ===== RIGHT: DETAILS + REGISTER ===== */}
  {/* ===== RIGHT: DETAILS + REGISTER ===== */}
  {/* Added h-fit (to shrink height) and self-center (to vertical align) */}
  <div className="bg-darkcard border border-gray-700 rounded-2xl p-8 flex flex-col justify-between h-fit self-center shadow-xl">
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Tournament Details
      </h2>

      <ul className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed list-disc list-inside">
        <li>
          <strong>Timing:</strong> 10:00 AM – 1:00 PM
        </li>
        <li>
          <strong>Reporting Time:</strong> 9:30 AM
        </li>
        <li>
          <strong>Registration Fee:</strong> ₹300 per team
        </li>
        <li>
          <strong>1st Prize:</strong> ₹3000
        </li>
        <li>
          <strong>1st Runner-Up:</strong> ₹2000
        </li>
        <li>
          <strong>Prize:</strong> Trophies & Certificates
        </li>
        <li>
          <strong>Team Details:</strong> 5 Players
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
export default Valorant;
