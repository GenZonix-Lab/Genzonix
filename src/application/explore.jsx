import React from 'react';
import boxCloud from '../assets/pic2.webp';
import { NavLink } from 'react-router-dom';

const Explore = () => {
  return (
    <div className='explore text-center'>
      <div className="title mt-5 py-3">
        <h1>Innovative Kits for a Smarter Generation</h1>
      </div>
      <NavLink to={"/products"}>
        <button type="button" className='Explore_btn rounded p-3 m-1'>Explore</button>
      </NavLink>    
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
  )
}

export default Explore