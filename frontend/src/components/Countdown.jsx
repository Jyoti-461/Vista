import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Countdown = () => {
  // 👉 EVENT DATE
  const eventDate = new Date("2026-02-09T09:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section className="py-12 text-center bg-lightbg dark:bg-darkbg transition">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-12"
      >
        Event Starts In
      </motion.h2>

      <div className="flex justify-center gap-4 flex-wrap">
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
        <TimeBox label="Seconds" value={timeLeft.seconds} />
      </div>
    </section>
  );
};

const TimeBox = ({ label, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="
        bg-white dark:bg-darkcard
        border border-gray-200 dark:border-gray-700
        rounded-xl px-6 py-5 min-w-[90px]
        neon-primary
      "
    >
      <p className="text-3xl font-bold text-primary">
        {value.toString().padStart(2, "0")}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {label}
      </p>
    </motion.div>
  );
};

export default Countdown;
