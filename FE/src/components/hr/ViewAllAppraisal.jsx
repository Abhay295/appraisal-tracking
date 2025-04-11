import React, { useEffect, useState } from "react";
import axios from "axios";

const AllAppraisals = () => {
  const [appraisals, setAppraisals] = useState([]);

  const fetchAppraisals = async () => {
    try {
      const res = await axios.get("/appraisal/all");
      setAppraisals(res.data.data);
    } catch (err) {
      console.error("Error fetching appraisals:", err);
    }
  };

  useEffect(() => {
    fetchAppraisals();
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const getRatingBadge = (rating) => {
    const base = "text-sm px-3 py-1 rounded-full font-medium";
    switch (rating) {
      case "Excellent":
        return `${base} bg-green-100 text-green-800`;
      case "Good":
        return `${base} bg-blue-100 text-blue-800`;
      case "Average":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "Needs Improvement":
        return `${base} bg-red-100 text-red-700`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          📋 All Appraisals
        </h2>

        {appraisals.length === 0 ? (
          <p className="text-center text-gray-600">No appraisals found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appraisals.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition duration-300"
              >
                <div className="space-y-2 text-sm text-gray-800">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-bold text-purple-800">
                      {item.userId.firstName} {item.userId.lastName}
                    </h3>
                    <span className={getRatingBadge(item.overallRating)}>
                      {item.overallRating}
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-600">Appraisal Cycle: </span>
                    {item.appraisalCycle}
                  </div>

                  <div>
                    <span className="font-semibold text-gray-600">Start Date: </span>
                    {formatDate(item.startDate)}
                  </div>

                  <div>
                    <span className="font-semibold text-gray-600">End Date: </span>
                    {formatDate(item.endDate)}
                  </div>

                  <div>
                    <span className="font-semibold text-gray-600">Percentage: </span>
                    <span className="text-purple-700 font-bold">{item.percentage}{item.percentage === "pending" ? "" : "%"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppraisals;
