import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewMyAppraisals = () => {
  const [appraisals, setAppraisals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppraisals = async () => {
      const id = localStorage.getItem("id")
      try {
        const response = await axios.get(`/appraisal/${id}`);
        setAppraisals(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appraisals:", error);
        setLoading(false);
      }
    };

    fetchAppraisals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-blue-600">Loading Appraisals...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        My Appraisals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appraisals.map((appraisal) => (
          <div
            key={appraisal._id}
            className="bg-white border rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {appraisal.appraisalCycle}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(appraisal.startDate).toLocaleDateString()} -
              {new Date(appraisal.endDate).toLocaleDateString()}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                Overall Rating:
                <span
                  className={`font-bold ${
                    appraisal.overallRating == "Excellent"
                      ? "text-green-500"
                      : appraisal.overallRating == "Good"
                      ? "text-blue-500"
                      : appraisal.overallRating == "Average"
                      ? "text-yellow-500" :
                       "text-red-500"
                  }`}
                >
                  {appraisal.overallRating}
                </span>
              </div>
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  appraisal.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {appraisal.status}
              </span>
            </div>

            
          </div>
        ))}
      </div>

      {appraisals.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-8">
          No appraisals found.
        </div>
      )}
    </div>
  );
};

export default ViewMyAppraisals;
