import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
import ScrollToTop from '../../Components/ScrollToTop'

import boxCloud from '../../assets/pic2.webp';
import child_pic from '../../assets/child_pic.webp'
import ai from '../../assets/AI_pic.webp'
import cloud from '../../assets/cloud_pic.webp'
import iot from '../../assets/Box components.webp'
import handson from '../../assets/handsonLearning.webp'
import expert from '../../assets/expert.webp'
import quality from '../../assets/kit_demo.webp'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const Home = () => {
  return (
    <>
    <div className="container-fluid">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className='explore text-center' title='explore'>
          <div className="title mt-5 py-3"><h1>Innovative Kits for a Smarter Generation</h1></div>
          <ScrollToTop />
          <NavLink to={"/sandbox"}><button type="button" className='Explore_btn rounded p-3 m-1'>Explore Sandbox</button></NavLink>    
          <div className="my-3 py-4 ">
              <img 
                src={boxCloud}
                className='rounded'
                id='box-img'
                alt="Cloud_box" 
                title="Cloud_box" 
                loading='lazy'
              />
          </div>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="story" title='story' id='#story'>
          <div className="container">
            <div className="title text-center"><h2>Empowering Innovators: The Genzonix Story</h2></div>
            <div className="row justify-content-center">
              <div className='child-img order-lg-2 order-1 col col-lg-4 col-xl-3 col-10 text-center p-3'>
                <img 
                    src={child_pic}
                    alt="child" 
                    title="child" 
                    loading="lazy"
                />
              </div>
              <div className="story-data order-lg-1 order-2 col col-lg-8 col-xl-9 col-12">
                <h3>At Genzonix, we empower the next generation of innovators through hands-on STEM learning. Our DIY kits and solutions in robotics, AI, Cloud, and IoT bridge the gap between theory and practice, making advanced technology accessible to students, educators, and hobbyists.</h3><br />
                <h3>We focus on fostering creativity and problem-solving through experiential learning, equipping users with the tools to bring their ideas to life. Genzonix is dedicated to shaping future thinkers by promoting education, innovation, and exploration in a technology-driven world.</h3>
              </div>
            </div>
          </div>
      </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className='kit my-5' title='innovation' id='#innovation'>
          <div className="container">
          <div className="title text-center mt-2"><h2>DIY INNOVATIVE</h2> </div>
          <div className="row text-center">
              <div className="box col-sm-12 col-lg-4 p-1">
                  <img src={iot} 
                      className='p-1 m-3'
                      alt="IoT" 
                      title="IoT kit box" 
                      loading="lazy"
                  />
                  <div>
                      <h2>DIY IoT</h2>
                      <p>Create smart, connected devices with easy-to-build projects that teach the fundamentals of wireless control and sensor integration, ideal for smart home and automation applications.</p>
                  </div>
              </div>
              <div className="box col-sm-12 col-lg-4 p-1">
                  <img 
                      src={ai} 
                      className='p-1 mt-3'
                      alt="AI" 
                      title="AI kit box" 
                      loading='lazy'
                  />
                  <div>
                      <h2>AI Computer Vision</h2>
                      <p>Dive into image and video analysis with beginner-friendly Python projects that bring real-world AI applications, like object detection and facial recognition, within reach.</p>
                  </div>
              </div>
              <div className="box col-sm-12 col-lg-4 p-1">
                  <img 
                      src={cloud} 
                      className='p-1  mt-3'
                      alt="Cloud" 
                      title="Cloud kit box" 
                      loading="lazy"
                  />
                  <div>
                      <h2>Cloud Projects</h2>
                      <p>Gain hands-on experience with essential cloud tools, learning how to store, process, and deploy data seamlessly using popular cloud platforms.</p>
                  </div>
              </div>
          </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="Exploration my-5">
        <div className="container">
        <div className="title text-center"><h2>Why Genzonix?</h2></div>
        <section className="row text-center mt-2">
            <div className="box col-sm-12 col-lg-4 p-1">
                <img 
                    src={handson}
                    className='p-1 m-3'
                    alt="handsonLearning" 
                    title='handsonLearning'
                    loading="lazy"
                />
                <div>
                    <h2>Innovative, Hands-On Learning Kits</h2>
                    <p>Genzonix offers high-quality STEM and IoT DIY kits designed to engage learners through hands-on activities. Each kit fosters creativity, problem-solving, and technical skills, making learning practical and fun for all ages.</p>
                </div>
            </div>
            <div className="box col-sm-12 col-lg-4 p-1">
                <img 
                    src={expert}
                    className='p-1 m-3'
                    alt="expert consulting" 
                    title='expert'
                    loading="lazy"
                />
                <div>
                    <h2 id="slide4_head2">Expert Support & Resources</h2>
                    <p id="slide4_para2">Genzonix provides easy-to-follow guides, tutorials, and customer support, ensuring even beginners can dive into STEM projects confidently. We aim to make tech learning accessible and enjoyable, regardless of experience level.</p>
                </div>
            </div>
            <div className="box col-sm-12 col-lg-4 p-1">
                <img 
                    src={quality}
                    className='p-1 m-3'
                    alt="quality " 
                    title='kit_demo'
                />
                <div>
                    <h2 id="slide4_head3">Affordable & Curated for Value</h2>
                    <p id="slide4_para3">Our kits are competitively priced, balancing affordability with quality. We thoughtfully curate each kit to include essential components, giving customers a comprehensive, high-value experience without breaking the bank.</p>
                </div>
            </div>
        </section>
        </div>
        </div>
      </motion.div>
    </div>
    </>
  )
}

export default Home