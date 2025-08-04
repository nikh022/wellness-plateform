import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  // call the logout function passed from App.jsx and redirect to login page
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Wellness Platform
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/my-sessions"
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                >
                  My Sessions
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
