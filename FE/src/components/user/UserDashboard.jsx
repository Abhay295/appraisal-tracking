import React, { useState } from 'react'
import { FaBars, FaBell, FaChartLine, FaCheckCircle, FaClipboardList, FaExclamationTriangle, FaGraduationCap, FaStar, FaTimes, FaTrophy, FaUserCircle } from 'react-icons/fa'
import { MdDashboard, MdOutlineDateRange, MdPendingActions } from 'react-icons/md'
import { NavLink } from 'react-router-dom';

const UserDashboard = () => {
  

  return (
    


  <div className="p-8 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold text-purple-900 mb-8">
        Welcome, Employee!
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Completed Appraisals */}
        <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform">
          <FaCheckCircle className="text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Completed Appraisals</h3>
          <p className="text-3xl font-bold">3</p>
        </div>

        {/* Pending Reviews */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform">
          <MdPendingActions className="text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Pending Reviews</h3>
          <p className="text-3xl font-bold">1</p>
        </div>

        {/* Performance Score */}
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform">
          <FaChartLine className="text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Performance Score</h3>
          <p className="text-3xl font-bold">85%</p>
        </div>

        {/* Training Recommendations */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg shadow-lg p-6 text-white hover:scale-105 transition-transform">
          <FaGraduationCap className="text-3xl mb-2" />
          <h3 className="text-lg font-semibold">Training Recommendations</h3>
          <p className="text-3xl font-bold">2</p>
        </div>
      </div>

      {/* Goals & Recent Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Goals Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">My Goals</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:bg-gray-100 transition">
              <span className="text-gray-700">Complete Project A</span>
              <span className="text-sm text-blue-600">In Progress</span>
            </li>
            <li className="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:bg-gray-100 transition">
              <span className="text-gray-700">Leadership Training</span>
              <span className="text-sm text-green-600">Completed</span>
            </li>
          </ul>
        </div>

        {/* Recent Feedback Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            Recent Feedback
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:bg-gray-100 transition">
              <span className="text-gray-700">Positive feedback on leadership</span>
              <span className="text-sm text-green-500">1 week ago</span>
            </li>
            <li className="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:bg-gray-100 transition">
              <span className="text-gray-700">Communication improvement needed</span>
              <span className="text-sm text-yellow-500">2 weeks ago</span>
            </li>
          </ul>
        </div>
      </div> 
    </div>
 


 

  )
}

export default UserDashboard