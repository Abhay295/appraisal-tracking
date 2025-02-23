import { useState } from 'react'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import UserSidebar from './components/layouts/UserSidebar'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './components/user/UserProfile'
import Login from './components/common/Login'
import SignUp from './components/common/SignUp'
import AdminSidebar from './components/layouts/AdminSidebar'
import AddEmployee from './components/admin/AddEmployee'

function App() {  
  return (
    <div className='class="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open"'>
    <div className='app-wrapper'>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user' element={<UserSidebar/>}>
        <Route path='profile' element={<UserProfile/>}/>
        </Route>
        <Route path='/admin' element={<AdminSidebar/>}>
        <Route path='addemployee' element={<AddEmployee/>}></Route>
        </Route>
      </Routes>
    </div>
    </div>
  )
}

export default App
