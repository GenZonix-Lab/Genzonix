import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Particles from './Particles';
import boxCloud from '../../assets/pic2.webp';
import child_pic from '../../assets/child_pic.webp'
import ai from '../../assets/AI_pic.webp'
import cloud from '../../assets/cloud_pic.webp'
import iot from '../../assets/iotKit.webp'
import robotics from '../../assets/roboticsKit.webp'
import handson from '../../assets/handsonLearning.webp'
import expert from '../../assets/expert.webp'
import quality from '../../assets/kit_demo.webp'
import InitialProgress from './InitialProgress';
import NotifyForm from './NotifyForm'
import NotifyWA from "./NotifyWA";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const Home = () => {
  const navigate = useNavigate()
  // Content data
  const contents = [
    {
      id:'Explore',
      title:'Innovative Kits for a Smarter Generation',
      button:'Explore',
      image:boxCloud,
      state:true
    },
    {
      id:"formation",
      title:"Idea to Reality: Genzonix Formation Process",
      state:false
    },
    {
      id:"story",
      title:"Empowering Innovators:The Genzonix Story",
      image:child_pic,
      description: [
        "At Genzonix, we empower the next generation of innovators through hands-on STEM learning.",
        "Our DIY kits and solutions in robotics, AI, Cloud, and IoT bridge the gap between theory and practice, making advanced technology accessible to students, educators, and hobbyists." ,
        "We focus on fostering creativity and problem-solving through experiential learning, equipping users with the tools to bring their ideas to life.",
        "Genzonix is dedicated to shaping future thinkers by promoting education, innovation, and exploration in a technology-driven world."
      ],
      state:true 
    },
    {
      id:'innovation',
      title:'DIY INNOVATIVE KITS',
      specification:[
        {
          id:"iot",
          title:"Smart Connectivity Kit",
          description:"Build smart, connected devices using sensors, microcontrollers, and wireless communication to explore Internet of Things innovations practically.",
          image:iot
        },
        {
          id:"ai",
          title:"VisionAIX",
          description:"Learn artificial intelligence techniques to teach computers recognizing, analyzing, and interpreting visual data for automation, security, and smart applications",
          image:ai
        },
        {
          id:"robotics",
          title:"RoboQuest",
          description:"Design, program, and control intelligent robots integrating sensors, motors, and algorithms to solve problems, automate tasks, and inspire creativity.",
          image:robotics
        },
        {
          id:"cloud",
          title:"SkyCompute",
          description:"Explore scalable cloud computing technologies for deploying applications, managing data, and learning services like AWS, Azure, and Google Cloud.",
          image:cloud
        }
      ],
      state:false
    },
    {
      id:'exploration',
      title:'Why Genzonix?',
      specification:[
        {
          id:"handsonLearning",
          title:"Innovative, Hands-On Learning Kits",
          description:"Genzonix offers high-quality STEM and IoT DIY kits designed to engage learners through hands-on activities. Each kit fosters creativity, problem-solving, and technical skills, making learning practical and fun for all ages.",
          image:handson
        },
        {
          id:"expertConsulting",
          title:"Expert Support & Resources",
          description:"Genzonix provides easy-to-follow guides, tutorials, and customer support, ensuring even beginners can dive into STEM projects confidently. We aim to make tech learning accessible and enjoyable, regardless of experience level.",
          image:expert
        },
        {
          id:"quality",
          title:"Affordable & Curated for Value",
          description:"Our kits are competitively priced, balancing affordability with quality. We thoughtfully curate each kit to include essential components, giving customers a comprehensive, high-value experience without breaking the bank.",
          image:quality
        }
      ],
      state:true
    }
  ]


  const handleKit=(data)=>{
    if(data==="iot" || data ==="robotics" || data ==="ai"){
      navigate("/")
    }else if(data === "cloud"){
      navigate("/")
    }
  }


  return (
    <>
    <div style={{position: 'absolute',zIndex: 1 }} className="vh-100 w-100">
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={500}
        particleSpread={15}
        speed={0.05}
        particleBaseSize={150}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />
    </div>
    {contents.map((element)=>(
        <motion.div 
          key={element.id}
          id={element.id}
          initial={element.id==="Explore"?{ opacity: 0, y: 40 }:"hidden"} 
          animate={element.id==="Explore"?{ opacity: 1, y: 0 }:null} 
          transition={element.id==="Explore"?{ duration: 0.8 }:null}
          whileInView={element.id==="Explore" ? null : "visible"}
          viewport={element.id==="Explore" ? null : { once: true }}
          variants={element.id==="Explore" ? null : {fadeInUp}}
        >
          <div className={`text-center ${element.state ?'bg-default color-default' :'bg-negative color-negative'}`} title={element.title} aria-label={element.title} id={`#${element.id}`}>
            <div className="container-lg py-3">
              <div className="title mt-5 py-3">{element.id==="Explore" ? <h1>{element?.title}</h1> : <h2>{element?.title}</h2> }</div>
              <div>
                {element.id==="formation" ?<div><InitialProgress/><NotifyForm/></div>:null}</div>
              <button 
                type="button" 
                style={{ zIndex: 2, position: 'relative' }}
                className={element.button?'Explore_btn rounded p-3 m-1':'d-none'}
                onClick={() => document.getElementById('formation')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {element?.button}
              </button>
              <div className={element.id==="Explore"?"my-3 py-4 ":element.id === "story"?"row justify-content-center":"d-none"}>
                  <div className={element.id === "story"?'order-md-2 order-1 col col-md-3 col-lg-5 col-xl-4 col-xxl-3 col-10 text-center p-3':null}>
                    <img 
                        src={element.image}
                        className={element.id==="Explore"?'box-img rounded':'w-100 rounded'}
                        id={element.id}
                        alt={element.title} 
                        title={element.title}
                        loading='lazy'
                    />
                  </div>
                  <div className={element.id === "story"?"text-start story-data order-md-1 order-2 col col-md-9 col-lg-7 col-xl-8 col-xxl-9 col-12":"d-none"}>
                      {element?.description &&
                      <ul className="list-group d-flex align-items-lg-end py-md-4 py-lg-2 py-xl-0">
                      {element.description.map((data, idx) => (
                        <li key={idx} className="list-group-item fs-lg-3 fs-6 ">{data}</li>
                      ))}
                    </ul>}
                  </div>
                  
              </div>
              {element?.specification &&
                <div className="row">
                {element?.specification.map((data)=>(
                  <div 
                  className={`box py-3 m-0 ${
                    element.id==="innovation"?'box col-12 col-sm-6 col-lg-3':'col-12 col-md-4'
                    }`} 
                  key={data.id}
                  title={data.title}
                  aria-label={data.title}
                  id={data.id}
                  onClick={()=>handleKit(data.id)}>
                    <div className="">
                      <div className="">
                        <img 
                            src={data.image}
                            className='p-1 m-3'
                            alt={data.id} 
                            title={data.id}
                            loading="lazy"
                        />
                      </div>
                      <div className="m-0 p-0">
                          <h2 className="m-1 p-1">{data.title}</h2>
                          <p className="m-4 p-0">{data.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
            </div>
          </div>
        </motion.div>
    ))}


    
    </>
  )
}

export default Home