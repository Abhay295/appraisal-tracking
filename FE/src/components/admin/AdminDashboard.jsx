import React from 'react';
import { FaBars, FaHome, FaUser, FaChartBar, FaCog, FaUsers, FaCalendarAlt, FaExclamationTriangle, FaThumbsUp, FaChartLine, FaStar, FaMoneyBillAlt, FaGraduationCap } from 'react-icons/fa'
const AdminDashboard = () => {
  return (
  
  <div className="flex-1 p-8 mt-6">
      <h1 className="text-4xl font-bold text-purple-900 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Employees */}
        <div className="bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform">
          <FaUsers className="text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Total Employees</h3>
          <p className="text-3xl font-bold">150</p>
          <p className="text-sm">Active</p>
        </div>

        {/* Employees Due for Appraisal */}
        <div className="bg-gradient-to-r from-blue-400 to-teal-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform">
          <FaCalendarAlt className="text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Due for Appraisal</h3>
          <p className="text-3xl font-bold">25</p>
          <p className="text-sm">Next Cycle: Dec 2023</p>
        </div>

        {/* Employees on Probation */}
        <div className="bg-gradient-to-r from-pink-400 to-red-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform">
          <FaExclamationTriangle className="text-3xl mb-2" />
          <h3 className="text-lg font-semibold">On Probation</h3>
          <p className="text-3xl font-bold">10</p>
          <p className="text-sm">Requiring Attention</p>
        </div>

        {/* Reminders Sent */}
        <div className="bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform">
          <FaThumbsUp className="text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Reminders Sent</h3>
          <p className="text-3xl font-bold">120/150</p>
          <p className="text-sm">Appraisal Cycle</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Department-wise Performance */}
          <div className="bg-gray-50 rounded-lg p-4">
            <FaChartLine className="text-2xl text-purple-600 mb-2" />
            <h3 className="text-lg font-semibold text-purple-900">Department-wise Performance</h3>
            <p className="text-sm text-gray-600">Engineering: 88%</p>
            <p className="text-sm text-gray-600">Sales: 75%</p>
            <p className="text-sm text-gray-600">HR: 92%</p>
          </div>

          {/* Top Performers */}
          <div className="bg-gray-50 rounded-lg p-4">
            <FaStar className="text-2xl text-blue-600 mb-2" />
            <h3 className="text-lg font-semibold text-blue-900">Top Performers</h3>
            <p className="text-sm text-gray-600">John Doe (Engineering)</p>
            <p className="text-sm text-gray-600">Jane Smith (Sales)</p>
          </div>

          {/* Employees Needing Improvement */}
          <div className="bg-gray-50 rounded-lg p-4">
            <FaExclamationTriangle className="text-2xl text-pink-600 mb-2" />
            <h3 className="text-lg font-semibold text-pink-900">Needing Improvement</h3>
            <p className="text-sm text-gray-600">5 Employees</p>
          </div>
        </div>
      </div>

      {/* Decision Support */}
      <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Decision Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Promotion Recommendations */}
          <div className="bg-gray-50 rounded-lg p-4">
            <FaMoneyBillAlt className="text-2xl text-purple-600 mb-2" />
            <h3 className="text-lg font-semibold text-purple-900">Promotion Recommendations</h3>
            <p className="text-sm text-gray-600">15 Employees</p>
          </div>

          {/* Salary Hike Recommendations */}
          <div className="bg-gray-50 rounded-lg p-4">
            <FaMoneyBillAlt className="text-2xl text-blue-600 mb-2" />
            <h3 className="text-lg font-semibold text-blue-900">Salary Hike Recommendations</h3>
            <p className="text-sm text-gray-600">10% for Top Performers</p>
          </div>

          {/* Training Recommendations */}
          <div className=" bg-gray-50 rounded-lg p-4">
            <FaGraduationCap className="text-2xl text-pink-600 mb-2" />
            <h3 className="text-lg font-semibold text-pink-900">Training Recommendations</h3>
            <p className="text-sm text-gray-600">20 Employees</p>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default AdminDashboard