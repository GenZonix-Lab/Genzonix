import { vh } from 'framer-motion';
import React from 'react'
import { FaCaretLeft, FaCaretRight  } from "react-icons/fa";
const Videos = () => {
    const dimension = 300;
    const DemoVideos=[
        {
            title: "Create a own server using AWS Lambda serverless function",
            url: "https://www.youtube-nocookie.com/embed/P4nEt09lzU8?si=EyCguiq-V66JzYcI"
        }
    ];
    
    const scrollLeft = () => {
    document.getElementById('scrollContainer').scrollBy({
        left: -300,
        behavior: 'smooth',
    });
    };

    const scrollRight = () => {
    document.getElementById('scrollContainer').scrollBy({
        left: 300,
        behavior: 'smooth',
    });
    };
  return (
    <>
    <div className='title mt-2'><h4>Demo Videos</h4></div>
    <div className="position-relative">
    <button
        className="border-0 bg-transparent position-absolute start-minus-30 top-50 translate-middle-y d-none d-lg-inline"
        onClick={() => scrollLeft()}
        style={{ zIndex: 1 }}
    >
        <FaCaretLeft 
            color='#cae8ff'
            size={40}/>
    </button>
    <button
        className="border-0 bg-transparent position-absolute end-minus-30 top-50 translate-middle-y d-none d-lg-inline"
        onClick={() => scrollRight()} 
        style={{ zIndex: 1 }}
    >
        <FaCaretRight  
            color='#cae8ff'
            size={40}/>
    </button>
  <div className='position-relative top-50'>
    <div
    id="scrollContainer"
    className="d-flex overflow-scroll hide-scrollbar"
    style={{ scrollBehavior: 'smooth', gap: '1rem', maxWidth:'100%'}}
  >
    {/* Example Items */}
    {DemoVideos.map((element, index) => (
      <div key={index}>
        <iframe 
          height={dimension*0.5625} 
          width={dimension} 
          src={element.url} 
          title={element.title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>        
        <h5>{element.title}</h5>    
      </div>
    ))}
      </div>
      </div>
    </div>
    </>
  )
}

export default Videos