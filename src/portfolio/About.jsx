import React from 'react'
import DP from '../assets/1722709029739.jpg'
const About = () => {
  return (
    <div id='About'>
           <div className="container my-5 p-4" id='about'>
           <div className="title text-center"><h1>About <span>Me</span></h1></div>
           <div className="about-me">
           <div className="row">
           <div className='col-xl-4 col-lg-4 col-md-5 text-center Display-pic'>
                <img 
                    src={DP} 
                    alt="Display picture"
                    title='Azeem Ahamed'
                    className='rounded'
                    />
            </div>
            <div className="col-xl-8 col-lg-8 col-md-7 col-12 col pt-xl-3">
              <p>Hi, I’m Azeem Ahamed, a passionate and innovative problem solver with a love for technology and engineering. I specialize in creating impactful projects at the intersection of robotics, IoT, and software development. With a background in STEM education and hands-on experience with tools like the ESP32, AWS services, and AI models, I aim to design solutions that make everyday life easier and more efficient.</p>
              <p>Currently, I am building a brand around DIY kits that empower others to explore the world of technology, from IoT and cloud computing to AI. Alongside this, I teach robotics at Robolix, where I help young minds develop practical skills that will shape the future.</p>
              <p>I believe in continuous learning and always seek new challenges to improve my craft. Whether it's a project that requires creativity, technical knowledge, or teamwork, I thrive in environments that push boundaries.</p>
              <p>Feel free to browse through my work, and if you'd like to collaborate or discuss ideas, don’t hesitate to reach out!</p>
            </div>
            </div>
           </div>
           </div>
    </div>
  )
}

export default About