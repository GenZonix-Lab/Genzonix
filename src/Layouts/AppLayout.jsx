import React from 'react'
import { Outlet } from 'react-router'
import Header from '../application/main/Header'
import Footer from '../application/main/Footer'
import Bottombar from '../application/main/Bottombar'
const AppLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
        <Bottombar />
    </>
  )
}

export default AppLayout