import React from 'react'
import ai from '../assets/AI_pic.jpg'
import cloud from '../assets/cloud_pic.jpg'
import iot from '../assets/Box components.png'

const InnovationKit = () => {

    //slide3_content
    const slide3_h1="DIY IoT"
    const slide3_h2="AI Computer Vision"
    const slide3_h3="Cloud Projects"
    const slide3_p1="Create smart, connected devices with easy-to-build projects that teach the fundamentals of wireless control and sensor integration, ideal for smart home and automation applications."
    const slide3_p2="Dive into image and video analysis with beginner-friendly Python projects that bring real-world AI applications, like object detection and facial recognition, within reach."
    const slide3_p3="Gain hands-on experience with essential cloud tools, learning how to store, process, and deploy data seamlessly using popular cloud platforms."

  return (

    <div className='kit my-5'>
        <div className="container">
        <div className="title text-center mt-2">
            <h2>DIY INNOVATIVE</h2> 
        </div>
        <section className="row text-center">
            <div className="box col-sm-12 col-lg-4 p-1">
                <img 
                    src={iot} 
                    className='p-1 m-3'
                    alt="IoT" 
                    title="IoT kit box" 
                />
                <div>
                    <h2>{slide3_h1}</h2>
                    <p>{slide3_p1}</p>
                </div>
            </div>
            <div className="box col-sm-12 col-lg-4 p-1">
                <img 
                    src={ai} 
                    className='p-1 mt-3'
                    alt="AI" 
                    title="AI kit box" 
                />
                <div>
                    <h2>{slide3_h2}</h2>
                    <p>{slide3_p2}</p>
                </div>
            </div>
            <div className="box col-sm-12 col-lg-4 p-1">
                <img 
                    src={cloud} 
                    className='p-1  mt-3'
                    alt="Cloud" 
                    title="Cloud kit box" 
                />
                <div>
                    <h2>{slide3_h3}</h2>
                    <p>{slide3_p3}</p>
                </div>
            </div>
        </section>

        </div>
    </div>
  )
}

export default InnovationKit
