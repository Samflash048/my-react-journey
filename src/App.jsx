import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import TeamDashboard from "./TeamDashboard";

function App() {
  return (
    <div className="font-sans text-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tight">MyBrand</Link>
        <div className="space-x-6 font-medium">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Home</Link>
          <Link to="/app" className="text-gray-600 hover:text-blue-600 transition">Dashboard</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</Link>
        </div>
      </nav>

      {/* The Page Content Swaps Here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/app" element={<TeamDashboard />} />
      </Routes>
    </div>
  );
}

export default App;