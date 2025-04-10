import React from 'react'
import child_pic from '../assets/child_pic.avif'

const Story = () => {
    const head2_data = [
        "At Genzonix, we empower the next generation of innovators through hands-on STEM learning. Our DIY kits and solutions in robotics, AI, Cloud, and IoT bridge the gap between theory and practice, making advanced technology accessible to students, educators, and hobbyists.",
        "We focus on fostering creativity and problem-solving through experiential learning, equipping users with the tools to bring their ideas to life. Genzonix is dedicated to shaping future thinkers by promoting education, innovation, and exploration in a technology-driven world.",
    ]

  return (
    <div className="story">
        <div className="title text-center">
            <h2>Empowering Innovators: The Genzonix Story</h2>
        </div>
            <div className="row">
                <div className='child-img order-lg-2 order-1 col-lg-4 col-12 text-center p-3'>
                <img 
                    src={child_pic}
                    alt="child" 
                    title="child" 
                />
            </div>
            <div className="story-data order-lg-1 order-2 col-lg-8 col-12">
                <h2>{head2_data[0]}</h2>
                <h2>{head2_data[1]}</h2>
            </div>
            </div>
            
        </div>


  )
}

export default Story