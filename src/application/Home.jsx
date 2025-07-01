import React from 'react'
import { motion } from "framer-motion";
import Explore from './explore.jsx'
import Story from './story.jsx';
import InnovationKit from './innovationKit.jsx';
import Community from './community.jsx';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const Home = () => {
  return (
    <>
    <div className="container-fluid">
      <motion.div
         initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Explore/>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Story />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <InnovationKit />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Community/>
      </motion.div>
      
      </div>
    </>
  )
}

export default Home