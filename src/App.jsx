import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import TeamDashboard from "./TeamDashboard";

function App() {
  return (
    <div className="font-sans text-gray-900 min-h-screen flex flex-col">
      {/* 🌟 UPGRADED NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Area */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">
                M
              </div>
              <span className="text-xl font-extrabold text-slate-800 tracking-tight">
                MyBrand
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/app">Dashboard</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* 📄 MAIN CONTENT AREA */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app" element={<TeamDashboard />} />
        </Routes>
      </main>

      {/* 🦶 NEW FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-white text-lg">MyBrand</span>
            <p className="text-sm text-slate-400 mt-1">© 2026 Kamdilichukwu Samuel. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// A small helper component to make links look cleaner
function NavLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
    </Link>
  );
}

export default App;