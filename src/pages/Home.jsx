import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold mb-6 text-blue-900">Welcome to Team Manager</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-lg">
        The easiest way to track your employees, roles, and locations in one place.
      </p>
      <Link to="/app" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-lg">
        Go to Dashboard →
      </Link>
    </div>
  );
}
export default Home;