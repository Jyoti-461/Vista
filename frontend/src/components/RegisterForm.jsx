import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    event: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );

      if (res.data.success) {
        setMessage("✅ Registration successful!");
        setFormData({
          name: "",
          email: "",
          college: "",
          event: "",
          role: "",
        });
      }
    } catch (error) {
      setMessage("❌ Registration failed. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        py-20 px-6 flex justify-center
        bg-lightbg dark:bg-darkbg
      "
    >
      <div
        className="
          w-full max-w-xl
          bg-white dark:bg-darkcard
          border border-gray-200 dark:border-gray-700
          rounded-2xl p-8
          shadow-xl
        "
      >
        <h2
          className="
            text-3xl font-bold mb-6 text-center
            text-gray-900 dark:text-gray-200
          "
        >
          Register for{" "}
          <span className="text-primary neon-primary">
            TechVerse Vista 2026
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Inputs */}
          {[
            { name: "name", type: "text", placeholder: "Full Name" },
            { name: "email", type: "email", placeholder: "Email Address" },
            { name: "college", type: "text", placeholder: "College Name" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3 rounded-lg
                bg-gray-50 dark:bg-darkbg
                border border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-gray-200
                focus:border-primary focus:ring-2 focus:ring-primary/40
                outline-none transition
              "
            />
          ))}

          {/* Event */}
          <select
            name="event"
            value={formData.event}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-3 rounded-lg
              bg-gray-50 dark:bg-darkbg
              border border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-200
              focus:border-primary focus:ring-2 focus:ring-primary/40
              outline-none transition
            "
          >
            <option value="">Select Event</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Coding Contest">Coding Contest</option>
            <option value="UI/UX Challenge">UI/UX Challenge</option>
            <option value="Tech Quiz">Tech Quiz</option>
          </select>

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-3 rounded-lg
              bg-gray-50 dark:bg-darkbg
              border border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-200
              focus:border-primary focus:ring-2 focus:ring-primary/40
              outline-none transition
            "
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg
              bg-primary text-white font-medium
              neon-primary
              hover:scale-[1.02]
              transition disabled:opacity-50
            "
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>

          {message && (
            <p
              className="
                text-center text-sm mt-3
                text-gray-700 dark:text-gray-300
              "
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
