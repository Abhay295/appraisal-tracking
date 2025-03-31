import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserProfile from "./components/user/UserProfile";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import AddAppraisal from "./components/admin/AddAppraisal";
import axios from "axios";
import PrivateRoutes from "./hooks/PrivateRoutes";
import Loader from "./components/common/Loader";
import UserDashboard from "./components/user/UserDashboard";
import AdminDashboardLayout from "./components/layouts/AdminDashboardLayout";
import UserDashboardLayout from "./components/layouts/UserDashboardLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import Test from "./components/common/Test";
import ViewAllAppraisals from "./components/admin/ViewAllAppraisal";
import AddGoal from "./components/user/AddGoal";
import ViewGoals from "./components/user/ViewGoals";
import Reports from "./components/admin/Reports";
import ViewEmployeesProfile from "./components/admin/ViewEmployeesProfile";
import ViewAllGoals from "./components/admin/ViewAllGoals";
import ViewMyAppraisals from "./components/user/ViewMyAppraisals";
import ForgotPassword from "./components/common/ForgotPassword";
import ResetPassword from "./components/common/ResetPassword";
import UpdateProfile from "./components/user/UpdateProfile";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <div>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
        {/* <Route path="" element={<PrivateRoutes />}> */}
        <Route path="/user" element={<UserDashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />}/>
          <Route path="update" element={<UpdateProfile/>}/>
          <Route path="goals/add" element={<AddGoal />} />
          <Route path="goals/view" element={<ViewGoals />} />
          <Route path="appraisals" element={<ViewMyAppraisals />} />
        </Route>
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="appraisal/add" element={<AddAppraisal />} />
          <Route path="appraisal/view" element={<ViewAllAppraisals />} />
          <Route path="reports" element={<Reports />} />
          <Route path="goals" element={<ViewAllGoals />} />
          <Route path="employees" element={<ViewEmployeesProfile />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
