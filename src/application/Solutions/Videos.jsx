import { useEffect, useState } from 'react'
import { FaCaretLeft, FaCaretRight  } from "react-icons/fa";
const Videos = () => {
  const dimension = 320;
  const [videos,setVideos] = useState([]);
  useEffect(() => {
      const fetchVideos = async () => {
        try {
          const response = await fetch('https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/videos');
          const data = await response.json();
          setVideos(data);
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      }
      fetchVideos();
      }, []);


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
    {videos.map((element, index) => (
      <div key={index}>
        <iframe 
          height={dimension*0.5625} 
          width={dimension} 
          src={element.url} 
          title={element.title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>        
        <h5 style={{maxWidth:`${dimension}px`}}>{element.title}</h5>    
      </div>
    ))}
      </div>
      </div>
    </div>
    </>
  )
}

export default Videos