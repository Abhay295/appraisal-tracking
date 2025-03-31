import axios from "axios";
import { useEffect, useState } from "react";


const ViewGoals = () => {
    const [goals, setGoals] = useState([]);

    // Fetch all goals from API
    useEffect(() => {
      const fetchGoals = async () => {
        const id = localStorage.getItem("id")
        try {
          const response = await axios.get(`/goals/${id}`); // Replace with your endpoint
          setGoals(response.data.data);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      };
  
      fetchGoals();
    }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">
          📈 View All Goals
        </h2>

        {/* Goal Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-inner">
            <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <tr>
                <th className="text-left p-3 font-semibold">Goal Name</th>
                <th className="text-left p-3 font-semibold">Description</th>
                <th className="text-left p-3 font-semibold">Start Date</th>
                <th className="text-left p-3 font-semibold">End Date</th>
                <th className="text-left p-3 font-semibold">Progress</th>
                <th className="text-left p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {goals.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 p-4 italic"
                  >
                    No goals found. 🚫
                  </td>
                </tr>
              ) : (
                goals.map((goal) => (
                  <tr
                    key={goal._id}
                    className="hover:bg-gray-100 transition-all"
                  >
                    <td className="p-3 border-b border-gray-200">
                      {goal.goalName}
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      {goal.goalDescription}
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      {new Date(goal.startDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b border-gray-200">
                    {new Date(goal.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 border-b border-gray-200">
                      {goal.progress}%
                    </td>
                    <td
                      className={`p-3 border-b border-gray-200 font-semibold ${
                        goal.status === "Completed"
                          ? "text-green-600"
                          : goal.status === "In Progress"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {goal.status}
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

export default ViewGoals