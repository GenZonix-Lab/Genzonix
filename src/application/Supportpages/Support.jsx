import React from 'react'
import { NavLink } from 'react-router-dom';
import {FaInstagram} from "react-icons/fa";
import {FaLinkedin } from "react-icons/fa6";
import ScrollToTop from '../../Components/ScrollToTop'
const Support = () => {
  return (
    <>
    <div className='container py-3'>
      <div className="mt-2 f-graduate"><h2>Support Team</h2></div>
      <div className='text-muted'><p>Support At Genzonix, we are committed to providing you with the best support for your DIY kits and projects. Whether you have questions about setting up your IoT devices, troubleshooting issues, or need guidance on cloud and AI computer vision projects, we’re here to help!</p></div>
      <div className="mt-4 f-graduate"><h2>Contact Support</h2></div>
      <div><p>If you need assistance, feel free to reach out to our support team. We are available to answer your queries and resolve issues as quickly as possible.</p></div>
      <ul className="list-group">
        <li className="list-group-item list-group-item-primary"><strong>Support Hours:</strong><samp> Saturday to Thursday, 10:00 AM to 6:00 PM IST</samp></li>
        <li className="list-group-item list-group-item-primary" typeof='ma'><strong>Email:</strong><samp> support@genzonix.in</samp></li>
        <li className="list-group-item list-group-item-primary"><strong>Phone:</strong><samp> +91 9487048924</samp></li>
      </ul>
      <div className="mt-4 f-graduate"><h2>Frequently Asked Questions (FAQs)</h2></div>
      <div className='p-3'>
        <p>Before reaching out, check our FAQ section for quick answers to common queries. We have compiled guides on product setup, troubleshooting steps, and best practices for using our DIY kits.</p>
        <div><button className='btn btn-default p-2'><ScrollToTop /><NavLink to={'/faq'}>Visit our FAQ Page</NavLink></button></div>
      </div>
      <div className="mt-4 f-graduate"><h2>Community Support</h2></div>
      <div className="p-3">
        <p>Join our growing community of makers and tech enthusiasts! Share your projects, ask for advice, and collaborate with like-minded individuals.</p>
        <p>Follow us on<button className='btn btn-link pb-1'><ScrollToTop /><NavLink to={"https://www.instagram.com/genzonix/"} target='blank'> <FaInstagram/> Instagram</NavLink></button>, and  <button className='btn btn-link pb-1'><NavLink to={"http://www.linkedin.com/in/genzonix"} target='blank'> <FaLinkedin/> LinkedIn</NavLink></button> for updates and discussions.</p>
      </div>

      <div className="mt-4 f-graduate"><h2>Warranty & Returns</h2></div>
      <div className='mt-2 p-3'>      
        <p>We stand by the quality of our products. If you experience any issues with your kit, check our warranty and return policies.</p>
        <p><button className='btn btn-link p-1'><ScrollToTop /><NavLink to={"/policy"}> Read Warranty & Returns Policy</NavLink></button></p>
      </div>
      <div className="mt-4">
        <p className="mt-4">If you need further assistance, don’t hesitate to contact us. We’re here to support you at every step of your learning journey!</p>
      </div>
    </div>
    </>
  )
}

export default Support