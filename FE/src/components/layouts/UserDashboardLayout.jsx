import React from 'react'
import UserSidebar from '../user/UserSidebar'
import { Outlet } from 'react-router-dom'

const UserDashboardLayout = () => {
  return (
    <div className="flex">
      <UserSidebar/>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default UserDashboardLayout