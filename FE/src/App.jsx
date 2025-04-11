import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserProfile from "./components/user/UserProfile";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import AddAppraisal from "./components/hr/AddAppraisal";
import axios from "axios";
import PrivateRoutes from "./hooks/PrivateRoutes";
import Loader from "./components/common/Loader";
import UserDashboard from "./components/user/UserDashboard";
import AdminDashboardLayout from "./components/layouts/AdminDashboardLayout";
import UserDashboardLayout from "./components/layouts/UserDashboardLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import Test from "./components/common/Test";
import ViewAllAppraisals from "./components/hr/ViewAllAppraisal";
import AddGoal from "./components/hr/AddGoal";
import ViewGoals from "./components/user/ViewGoals";
import Reports from "./components/hr/Reports";
import ViewEmployeesProfile from "./components/hr/ViewEmployeesProfile";
import ViewAllGoals from "./components/hr/ViewAllGoals";
import ViewMyAppraisals from "./components/user/ViewMyAppraisals";
import ForgotPassword from "./components/common/ForgotPassword";
import ResetPassword from "./components/common/ResetPassword";
import HrDashboardLayout from "./components/layouts/HrDashboardLayout";
import HrDashboard from "./components/hr/HrDashboard";
import UpdateAppraisal from "./components/admin/UpdateAppraisal";
import UserReview from "./components/user/UserReview";
import ViewAllReviews from "./components/hr/ViewAllReviews";
import LandingPage from "./components/common/Landing";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/test" element={<Test />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
        <Route path="" element={<PrivateRoutes />}>
        <Route path="/user" element={<UserDashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />}/>
          <Route path="goals" element={<ViewGoals />} />
          <Route path="review" element={<UserReview />} />
          <Route path="appraisals" element={<ViewMyAppraisals />} />
        </Route>

        <Route path="/hr" element={<HrDashboardLayout />}>
          <Route index element={<HrDashboard />} />
          <Route path="employees" element={<ViewEmployeesProfile />} />
          <Route path="appraisal/add" element={<AddAppraisal />} />
          <Route path="appraisal/view" element={<ViewAllAppraisals />} />
            <Route path="goals/add" element={<AddGoal />} />
          <Route path="goals/view" element={<ViewAllGoals />} />
          <Route path="reviews" element={<ViewAllReviews />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="appraisal/update" element={<UpdateAppraisal />} />
          <Route path="reports" element={<Reports />} />
          <Route path="goals" element={<ViewAllGoals />} />

        </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
