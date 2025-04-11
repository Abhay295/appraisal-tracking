import React from 'react'
import { Outlet } from 'react-router-dom'
import HrSidebar from '../hr/HrSidebar'

const HrDashboardLayout = () => {
  return (
    <div className="flex ">
     <div className='fixed'>
     <HrSidebar />
     </div>
      <div className="flex-1 sm:ml-0 md:ml-64 lg:ml-64 xl:ml-64 2xl:ml-64">
        <Outlet />
      </div>
    </div>
  )
}

export default HrDashboardLayout