import React from 'react'
import { Outlet } from 'react-router'
import Header from '../application/main/Header'
import Footer from '../application/main/Footer'

const AppLayout = () => {
  return (
    <>
        <Header/>
        <Outlet />
        <Footer />
    </>
  )
}

export default AppLayout