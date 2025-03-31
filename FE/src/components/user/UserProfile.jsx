import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get("/user/" + userId);
        setProfileData(res.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle Update Profile Click
  const handleUpdateProfile = () => {
    navigate("/user/update"); // Redirect to the update profile page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-500">Error loading profile!</div>
      </div>
    );
  }
  return (
    

    <div className="flex items-center justify-center min-h-screen bg-gray-50">
       <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 border border-gray-200">
         <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
           My Profile
         </h2>

         {/* Profile Image */}
         <div className="flex justify-center mb-4">
           <img
            src={profileData.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover shadow-md"
          />
        </div>

        {/* User Details */}
        <div className="space-y-3 text-gray-600">
          {/* Full Name */}
          <div className="flex justify-between">
            <span className="font-semibold">Full Name:</span>
            <span>
              {profileData.firstName} {profileData.lastName}
            </span>
          </div>

          {/* Email */}
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{profileData.email}</span>
          </div>

          {/* Contact Number */}
          <div className="flex justify-between">
            <span className="font-semibold">Contact:</span>
            <span>{profileData.contactNum}</span>
          </div>

          {/* Department */}
          <div className="flex justify-between">
            <span className="font-semibold">Department:</span>
            <span>{profileData.departmentId.name || "N/A"}</span>
          </div>

          {/* Role */}
          <div className="flex justify-between">
            <span className="font-semibold">Role:</span>
            <span>{profileData.roleId.name || "N/A"}</span>
          </div>

          {/* Joining Date */}
          <div className="flex justify-between">
            <span className="font-semibold">Joining Date:</span>
            <span>
              {new Date(profileData.dateOfJoining).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>

  )
}

export default UserProfile