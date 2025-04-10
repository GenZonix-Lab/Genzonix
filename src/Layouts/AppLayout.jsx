import React from 'react'
import { Outlet } from 'react-router'
import NavigationHeader from '../application/NavigationHeader'
import Footer from '../application/Footer'

const AppLayout = () => {
  return (
    <>
        <NavigationHeader/>
        <Outlet />
        <Footer />
    </>
  )
}

export default AppLayout