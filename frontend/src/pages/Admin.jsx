import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Protect admin route
  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // 📥 Fetch registrations
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/register")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 📤 Export to Excel
  const exportToExcel = () => {
    const formattedData = data.map((item, index) => ({
      "Sr No": index + 1,
      Name: item.name,
      Email: item.email,
      College: item.college,
      Event: item.event,
      Role: item.role,
      "Registered On": new Date(item.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, "TechVerse Vista_2026_Registrations.xlsx");
  };

  const deleteRegistration = async (id) => {
  if (!window.confirm("Are you sure you want to delete this registration?")) {
    return;
  }

  try {
    await axios.delete(`http://localhost:5000/api/register/${id}`);
    setData(data.filter(item => item._id !== id));
  } catch (err) {
    alert("Failed to delete");
  }
};


  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
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
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
          >
            Export to Excel
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            Logout
          </button>
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
                <th className="p-3 border border-gray-700">Actions</th>
                <th className="p-3 border border-gray-700">Name</th>
                <th className="p-3 border border-gray-700">Email</th>
                <th className="p-3 border border-gray-700">College</th>
                <th className="p-3 border border-gray-700">Event</th>
                <th className="p-3 border border-gray-700">Role</th>
                <th className="p-3 border border-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-darkcard/60">
                    <td className="p-3 border border-gray-700">
  <button
    onClick={() => deleteRegistration(item._id)}
    className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
  >
    Delete
  </button>
</td>

                  <td className="p-3 border border-gray-700">{item.name}</td>
                  <td className="p-3 border border-gray-700">{item.email}</td>
                  <td className="p-3 border border-gray-700">{item.college}</td>
                  <td className="p-3 border border-gray-700">{item.event}</td>
                  <td className="p-3 border border-gray-700">{item.role}</td>
                  <td className="p-3 border border-gray-700 text-sm">
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
