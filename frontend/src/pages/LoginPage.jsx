import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api/api";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginView) {
        await onLogin(formData);
      } else {
        await api.register(formData);
        // After successful registration, log the user in directly or redirect
        await onLogin(formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isLoginView ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleAuthSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {isLoginView ? "Login" : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {isLoginView ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={() => setIsLoginView(!isLoginView)}
          className="text-blue-500 hover:text-blue-700 hover:underline ml-1"
        >
          {isLoginView ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
