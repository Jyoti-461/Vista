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

/*Keyboard esc*/
useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setSelectedIndex(null);
      setZoomed(false);
    }
  };

  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, []);



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

  /* ✅ SAFE: selectedItem AFTER filteredData */
  const selectedItem =
    selectedIndex !== null ? filteredData[selectedIndex] : null;

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
  }, [selectedIndex, filteredData.length]);

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
          <button onClick={exportToExcel} className="px-4 py-2 bg-primary rounded">
            Export to Excel
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-3">
          {[
            { key: "ALL", label: "All" },
            { key: "BGMI", label: "BGMI" },
            { key: "VALORANT", label: "Valorant" },
            { key: "HACKATHON", label: "Hackathon" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setSelectedEvent(btn.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                selectedEvent === btn.key
                  ? "bg-primary text-white"
                  : "bg-darkcard text-gray-300"
              }`}
            >
              {btn.label} ({counts[btn.key]})
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by Team / Mobile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded bg-darkcard border border-gray-600"
        />
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-4 transition-all duration-300">
          {/* TABLE */}
          <div className={selectedItem ? "w-3/5" : "w-full"}>
            <table className="w-full border border-gray-700 rounded-lg">
              <thead className="bg-darkcard">
                <tr>
                  <th className="p-3 border">Team</th>
                  <th className="p-3 border">Mobile</th>
                  <th className="p-3 border">College</th>
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
                    className={`cursor-pointer hover:bg-darkcard/60
                      ${getEventRowColor(item.event)}
                      ${
                        selectedIndex === index
                          ? "bg-darkcard border-l-4 border-primary"
                          : ""
                      }`}
                  >
                    <td className="p-3 border">
                     <div className="font-semibold text-base">
    {item.teamName}
  </div>

  <div className="mt-1 text-sm font-semibold text-primary">
    👑 Team Leader: {item.name}
  </div>

  {item.teamMembers?.length > 0 && (
    <ul className="list-disc ml-5 mt-2 text-sm text-gray-300">
      {item.teamMembers.map((member, idx) => (
        <li key={idx}>{member}</li>
      ))}
    </ul>
  )}
                    </td>
                    <td className="p-3 border">{item.mobile}</td>
                    <td className="p-3 border">{item.college}</td>
                    <td className="p-3 border">{item.event}</td>
                    <td className="p-3 border">
  <button
    onClick={() => {
      setSelectedIndex(index);
      setZoomed(false);
    }}
    className="text-primary underline"
  >
    View Screenshot
  </button>

  <div className="text-xs mt-1 text-gray-200">
    TXN: {item.transactionId}
  </div>
</td>

                    <td className="p-3 border align-top">
  <span
    className={`px-2 py-1 rounded text-xs font-semibold inline-block ${
      item.paymentStatus === "OCR_CLEAN_MATCH"
        ? "bg-green-600 text-white"
        : item.paymentStatus === "FLAGGED_FOR_REVIEW"
        ? "bg-yellow-600 text-black"
        : item.paymentStatus === "REJECTED"
        ? "bg-red-600 text-white"
        : item.paymentStatus === "PENDING_OCR"
        ? "bg-gray-600 text-white"
        : "bg-gray-600 text-white"
    }`}
  >
    {item.paymentStatus}
  </span>

  {/* OCR FLAGS (unchanged, still highlighted) */}
  {item.ocrData?.flags?.length > 0 && (
    <ul className="mt-1 text-xs text-yellow-300">
      {item.ocrData.flags.map((f, i) => (
        <li key={i}>• {f}</li>
      ))}
    </ul>
  )}
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SCREENSHOT VIEWER */}
         {selectedItem && (
            <div className="w-2/5 bg-darkcard border rounded p-4 relative">
              {/* CLOSE */}
              <button
                className="absolute top-2 right-2 text-xl"
                onClick={() => {
                  setSelectedIndex(null);
                  setZoomed(false);
                }}
              >
                X
              </button>

              {/* STICKY TXN HEADER */}
              <div className="sticky top-0 bg-darkcard z-10 pb-2 border-b border-gray-700">
  <div className="text-lg font-bold text-primary truncate">
    TXN: {selectedItem.transactionId}
  </div>
</div>


              {/* IMAGE */}
              <div className="bg-darkcard border rounded-lg p-4 h-full flex flex-col">

              <img
                src={selectedItem.paymentScreenshot}
                alt="Screenshot"
                onClick={() => setZoomed((z) => !z)}
                className={`transition-transform duration-300 cursor-zoom-in ${
                  zoomed ? "scale-150" : "scale-100"
                } w-full max-h-[70vh] object-contain`}
              />
              </div>
            </div>
          )}


        </div>
      )}
    </div>
  );
};

export default Admin;
