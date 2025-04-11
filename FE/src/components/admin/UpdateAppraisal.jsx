
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateAppraisal = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [percentage, setPercentage] = useState('');


// const id = useParams().userId

  // 🔁 Fetch all appraisals from API
  const fetchAppraisals = async () => {
    try {
      const res = await axios.get('/appraisal/all');
    //   console.log(res.data.data);
      
      setData(res.data.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
 
  useEffect(() => {
    fetchAppraisals();
  }, []);

  const openModal = (emp) => {
    setSelectedEmp(emp);
    setPercentage(emp.percentage || ''); // set default value if available
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/appraisal/update/${selectedEmp?._id}`, {
        percentage,
      });
      
      setModalOpen(false);
      setSelectedEmp(null);
      fetchAppraisals(); // refresh table
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">View All Appraisals</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-purple-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Cycle</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">%</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{emp.userId.firstName}</td>
                  <td className="px-4 py-2">{emp.userId.lastName}</td>
                  <td className="px-4 py-2">{emp.appraisalCycle}</td>
                  <td className="px-4 py-2">{emp.startDate}</td>
                  <td className="px-4 py-2">{emp.endDate}</td>
                  <td className="px-4 py-2">{emp.overallRating}</td>
                  <td className="px-4 py-2 text-purple-600 font-medium">{emp.percentage || '-'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(emp)}
                      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Update Percentage</h2>
            <p className="mb-2 text-sm text-gray-600">
              Employee: <span className="font-medium">{selectedEmp?.userId.firstName} {selectedEmp?.userId.lastName}</span>
            </p>
            <input
              type="number"
              placeholder="Enter %"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-purple-400 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAppraisal;
