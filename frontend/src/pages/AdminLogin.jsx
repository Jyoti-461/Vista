import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isAdmin")) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://vista-4iwt.onrender.com/api/admin/login",
        credentials
      );

      if (res.data.success) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      }
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkbg text-gray-200 px-4">
      <div className="bg-darkcard border border-gray-700 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-darkbg border border-gray-600 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-darkbg border border-gray-600 outline-none"
          />

          <button className="w-full py-3 bg-primary rounded-lg font-medium">
            Login
          </button>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
