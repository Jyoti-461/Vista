import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("ALL");
const [searchTerm, setSearchTerm] = useState("");


  /* 🔐 Protect admin route */
  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      navigate("/admin-login");
    }
  }, [navigate]);

  /* 📥 Fetch registrations */
  const fetchData = async () => {
    try {
      const res = await axios.get("https://vista-4iwt.onrender.com/api/register");
      setData(res.data.data || res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* 📤 Export to Excel (Team-wise) */
  const exportToExcel = () => {
    const formattedData = filteredData.map((item, index) => ({

      "Sr No": index + 1,
      "Team Name": item.teamName,
       "Team Leader": item.name,
      "Team Members": item.teamMembers?.join(", "),
      Mobile: item.mobile,
      College: item.college,
      Event: item.event,
      "Transaction ID": item.transactionId,
      "Payment Status": item.paymentStatus,
      "Registered On": new Date(item.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, "TechVerse_Vista_2026_Registrations.xlsx");
  };

  /* 🔓 Logout */
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

/* ---------------- FILTERED DATA ---------------- */
const filteredData = data
  .filter((item) => {
    if (selectedEvent === "ALL") return true;
    if (selectedEvent === "BGMI") return item.event === "BGMI E-Sports";
    if (selectedEvent === "VALORANT") return item.event === "Valorant 5v5";
    if (selectedEvent === "HACKATHON") return item.event === "Web-a-Thon";
    return true;
  })
  .filter((item) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.teamName?.toLowerCase().includes(q) ||
      item.mobile?.includes(q)
    );
  });

/* ---------------- COUNTS ---------------- */
const counts = {
  ALL: data.length,
  BGMI: data.filter((i) => i.event === "BGMI E-Sports").length,
  VALORANT: data.filter((i) => i.event === "Valorant 5v5").length,
  HACKATHON: data.filter((i) => i.event === "Web-a-Thon").length,
};


const getEventRowColor = (event) => {
  if (event === "BGMI E-Sports") return "border-l-4 border-blue-500";
  if (event === "Valorant 5v5") return "border-l-4 border-red-500";
  if (event === "Web-a-Thon") return "border-l-4 border-green-500";
  return "";
};


  return (
    <div className="min-h-screen bg-darkbg text-gray-200 p-6">
      {/* HEADER */}
      
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-primary">
          Admin Panel – Registrations
        </h1>

        <div className="flex gap-3">
          <button
            onClick={exportToExcel}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            Export to Excel
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </div>
      {/* FILTER BAR */}
{/* FILTER BAR WITH COUNTS */}
<div className="sticky top-0 z-20 bg-darkbg py-3 mb-6">
  <div className="flex items-center justify-between flex-wrap gap-4">

  {/* LEFT: FILTER BUTTONS */}
  <div className="flex gap-3 flex-wrap">
    {[
      { key: "ALL", label: "All" },
      { key: "BGMI", label: "BGMI" },
      { key: "VALORANT", label: "Valorant" },
      { key: "HACKATHON", label: "Hackathon" },
    ].map((btn) => (
      <button
        key={btn.key}
        onClick={() => setSelectedEvent(btn.key)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold border flex items-center gap-2
          ${
            selectedEvent === btn.key
              ? "bg-primary text-white border-primary"
              : "bg-darkcard text-gray-300 border-gray-600"
          }`}
      >
        {btn.label}
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-bold
            ${
              selectedEvent === btn.key
                ? "bg-white text-primary"
                : "bg-gray-700 text-gray-200"
            }`}
        >
          {counts[btn.key]}
        </span>
      </button>
    ))}
  </div>
  </div>

  {/* RIGHT: TOTAL COUNT */}
  <div className="px-4 py-2 rounded-lg bg-darkcard border border-gray-600 text-sm font-semibold">
    <input
  type="text"
  placeholder="Search by Team / Mobile"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="px-4 py-2 rounded-lg bg-darkcard border border-gray-600 text-sm text-gray-200"
/>
  </div>
</div>



      {/* CONTENT */}
      {loading ? (
        <p>Loading registrations...</p>
      ) : data.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-darkcard">
              <tr>
                <th className="p-3 border">Team Details</th>
                <th className="p-3 border">Mobile No</th>
                <th className="p-3 border">College</th>
                <th className="p-3 border">Event</th>
                <th className="p-3 border">Payment</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr
  key={item._id}
  className={`hover:bg-darkcard/60 ${getEventRowColor(item.event)}`}
>

                  {/* TEAM DETAILS */}
                  <td className="p-3 border align-top">
                    <div className="font-semibold text-base">
  {item.teamName}
</div>

{/* TEAM LEADER */}
<div className="mt-2 text-sm font-semibold text-primary">
  👑 Team Leader: {item.name}
</div>

{/* TEAM MEMBERS */}
<ul className="list-disc ml-5 mt-2 text-sm text-gray-300">
  {item.teamMembers?.map((member, index) => (
    <li key={index}>{member}</li>
  ))}
</ul>

                  </td>
                  <td className="p-3 border font-semibold">
  {item.mobile}
</td>


                  {/* COLLEGE */}
                  <td className="p-3 border">{item.college}</td>

                  {/* EVENT */}
                  <td className="p-3 border">{item.event}</td>

                  {/* PAYMENT */}
                  <td className="p-3 border">
                  
                  <a
                    href={item.paymentScreenshot}
                     // href={`http://localhost:5000/${item.paymentScreenshot}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      View Screenshot
                    </a>
                    <div className="text-xs mt-1">
                      TXN: {item.transactionId}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.paymentStatus === "VERIFIED"
                          ? "bg-green-600"
                          : item.paymentStatus === "FLAGGED"
                          ? "bg-yellow-600"
                          : item.paymentStatus === "REJECTED"
                          ? "bg-red-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="p-3 border text-sm">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
