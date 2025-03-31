import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTimes,
  FaUser,
  FaClipboardList,
  FaChartLine,
  FaTasks,
  FaBars,
  FaUserCircle,
  FaStar,
  FaGraduationCap,
  FaBell,
} from "react-icons/fa";
import { MdDashboard, MdOutlineDateRange } from "react-icons/md";
import { IoIosAddCircle, IoIosLogOut } from "react-icons/io";
import { GrFormView } from "react-icons/gr";

const UserSidebar = () => {
  
    const [isAppraisalOpen, setIsAppraisalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      {!isOpen && (
        <button
          className="md:hidden text-gray-700 fixed top-4 left-4 z-50"
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={30} />
        </button>
      )}

      {/* Sidebar Content */}
      <aside
        className={`bg-gradient-to-b from-purple-600 to-indigo-600 w-64 min-h-screen p-4 text-white border-r fixed top-0 left-0 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Employee Panel</h2>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <ul>
          <li className="mb-2">
            <NavLink
              to="/user"
              className="flex items-center p-3 rounded hover:bg-white hover:text-purple-500 transition"
            >
              <MdDashboard className="mr-2" />
              Dashboard
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              to="/user/profile"
              className="flex items-center p-3 rounded hover:bg-white hover:text-purple-500 transition"
            >
              <FaUserCircle className="mr-2" />
              Profile
            </NavLink>
          </li>


          <li className="mb-2">
            <button
              onClick={() => setIsAppraisalOpen(!isAppraisalOpen)}
              className="flex w-full items-center justify-between p-3 rounded hover:bg-purple-700 hover:text-white"
            >
              <div className="flex items-center">
                <FaClipboardList className="mr-2" />
                Goal
              </div>
            </button>
            {isAppraisalOpen && (
              <ul className="pl-6">
                <li>
                  <NavLink
                    to="/user/goals/add"
                    className="block p-2 rounded hover:bg-purple-700 hover:text-white"
                  >
                    <div className="flex items-center">
                      <IoIosAddCircle size={20} className="mr-2" />
                      Add Goal
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/goals/view"
                    className="block p-2 rounded hover:bg-purple-700 hover:text-white"
                  >
                    <div className="flex items-center">
                      <GrFormView size={30} className="mr-2" />
                      View Goals
                    </div>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

            {/* end Here */}

          <li className="mb-2">
            <NavLink
              to="/user/appraisals"
              className="flex items-center p-3 rounded hover:bg-white hover:text-purple-500 transition"
            >
              <FaClipboardList className="mr-2" />
              Appraisals
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              to="/user/reports"
              className="flex items-center p-3 rounded hover:bg-white hover:text-purple-500 transition"
            >
              <FaChartLine className="mr-2" />
              Reports
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              to="/user/review"
              className="flex items-center p-3 rounded hover:bg-white hover:text-purple-500 transition"
            >
              <FaStar className="mr-2" />
              Review
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              to="/user/training"
              className="flex items-center p-3 rounded hover:bg-white hover:text-purple-500 transition"
            >
              <FaGraduationCap className="mr-2" />
              Training
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default UserSidebar;
