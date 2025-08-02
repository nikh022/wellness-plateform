import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Dashboard
        </Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-sessions"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                My Sessions
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
