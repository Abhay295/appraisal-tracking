import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaBars,
  FaTimes,
  FaUserCog,
  FaUserEdit,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoIosAddCircle, IoIosLogOut } from "react-icons/io";
import { GrFormView, GrDocumentPerformance } from "react-icons/gr";
import { MdTrackChanges } from "react-icons/md";

const HrSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAppraisalOpen, setIsAppraisalOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAppraisalRoute = location.pathname.startsWith("/hr/appraisal");

  useEffect(() => {
    if (!isAppraisalRoute) {
      setIsDropdownOpen(false);
    }
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden lg:hidden text-gray-700 fixed top-0 left-0 px-4 block bg-white w-full py-2 z-50"
          onClick={() => setIsOpen(true)}
        >
          <FaBars size={30} />
        </button>
      )}
      <aside
        className={` w-64 min-h-screen p-4 border-r fixed top-0 left-0  h-full transition-transform transform lg:block bg-gradient-to-b from-purple-600 to-indigo-700 text-white space-y-6 py-7 px-2 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">HR Panel</h2>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <ul>
          <li className="mb-2">
            <NavLink
              onClick={() => setIsAppraisalOpen(false)}
              to="/hr"
              className="block p-3  rounded hover:bg-purple-700 hover:text-white"
            >
              <div className="flex items-center">
                <RxDashboard className="mr-2" />
                Dashboard
              </div>
            </NavLink>
          </li>

          <li className="mb-2">
            <button
              onClick={() => setIsAppraisalOpen(!isAppraisalOpen)}
              className="flex w-full items-center justify-between p-3 rounded hover:bg-purple-700 hover:text-white"
            >
              <div className="flex items-center">
                <FaClipboardList className="mr-2" />
                Employee Appraisals
              </div>
            </button>
            {isAppraisalOpen && (
              <ul className="pl-6">
                <li>
                  <NavLink
                    to="/hr/appraisal/add"
                    className="block p-2 rounded hover:bg-purple-700 hover:text-white"
                  >
                    <div className="flex items-center">
                      <IoIosAddCircle size={20} className="mr-2" />
                      Add Appraisal
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/hr/appraisal/view"
                    className="block p-2 rounded hover:bg-purple-700 hover:text-white"
                  >
                    <div className="flex items-center">
                      <GrFormView size={30} className="mr-2" />
                      View Appraisals
                    </div>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="mb-2">
            <button
              onClick={() => setIsGoalOpen(!isGoalOpen)}
              className="flex w-full items-center justify-between p-3 rounded hover:bg-purple-700 hover:text-white"
            >
              <div className="flex items-center">
                <FaClipboardList className="mr-2" />
                Goal
              </div>
            </button>

            {isGoalOpen && (
              <ul className="pl-6">
                <li>
                  <NavLink
                    to="/hr/goals/add"
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
                    to="/hr/goals/view"
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

          <li className="mb-2">
            <NavLink
              onClick={() => setIsAppraisalOpen(false)}
              to="/hr/reports"
              className="block p-3 rounded hover:bg-purple-700 hover:text-white"
            >
              <div className="flex items-center">
                <GrDocumentPerformance className="mr-2" />
                Performance Reports
              </div>
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              onClick={() => setIsAppraisalOpen(false)}
              to="/hr/reviews"
              className="block p-3 rounded hover:bg-purple-700 hover:text-white"
            >
              <div className="flex items-center">
                <FaStar className="mr-2" />
                Reviews
              </div>
            </NavLink>
          </li>

          <li className="mb-2">
            <NavLink
              onClick={() => setIsAppraisalOpen(false)}
              to="/hr/employees"
              className="block p-3 rounded hover:bg-purple-700 hover:text-white"
            >
              <div className="flex items-center">
                <FaUserCog className="mr-2" />
                User Management
              </div>
            </NavLink>
          </li>
          <li className="mb-2">
            <div
              onClick={handleLogout}
              className="flex items-center p-3 rounded hover:bg-purple-700 hover:text-white transition"
            >
              <IoIosLogOut  className="mr-2" />
              Logout
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default HrSidebar;
