import React from 'react'
import Login from './pages/auth/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Verify from './pages/modal/Verify'
import Dashboard from './pages/home/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/verify' element={<Verify />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}
