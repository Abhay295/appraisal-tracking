import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewEmployeesProfile = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch all employee data
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/alluser");
      console.log(response.data.data);
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    //   <div className="p-6 bg-white rounded-lg shadow-lg">
    //   <h2 className="text-2xl font-bold text-purple-900 mb-4">Employee Profiles</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     {employees.map((employee) => (
    //       <div key={employee.id} className="border p-4 rounded-lg bg-gray-50">
    //         <h3 className="text-lg font-semibold">{`${employee.firstName} ${employee.lastName}`}</h3>
    //         <p className="text-sm text-gray-600">Role: {employee.roleId.name}</p>
    //         <p className="text-sm text-gray-600">Department: {employee.departmentId.name}</p>
    //         <p className="text-sm text-gray-600">Joined: {employee.dateOfJoining}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    // <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    //   <h2 className="text-3xl font-bold text-purple-800 mb-6">
    //     👤 employee Profile
    //   </h2>

    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     {/* employee Details */}
    //     <div className="space-y-4">
    //       <div>
    //         <p className="text-gray-600">Full Name</p>
    //         <p className="text-lg font-semibold text-gray-800">
    //           {employee.firstName} {employee.lastName}
    //         </p>
    //       </div>

    //       <div>
    //         <p className="text-gray-600">Email</p>
    //         <p className="text-lg font-semibold text-gray-800">{employee.email}</p>
    //       </div>

    //       <div>
    //         <p className="text-gray-600">Contact Number</p>
    //         <p className="text-lg font-semibold text-gray-800">
    //           {employee.contactNum || "N/A"}
    //         </p>
    //       </div>

    //       <div>
    //         <p className="text-gray-600">Gender</p>
    //         <p className="text-lg font-semibold text-gray-800">
    //           {employee.gender || "Not specified"}
    //         </p>
    //       </div>
    //     </div>

    //     {/* Role & Department */}
    //     <div className="space-y-4">
    //       <div>
    //         <p className="text-gray-600">Role</p>
    //         <p className="text-lg font-semibold text-gray-800">
    //           {employee.roleId?.name || "N/A"}
    //         </p>
    //       </div>

    //       <div>
    //         <p className="text-gray-600">Department</p>
    //         <p className="text-lg font-semibold text-gray-800">
    //           {employee.departmentId?.name || "N/A"}
    //         </p>
    //       </div>

    //       <div>
    //         <p className="text-gray-600">Date of Joining</p>
    //         <p className="text-lg font-semibold text-gray-800">
    //           {new Date(employee.dateOfJoining).toLocaleDateString()}
    //         </p>
    //       </div>

    //       <div>
    //         <p className="text-gray-600">Status</p>
    //         <span
    //           className={`px-3 py-1 rounded-full text-white text-sm ${
    //             employee.isActive ? "bg-green-500" : "bg-red-500"
    //           }`}
    //         >
    //           {employee.isActive ? "Active" : "Inactive"}
    //         </span>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Action Buttons */}
    //   <div className="flex justify-end space-x-4 mt-8">
    //     <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    //       ✏️ Edit Profile
    //     </button>
    //     <button
    //       className={`${
    //         employee.isActive
    //           ? "bg-red-500 hover:bg-red-600"
    //           : "bg-green-500 hover:bg-green-600"
    //       } text-white px-4 py-2 rounded`}
    //     >
    //       {employee.isActive ? "Deactivate" : "Activate"}
    //     </button>
    //   </div>
    // </div>
    <>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">
          👤 employee Profile
        </h2>
        {employees?.map((employee) => {
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Full Name</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.firstName} {employee.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Contact Number</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.contactNum || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.gender || "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Role</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.roleId?.name || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Department</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {employee.departmentId?.name || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Date of Joining</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(employee.dateOfJoining).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Status</p>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        employee.status ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {employee.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  ✏️ Edit Profile
                </button>
                <button
                  className={`${
                    employee.status
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white px-4 py-2 rounded`}
                >
                  {employee.status ? "Deactivate" : "Activate"}
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ViewEmployeesProfile;
