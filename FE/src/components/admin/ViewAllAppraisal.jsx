import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllAppraisals = () => {
  const [appraisals, setAppraisals] = useState([]);

  // Fetch Appraisals
  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        const response = await axios.get("/appraisal/all"); // Update with correct API
        setAppraisals(response.data.data);
      } catch (error) {
        console.error("Error fetching appraisals:", error);
      }
    };
    fetchAppraisals();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        View All Appraisals
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Appraisal Cycle</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Overall Rating</th>
            </tr>
          </thead>
          <tbody>
            {appraisals.map((appraisal, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-all border-b"
              >
                <td className="py-3 px-4">{appraisal?.userId.firstName || "N/A"}</td>
                <td className="py-3 px-4">{appraisal?.userId.lastName || "N/A"}</td>
                <td className="py-3 px-4">
                  {appraisal?.appraisalCycle || "N/A"}
                </td>
                <td className="py-3 px-4">{appraisal?.startDate || "N/A"}</td>
                <td className="py-3 px-4">{appraisal?.endDate || "N/A"}</td>
                <td className="py-3 px-4">
                  {appraisal?.overallRating || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllAppraisals;
