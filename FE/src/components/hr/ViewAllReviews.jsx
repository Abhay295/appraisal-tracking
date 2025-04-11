import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllReviews = () => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get("/review/all");
      setAllReviews(res.data.data);
    } catch (err) {
      console.error("Error fetching all reviews", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          📋 All Employee Reviews
        </h2>

        {allReviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReviews.map((rev, i) => (
              <div
                key={i}
                className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-700 font-semibold">
                    From: {rev.reviewerId?.firstName} {rev.reviewerId?.lastName}
                    <br />
                    To: {rev.employeeId?.firstName} {rev.employeeId?.lastName}
                  </div>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-bold">
                    ⭐ {rev.finalRating}/5
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Appraisal:</strong> {rev.appraisalId?.appraisalCycle}
                </p>

                <p className="text-sm mt-2">
                  <strong>Strengths:</strong> {rev.strengths}
                </p>
                <p className="text-sm">
                  <strong>Improvement:</strong> {rev.improvementAreas}
                </p>

                <p className="text-right text-xs text-gray-400 mt-2">
                  {new Date(rev.reviewDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllReviews;
  