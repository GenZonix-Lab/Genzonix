import React from 'react'
import handson from '../assets/handsonLearning.webp'
import expert from '../assets/expert.webp'
import quality from '../assets/kit_demo.webp'

const Community = () => {

    //slide4_content
    const slide4_h1="Innovative, Hands-On Learning Kits"
    const slide4_h2="Expert Support & Resources"
    const slide4_h3="Affordable & Curated for Value"
    const slide4_p1="Genzonix offers high-quality STEM and IoT DIY kits designed to engage learners through hands-on activities. Each kit fosters creativity, problem-solving, and technical skills, making learning practical and fun for all ages."
    const slide4_p2="Genzonix provides easy-to-follow guides, tutorials, and customer support, ensuring even beginners can dive into STEM projects confidently. We aim to make tech learning accessible and enjoyable, regardless of experience level."
    const slide4_p3="Our kits are competitively priced, balancing affordability with quality. We thoughtfully curate each kit to include essential components, giving customers a comprehensive, high-value experience without breaking the bank."

  return (    
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
                />
                <div>
                    <h2>{slide4_h1}</h2>
                    <p>{slide4_p1}</p>
                </div>
            </div>
            <div className="box col-sm-12 col-lg-4 p-1">
                <img 
                    src={expert}
                    className='p-1 m-3'
                    alt="expert consulting" 
                    title='expert'
                />
                <div>
                    <h2 id="slide4_head2">{slide4_h2}</h2>
                    <p id="slide4_para2">{slide4_p2}</p>
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
                    <h2 id="slide4_head3">{slide4_h3}</h2>
                    <p id="slide4_para3">{slide4_p3}</p>
                </div>
            </div>
        </section>
        </div>
    </div>
  )
}

export default Community