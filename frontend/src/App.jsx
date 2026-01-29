import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
//import Admin from "./pages/Admin";
//import AdminLogin from "./pages/AdminLogin";
import Webathon from "./pages/Webathon";
import BGMI from "./pages/BGMI";
import Valorant from "./pages/Valorant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/events/webathon" element={<Webathon />} />
      <Route path="/events/bgmi" element={<BGMI />} />
      <Route path="/events/valorant" element={<Valorant />} />
    </Routes>
  );
}

export default App;
/*<Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />*/