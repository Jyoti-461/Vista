import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  college: "",
  event: "",
  teamName: "",
  teamMembers: [],
  transactionId: "",
  paymentScreenshot: null,
});


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ---------------- EVENT LOGIC ---------------- */
  const getTeamConfig = (event) => {
    if (event === "Web-a-Thon") return { team: true, members: 2 };
    if (event === "Valorant 5v5") return { team: true, members: 6 };
    if (event === "BGMI E-Sports") return { team: false, members: 1 };
    return { team: false, members: 0 };
  };

  const handleEventChange = (e) => {
    const event = e.target.value;
    const config = getTeamConfig(event);

    setFormData({
      ...formData,
      event,
      teamName: "",
      teamMembers: Array(config.members).fill("")
    });
  };

  const handleMemberChange = (index, value) => {
    const updated = [...formData.teamMembers];
    updated[index] = value;
    setFormData({ ...formData, teamMembers: updated });
  };

  /* ---------------- SUBMIT ---------------- */
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("college", formData.college);
    data.append("event", formData.event);
    data.append("teamName", formData.teamName || "");
    data.append("transactionId", formData.transactionId);
    data.append("paymentScreenshot", formData.paymentScreenshot);

    formData.teamMembers.forEach((member) => {
      data.append("teamMembers[]", member);
    });

    const res = await axios.post(
      "http://localhost:5000/api/register",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.data.success) {
      setMessage("✅ Registration successful!");
      setFormData({
        name: "",
        email: "",
        college: "",
        event: "",
        teamName: "",
        teamMembers: [],
        transactionId: "",
        paymentScreenshot: null,
      });
    }
  } catch (err) {
    console.error(err.response?.data || err);
    setMessage("❌ Registration failed. Please check inputs.");
  } finally {
    setLoading(false);
  }
};


  const config = getTeamConfig(formData.event);

  return (
    <section
      id="register"
      className="py-20 px-6 flex justify-center bg-lightbg dark:bg-darkbg"
    >
      <div className="w-full max-w-2xl bg-white dark:bg-darkcard border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-200">
          Register for <span className="text-primary">TechVerse Vista 2026</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* BASIC DETAILS */}
          {["name", "email", "college"].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "College Name"}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border border-gray-300 dark:border-gray-600"
              />
            </div>
          ))}

          {/* EVENT */}
          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Select Event
            </label>
            <select
              value={formData.event}
              onChange={handleEventChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border border-gray-300 dark:border-gray-600"
            >
              <option value="">Choose Event</option>
              <option value="Web-a-Thon">Web-a-Thon (Hackathon)</option>
              <option value="BGMI E-Sports">BGMI (Solo)</option>
              <option value="Valorant 5v5">Valorant (5 + 1)</option>
            </select>
          </div>

          {/* TEAM NAME */}
          {config.team && (
            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                Team Name
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) =>
                  setFormData({ ...formData, teamName: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
              />
            </div>
          )}

          {/* TEAM MEMBERS */}
          {formData.teamMembers.length > 0 && (
            <div>
              <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
                Team Members (Ex:- 60_abc)
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.teamMembers.map((m, i) => (
                  <input
                    key={i}
                    type="text"
                    value={m}
                    required
                    onChange={(e) => handleMemberChange(i, e.target.value)}
                    placeholder={
                      formData.event === "Valorant 5v5" && i === 5
                        ? "Substitute Roll_No_Name"
                        : `Member ${i + 1} Roll_No_Name`
                    }
                    className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* ROLE */}
          <img
  src="/sponsors/payment-qr.jpeg"
  alt="Payment QR"
  className="mx-auto w-56 rounded-lg border"
/>
{/* Transaction ID */}
<div>
  <label className="block text-sm">UPI Transaction ID</label>
  <input
    type="text"
    required
    value={formData.transactionId}
    onChange={(e) =>
      setFormData({ ...formData, transactionId: e.target.value })
    }
    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
  />
</div>

{/* Screenshot */}
<div>
  <label className="block text-sm">Payment Screenshot</label>
  <input
    type="file"
    accept="image/*"
    required
    onChange={(e) =>
      setFormData({ ...formData, paymentScreenshot: e.target.files[0], })
    }
  />
</div>



          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
