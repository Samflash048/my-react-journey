import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-b from-blue-50 to-white min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        
        {/* Badge */}
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            New features available. <a href="#" className="font-semibold text-blue-600">Read more <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Manage your team like a <span className="text-blue-600">Pro</span>
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-gray-600">
          The all-in-one solution for tracking employees, roles, and locations. 
          Stop using spreadsheets and start using MyBrand.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/app" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Get started
          </Link>
          <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900">
            Contact Support <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;