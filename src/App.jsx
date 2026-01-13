import { useState, useEffect } from "react"; // <--- 1. Import useState
import { Routes, Route, Link, Navigate } from "react-router-dom"; // <--- 2. Import Navigate
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login"; // <--- Import the new page
import TeamDashboard from "./TeamDashboard";

function App() {
  // 3. State to track if user is logged in (loads from localStorage so refresh doesn't kick you out)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className="font-sans text-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
              <span className="text-xl font-extrabold text-slate-800">MyBrand</span>
            </Link>

            <div className="flex space-x-8 items-center">
              <Link to="/" className="text-sm font-medium hover:text-blue-600">Home</Link>
              <Link to="/contact" className="text-sm font-medium hover:text-blue-600">Contact</Link>
              
              {/* Show "Logout" if logged in, otherwise "Login" */}
              {isAuthenticated ? (
                <button onClick={logout} className="text-sm font-medium text-red-500 hover:text-red-700">Logout</button>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-700">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          
          {/* 🛡️ PROTECTED ROUTE */}
          {/* If authenticated, show Dashboard. If not, redirect to Login */}
          <Route 
            path="/app" 
            element={isAuthenticated ? <TeamDashboard /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 text-center text-sm">
        <p>© 2026 Kamdilichukwu Samuel. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;