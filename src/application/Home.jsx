import React from 'react'
import Explore from './explore.jsx'
import Story from './story.jsx';
import InnovationKit from './innovationKit.jsx';
import Community from './community.jsx';
const Home = () => {
  return (
    <>
    <div className="container-fluid">
      <Explore/>
      <Story />
      <InnovationKit />
      <Community/>
      </div>
    </>
  )
}

export default Home