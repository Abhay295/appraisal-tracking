import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {

    const [reports, setReports] = useState([]);

  // Fetch performance reports from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("/appraisal/all"); // Update with correct API endpoint
        setReports(response.data.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">
        📊 Performance Reports
      </h2>

      {/* Report Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-inner">
          <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <tr>
              <th className="text-left p-3 font-semibold">Employee Name</th>
              <th className="text-left p-3 font-semibold">Department</th>
              <th className="text-left p-3 font-semibold">Appraisal Cycle</th>
              <th className="text-left p-3 font-semibold">Overall Rating</th>
              <th className="text-left p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 p-4 italic"
                >
                  No reports found. 📉
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  className="hover:bg-gray-100 transition-all"
                >
                  <td className="p-3 border-b border-gray-200">
                    {report.userId.firstName} {report.userId.lastName}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {report.userId.departmentId.name}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {report.appraisalCycle}
                  </td>
                  <td
                    className={`p-3 border-b border-gray-200 font-bold ${
                      report.overallRating == "Excellent" ? "text-green-600" :
                      report.overallRating == "Good" ? "text-blue-600" : 
                      report.overallRating == "Average" ? "text-yellow-500" : 
                      report.overallRating == "Needs Improvement" ? "text-red-500":""
                    }`}
                  >
                    {report.overallRating}
                  </td>
                  <td
                    className={`p-3 border-b border-gray-200 font-semibold ${
                      report.percentage === "pending"
                        ? "text-yellow-600"
                        : "text-green-500"
                    }`}
                  >
                    {report.percentage === "pending" ? "pending" : "completed"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Reports