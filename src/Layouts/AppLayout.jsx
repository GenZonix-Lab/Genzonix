import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Header from '../application/main/Header'
import Footer from '../application/main/Footer'
import Bottombar from '../application/main/Bottombar'
import { fetchAuthSession } from 'aws-amplify/auth'
const AppLayout = () => {
  const [cartTrig, setCartTrig] = useState(0)
  const navigate = useNavigate()
  const [ userLoading, setUserLoading] = useState(true);
  useEffect(()=>{
    const fetchuser = async()=>{
      try{
        const user=await fetchAuthSession();
        if(user?.userSub) {
          setUserLoading(false);
        }else {
          setUserLoading(true);
        }
      }
      catch(error){
        console.log(error)
        navigate("/Auth")
      }
    }
    fetchuser()
  },[])
  return (
    <>
        <Header cartTrig={cartTrig} userLoading={userLoading}/>
        <Outlet context={{ setCartTrig ,userLoading}}/>
        <Footer />
        {/* <Bottombar /> */}
    </>
  )
}

export default AppLayout