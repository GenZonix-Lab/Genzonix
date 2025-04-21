import React from 'react'
import {FaInstagram} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import resume from '../assets/AzeemAhamed.pdf'
import CircularMotion from './CircularMotion'

const Home = () => {
  return (
    <>
    <div className="container rounded-3 py-5" id="home">
        <div className="d-grid justify-content-center text-center text-xl-start justify-content-xl-start">
          
            <div className="title py-3 mt-5 pt-5"><h2>Hello, <span>I am</span><br />Azeem Ahamed</h2></div>
            <CircularMotion/>
            <div className="socialMedia p-2 px-xl-5 d-grid justify-content-xl-start text-center">
              <div className='d-flex justify-content-center '>
                <div className="text-center px-3"><NavLink to={"https://www.instagram.com/azeem.genzonix/"} target='blank'><FaInstagram /></NavLink></div>
                <div className="text-center px-3"><NavLink to={"https://www.linkedin.com/in/azeem-ahamed-genz/"} target='blank'><FaLinkedin /></NavLink></div>
              </div>
              <div className="cv py-3">
                <a href={resume} target="_blank" rel="noopener noreferrer">
                  <button className="send-btn p-3"><h5>Download CV</h5></button>
                </a>
              </div>
            </div>
        </div>
      </div>
      
    </>
  )
}

export default Home