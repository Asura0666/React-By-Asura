import React from "react";
import btc from '../assets/btc.png'
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-black bg-opacity-90 w-full h-85vh flex flex-col items-center justify-center">
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          className="w-full h-full object-contain filter grayscale"
          src={btc}
          alt="Bitcoin"
        />
      </motion.div>

      <h1 className="font-bold text-5xl text-whiteAlpha-700  mt-[-20] mb-10">
        Xcrypto
      </h1>
    </div>
  );
};

export default Home;
