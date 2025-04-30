import React from 'react'
import objid from '../assets/ObjectIdentification.webp'
import SelfBalancingRobot from '../assets/SelfBalancingRobot.webp'
import HomeAutomation from '../assets/Home Automation.webp'
import IndustrialAnalytics from '../assets/IndustrialAnalytics.webp'
import DroneAutomation from '../assets/DroneAutomation.webp'
import ChatBot from '../assets/ChatBot.webp'


const Project = () => {
  const projects = [{ 
    name:"Object Identification", 
    images: objid,
    videoSample:"",
    Description:"This project is a simple object identification system using YOLOv9 and OpenCV. It can identify objects in real-time using a webcam or a video file. The project uses Python and OpenCV to process the video stream and identify objects using the YOLOv9 model. The project can be used for various applications such as security, surveillance, and object tracking.",
    toolsUsed:"Python, OpenCV, YOLOv9",
  },{
    name: "Home Automation [Alexa]",
    images: HomeAutomation,
    videoSample:"",
    Description:"",
    toolsUsed:"",
  }, {
    name: "Chat bot",
    images:ChatBot,
    videoSample:"",
    Description:"",
    toolsUsed:"",
  },{
    name: "Self Balancing Robot", 
    images: SelfBalancingRobot,
    videoSample:"",
    Description:"",
    toolsUsed:"",
  },{
    name: "Industrial Analytics", 
    images:IndustrialAnalytics,
    videoSample:"",
    Description:"",
    toolsUsed:"",
  },{
    name: "Drone Automation", 
    images:DroneAutomation,
    videoSample:"",
    Description:"",
    toolsUsed:"",
  }
]
return (
<>   
    <div className="container rounded-3 p-5 mt-5" id="projects">
    <div className="title text-center"><h2>Latest <span>Projects</span></h2></div>
    <div className="projects row g-2 px-1 mt-2">
    {projects.map((proj) => 
      <div className="col-xl-4 col-md-6 col-12" key={proj.name}>
        <div className="projSet rounded-3 px-3 mt-2">
          <div className="title text-center"> <h4>{proj.name}</h4></div>
          <div className="body">
            <img 
              src={proj.images} 
              alt={proj.name} 
              className='text-center rounded'
              />
          </div>
        </div>
      </div>
    )}
    </div>
    </div>
</>
  )
}

export default Project