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

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);

  const selectedItem =
    selectedIndex !== null ? filteredData[selectedIndex] : null;

  /* 🔐 Protect admin route */
  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      navigate("/admin-login");
    }
  }, [navigate]);

  /* 📥 Fetch registrations */
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://vista-4iwt.onrender.com/api/register"
      );
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

  /* ⌨️ Keyboard navigation */
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowDown" && selectedIndex < filteredData.length - 1) {
        setSelectedIndex((i) => i + 1);
        setZoomed(false);
      }

      if (e.key === "ArrowUp" && selectedIndex > 0) {
        setSelectedIndex((i) => i - 1);
        setZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  /* 📤 Export to Excel */
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
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">
          Admin Panel – Registrations
        </h1>

        <div className="flex gap-3">
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-primary rounded"
          >
            Export to Excel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-4 transition-all duration-300 ease-in-out">
          {/* TABLE */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              selectedItem ? "w-3/5" : "w-full"
            }`}
          >
            <table className="w-full border border-gray-700 rounded-lg">
              <thead className="bg-darkcard">
                <tr>
                  <th className="p-3 border">Team</th>
                  <th className="p-3 border">Mobile</th>
                  <th className="p-3 border">Event</th>
                  <th className="p-3 border">Payment</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item._id}
                    onClick={() => {
                      setSelectedIndex(index);
                      setZoomed(false);
                    }}
                    className={`cursor-pointer hover:bg-darkcard/60 transition
                      ${getEventRowColor(item.event)}
                      ${
                        selectedIndex === index
                          ? "bg-darkcard border-l-4 border-primary"
                          : ""
                      }
                    `}
                  >
                    <td className="p-3 border">
                      <div className="font-bold">{item.teamName}</div>
                      <div className="text-sm text-primary">
                        👑 {item.name}
                      </div>
                    </td>
                    <td className="p-3 border">{item.mobile}</td>
                    <td className="p-3 border">{item.event}</td>
                    <td className="p-3 border">
                      <button className="text-primary underline">
                        View Screenshot
                      </button>
                      <div className="text-xs mt-1">
                        TXN: {item.transactionId}
                      </div>
                    </td>
                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.paymentStatus === "OCR_CLEAN_MATCH"
                            ? "bg-green-600"
                            : item.paymentStatus === "FLAGGED_FOR_REVIEW"
                            ? "bg-yellow-600"
                            : item.paymentStatus === "REJECTED"
                            ? "bg-red-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {item.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SCREENSHOT VIEWER */}
          {selectedItem && (
            <div className="w-2/5 bg-darkcard border border-gray-700 rounded-lg p-4 transition-all duration-300 ease-in-out">
              <h2 className="text-lg font-bold mb-2 text-primary">
                Payment Screenshot
              </h2>

              <img
                src={selectedItem.paymentScreenshot}
                alt="Screenshot"
                onClick={() => setZoomed((z) => !z)}
                className={`cursor-zoom-in transition-transform duration-300 ease-in-out ${
                  zoomed
                    ? "scale-150 cursor-zoom-out"
                    : "scale-100"
                } w-full object-contain max-h-[70vh] rounded`}
              />

              <div className="mt-4">
                <div className="text-xl font-bold text-primary">
                  TXN: {selectedItem.transactionId}
                </div>
                <div>Event: {selectedItem.event}</div>
                <div>Status: {selectedItem.paymentStatus}</div>
                <div className="text-xs text-gray-400 mt-2">
                  Click image to zoom • ↑ / ↓ to navigate
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
