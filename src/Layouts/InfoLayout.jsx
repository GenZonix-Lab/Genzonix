import React from 'react'
import { Outlet } from 'react-router'
import Header from '../portfolio/Header'
const InfoLayout = () => {
  return (
    <>
        <Header/>
        <Outlet />
    </>
  )
}

export default InfoLayout