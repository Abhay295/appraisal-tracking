import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../admin/AdminSidebar'

const AdminDashboardLayout = () => {
  return (
    <div className="flex ">
     <div className='fixed'>
     <AdminSidebar />
     </div>
      <div className="flex-1 sm:ml-0 md:ml-64 lg:ml-64 xl:ml-64 2xl:ml-64">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboardLayout