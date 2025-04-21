import React, { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { useState, useEffect } from "react";



const CircleMotion = () => {
  const [role, setRole] = useState(0);
  const roles= ["IoT Solution Engineer", "Web Developer", "AI and STEM Trainer","Junior Cloud Engineer"];
  useEffect(() => {
    const interval = setInterval(() => {
      setRole(prevIndex => (prevIndex + 1) % roles.length);
    }, 4000); // change every 2 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  const roledata = roles[role];
  return (
    <>
    <div className="motion-role py-2">
        <div className="stripe-absolute">
          <div className="stripe-line"></div>
        </div>
    <motion.div 
    className="motion"
    animate={{
      x: ['100%', '0%'], // Move from right to original position
    }}
    transition={{
      repeatDelay: 2,     // Wait 2 seconds before repeating
      type: "spring",
      duration: 2,       // Time taken to move
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    }}

  >
    <div className="role">
      <h4>-{roledata}</h4>
    </div>
  </motion.div>
  
    </div>
    </>
  );
};

export default CircleMotion;
