import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiUsers } from "react-icons/hi";
import { MdAssignment } from "react-icons/md";
import { FaBullseye } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

const HrDashboard = () => {
  const [users, setUsers] = useState([]);
  const [appraisals, setAppraisals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchHRData();
  }, []);

  const fetchHRData = async () => {
    try {
      const [usersRes, appraisalsRes, goalsRes, reviewsRes] = await Promise.all([
        axios.get("/alluser"),
        axios.get("/appraisal/all"),
        axios.get("/goals/all"),
        axios.get("/review/all"),
      ]);

      setUsers(usersRes.data.data || []);
      setAppraisals(appraisalsRes.data.data || []);
      setGoals(goalsRes.data.data || []);
      setReviews(reviewsRes.data.data || []);
    } catch (err) {
      console.error("Error loading HR dashboard:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          HR Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Employees"
            value={users.length}
            icon={<HiUsers className="text-3xl text-blue-600" />}
            bg="bg-blue-50"
          />
          <SummaryCard
            title="Appraisals"
            value={appraisals.length}
            icon={<MdAssignment className="text-3xl text-green-600" />}
            bg="bg-green-50"
          />
          <SummaryCard
            title="Goals"
            value={goals.length}
            icon={<FaBullseye className="text-3xl text-purple-600" />}
            bg="bg-purple-50"
          />
          <SummaryCard
            title="Reviews"
            value={reviews.length}
            icon={<BiMessageDetail className="text-3xl text-pink-600" />}
            bg="bg-pink-50"
          />
        </div>

        {/* Recent Appraisals */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            Recent Appraisals
          </h2>

          {appraisals.length === 0 ? (
            <p className="text-gray-500">No appraisals found.</p>
          ) : (
            <div className="space-y-4">
              {appraisals
                .slice(-5)
                .reverse()
                .map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-200 p-4 rounded-md flex justify-between items-center hover:shadow-sm transition"
                  >
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {item.userId?.firstName} {item.userId?.lastName}
                      </h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <AiOutlineCalendar /> {item.appraisalCycle} •{" "}
                        {formatDate(item.startDate)} - {formatDate(item.endDate)}
                      </p>
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                      {item.overallRating || "Pending"}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 💼 Summary Card Component
const SummaryCard = ({ title, value, icon, bg }) => (
  <div className={`rounded-xl p-6 shadow-md hover:shadow-lg transition ${bg}`}>
    <div className="flex items-center gap-4">
      {icon}
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
      </div>
    </div>
  </div>
);

// 🗓 Format Date
const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

export default HrDashboard;
