import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
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
    if (event === "Web-a-Thon") return { team: true, members: 1 };
    if (event === "Valorant 5v5") return { team: true, members: 5 };
    if (event === "BGMI E-Sports") return { team: true, members: 4 };
    return { team: false, members: 0 };
  };

  const handleEventChange = (e) => {
    const event = e.target.value;
    const config = getTeamConfig(event);

    setFormData({
      ...formData,
      event,
      teamName: "",
      teamMembers: Array(config.members).fill(""),
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
      data.append("mobile", formData.mobile);
      data.append("college", formData.college);
      data.append("event", formData.event);
      data.append("teamName", formData.teamName || "");
      data.append("transactionId", formData.transactionId);
      data.append("paymentScreenshot", formData.paymentScreenshot);

      formData.teamMembers.forEach((member) => {
        data.append("teamMembers", member);
      });

      const res = await axios.post(
        "https://vista-4iwt.onrender.com/api/register",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        setMessage("✅ Registration successful!");
        setFormData({
          name: "",
          mobile: "",
          college: "",
          event: "",
          teamName: "",
          teamMembers: [],
          transactionId: "",
          paymentScreenshot: null,
        });
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Registration failed. Please try again.";
      setMessage(`❌ ${msg}`);
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
        {/* TEAM LEADER NOTE */}
<div className="mb-3 px-4 py-2 text-sm 
                bg-gray-50 dark:bg-darkcard 
                text-black dark:text-white rounded-lg">
  <span className="font-semibold text-yellow-500">
    Note:
  </span>{" "}
  Read <strong>Rules&nbsp;</strong> & <strong>Regulations&nbsp;</strong>in View Details of Event.<br></br>
  College ID is <strong>Mandatory&nbsp;</strong>on Event Day.
</div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* BASIC DETAILS */}
          <div>
            <label className="block mb-1 text-sm">Team Leader</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Mobile Number</label>
            <input
              type="tel"
              required
              maxLength={10}
              pattern="[6-9]{1}[0-9]{9}"
              placeholder="10-digit mobile number"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">College Name</label>
            <input
              type="text"
              required
              value={formData.college}
              onChange={(e) =>
                setFormData({ ...formData, college: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
            />
          </div>

          {/* EVENT */}
          <div>
            <label className="block mb-1 text-sm">Select Event</label>
            <select
              value={formData.event}
              onChange={handleEventChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
            >
              <option value="">Choose Event</option>
              <option value="Web-a-Thon">Web-a-Thon (Hackathon)</option>
              <option value="BGMI E-Sports">BGMI (4 + 1)</option>
              <option value="Valorant 5v5">Valorant (5 + 1)</option>
            </select>
          </div>

          {/* TEAM NAME */}
          {config.team && (
            <div>
              <label className="block mb-1 text-sm">Team Name</label>
              <input
                type="text"
                required
                value={formData.teamName}
                onChange={(e) =>
                  setFormData({ ...formData, teamName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
              />
            </div>
          )}

          {/* TEAM MEMBERS */}
          {formData.teamMembers.length > 0 && (
            <div>
              <label className="block mb-2 text-sm">
  {formData.event === "BGMI E-Sports"
    ? "Players ( Team Leader + 3 Main + 1 Substitute )"
    : formData.event === "Valorant 5v5"
    ? "Players ( Team Leader + 4 Main + 1 Substitute )"
    : "Team Members ( Team Leader + 1 )"}
</label>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.teamMembers.map((m, i) => (
                  <input
                    key={i}
                    type="text"
                    required
                    value={m}
                    onChange={(e) => handleMemberChange(i, e.target.value)}
                   placeholder={
  formData.event === "BGMI E-Sports"
    ? i === 3
      ? "Substitute Player (Member 5)"
      : `Main Player (Member ${i + 2})`
    : formData.event === "Valorant 5v5"
    ? i === 4
      ? "Substitute Player (Member 6)"
      : `Main Player (Member ${i + 2})`
    : `Member ${i + 2}`
}

                    className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkbg border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT */}
          <img
            src="/sponsors/payment-qr.jpeg"
            alt="Payment QR"
            className="mx-auto w-56 rounded-lg border"
          />

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

          <div>
            <label className="block text-sm">Payment Screenshot</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentScreenshot: e.target.files[0],
                })
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
