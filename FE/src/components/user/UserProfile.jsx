import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const id = localStorage.getItem("id");
    try {
      const res = await axios.get(`/user/${id}`);
      setUser(res.data.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-gray-800">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {initials}
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <p className="font-semibold">Full Name:</p>
          <p>{user.firstName} {user.lastName}</p>

          <p className="font-semibold">Email:</p>
          <p>{user.email}</p>

          <p className="font-semibold">Contact:</p>
          <p>{user.contactNum || "N/A"}</p>

          <p className="font-semibold">Department:</p>
          <p>{user.departmentId.name || "N/A"}</p>

          <p className="font-semibold">Role:</p>
          <p>{user.roleId.name}</p>

          <p className="font-semibold">Joining Date:</p>
          <p>{new Date(user.dateOfJoining).toLocaleDateString('en-GB')}</p>
        </div>

       
      </div>
    </div>
  );
};

export default UserProfile;