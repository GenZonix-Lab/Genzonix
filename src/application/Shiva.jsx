import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useSound from "use-sound";
import { Gift } from "lucide-react"; // npm install lucide-react

const images = [
  "/best/1.jpg",
  "/best/2.jpg",
  "/best/3.jpg",
  "/best/4.jpg",
  "/best/5.jpg"
];

// Free Happy Birthday instrumental (royalty-free) -> put this file in /public/music/
const birthdaySong = "/music/happy-birthday.mp3"; 

const wishesText = ` Happy Birthday, Siva! 🥳
You’re not just my best friend, you’re truly like family to me.
May your special day be filled with laughter, endless smiles, and unforgettable memories.
I’m so grateful for all the fun, support, and crazy moments we’ve shared together — and I can’t wait for many more ahead!
Wishing you success in everything you do, happiness that never fades, and dreams that always come true.`;

export default function Shiva() {
  const [opened, setOpened] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [play] = useSound(birthdaySong);
  const [playOnce, setPlayOnce] = useState(false);
  // Typewriter effect
  useEffect(() => {
    if (showImages) {
      let i = 0;
      const typing = setTimeout(() => {
        const interval = setInterval(() => {
          setTypedText((prev) => prev + wishesText[i]);
          i++;
          if (i >= wishesText.length -1) clearInterval(interval);
        }, 50);
      }, 10000); // wait for images float first
      setTimeout(() => {
        setPlayOnce(true);
      }, 35000);
      return () => clearTimeout(typing);
    }
  }, [showImages]);

  // Floating images for 6 seconds
  useEffect(() => {
    if (opened) {
      setShowImages(true);
      play(); // play music
      const timer = setTimeout(() => setShowImages(false), 10500);
      return () => clearTimeout(timer);
    }
  }, [opened, play]);

  return (
    <>
    {!playOnce && <div className="position-relative w-100 vh-100 d-flex align-items-start justify-content-center overflow-hidden text-white">
      {!opened ? (
        // 🎁 Gift Box in center
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <motion.div
          className="shadow-lg text-center"
          onClick={() => setOpened(true)}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ cursor: "pointer" }}
        >
          <Gift size={200} color="#e7d1ffff" ></Gift>
        </motion.div>
        </div>
      ) : (
        <>
          {/* 🎊 Confetti blast */}
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={1800}
          />
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
            {/* Floating images (one after another) */}
{showImages &&
  images.map((src, i) => (
      <motion.img
      key={i}
      src={src}
      alt="Memory"
      className="position-absolute"
      style={{ 
        height: "600px", 
        boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.71)",
        borderRadius: "30px",
        objectFit: "cover",
        opacity: 0.8 
        }}
      initial={{
        x: 0,         // Center horizontally
        y: 0,         // Center vertically
        scale: 0,
        rotate: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        rotate: [0, 5, -8, 0],
        opacity: [0, 0.8, 1,0.3],
      }}
      transition={{
        duration: 1.6,          // how long each image animates
        delay: i * 1.7,       // stagger each image by 0.8s
        ease: "easeInOut",
      }}
    />
  ))}
        </div>


          {/* Typewriter Wishes */}
          {!showImages && (
            <motion.h2
              className="text-center fs-3 fw-bold px-3 pt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ maxWidth: "800px", lineHeight: "1.6" }}
            >
              {typedText}
            </motion.h2>
          )}
        </>
      )}
    </div>}
    
    </>
  );
}
