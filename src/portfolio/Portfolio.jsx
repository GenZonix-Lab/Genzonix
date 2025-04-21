import React from 'react'
import './portfolio.css'
import Header from './Header'
import Home from './Home'
import About from './About'
import Project from './Project'
import Skills from './Skills'
import Contact from './Contact'
import CircularMotion from './CircularMotion'
const Portfolio = () => {
  return (
    <>
        <div className="row justify-content-center">
          
          <div className="col-xl-6 order-2 order-xl-1"><Home /></div>
          <div className="AwsomeShapes col-xk-6 order-1 order-xl-2"></div>
        </div>
        <About/>
        <Skills/>
        <Project/>
        <Contact/>
        
        
    </>
  )
}

export default Portfolio