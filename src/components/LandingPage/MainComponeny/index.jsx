import React, { useState, useEffect } from 'react';
import './style.css';
import Button from '../../Common/Button';
import gradient from "../../../assets/gradient.png";
import iphone from "../../../assets/iphone.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';

function MainComponent() {
  const navigate = useNavigate();
  const [isLaptopSize, setIsLaptopSize] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Consider laptop size as 1024px and above
      setIsLaptopSize(window.innerWidth >= 1280);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className='main-wrapper'>
      <div className='flex-info'>
        <div className='left-component'>
          <motion.h1
            className='track-crypto-heading'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Track Crypto
          </motion.h1>
          
          <motion.h1
            className='real-time-heading'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Real Time.
          </motion.h1>
          
          <motion.p
            className='info-text'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Track crypto through a public api in real time. Visit the dashboard to do so!
          </motion.p>
          
          <motion.div
            className='btn-flex'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Button text={"Dashboard"} onClick={() => navigate('/dashboard')} />
            <Button text={"Share"} outlined={true} />
          </motion.div>
        </div>
        
        <div className='phone-container'>
          <motion.img
            src={iphone}
            className='iphone'
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              type: 'smooth',
              repeatType: 'mirror',
              duration: 2,
              repeat: Infinity,
            }}
          />
          <img src={gradient} className='gradient' />
        </div>
        
        {/* Conditionally render counter section only for laptop sizes */}
        {isLaptopSize && (
          <div className="number-counter-section">
            <p className="counter-subtitle">Real-time stats powering the future of digital finance</p>
            <div className="counter-grid">
              <div className="counter-box">
                <p className="counter-number"><CountUp end={100} suffix="+" duration={3} /></p>
                <p className="counter-label">Cryptocurrencies</p>
              </div>
              <div className="counter-box">
                <p className="counter-number"><CountUp end={250} suffix="+" duration={3} /></p>
                <p className="counter-label">Trading Pairs</p>
              </div>
              <div className="counter-box">
                <p className="counter-number"><CountUp end={200} suffix="M+" duration={3} /></p>
                <p className="counter-label">Monthly Volume (USD)</p>
              </div>
              <div className="counter-box">
                <p className="counter-number"><CountUp end={45} suffix="+" duration={3} /></p>
                <p className="counter-label">Global Markets</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;