import React from "react";
import { Link } from "react-router-dom";
import { FaUserShield, FaCheckCircle, FaBullseye, FaChartLine } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HERO */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-md">
            Empower Your Workforce with <br />
            <span className="text-yellow-300">Smart Appraisals & Goal Tracking</span>
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100">
            A centralized platform for HR and employees to collaborate, review, and grow together.
          </p>
          <Link
            to="/login"
            className="inline-block mt-6 bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-purple-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Choose Our System?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <FeatureCard
              icon={<FaUserShield className="text-4xl text-purple-600 mb-3 mx-auto" />}
              title="Role-based Access"
              desc="Secure login and actions for HR & Employees with separate controls."
            />
            <FeatureCard
              icon={<FaBullseye className="text-4xl text-purple-600 mb-3 mx-auto" />}
              title="Goal Management"
              desc="Assign, track and complete professional goals seamlessly."
            />
            <FeatureCard
              icon={<FaChartLine className="text-4xl text-purple-600 mb-3 mx-auto" />}
              title="Performance Reviews"
              desc="Transparent and timely appraisal tracking and ratings."
            />
            <FeatureCard
              icon={<FaCheckCircle className="text-4xl text-purple-600 mb-3 mx-auto" />}
              title="Review Feedback"
              desc="Receive and give structured feedback with clarity and insights."
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-purple-700 text-white py-16 text-center px-4">
        <h3 className="text-3xl font-bold mb-4">Ready to build a high-performance culture?</h3>
        <p className="text-lg mb-6">Join us now to simplify appraisals and unlock team potential.</p>
        <Link
          to="/login"
          className="inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-purple-100 transition"
        >
          Login / Sign Up
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Appraisal Hub. All rights reserved.
      </footer>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
    {icon}
    <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

export default LandingPage;
