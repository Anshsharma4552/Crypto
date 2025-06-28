import React, { useState, useEffect } from 'react'
import "./style.css"
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Function to handle scroll events
    const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Function to scroll to top
    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    // Set up scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', scrollFunction);
        
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('scroll', scrollFunction);
        };
    }, []);

    return (
        <div 
            className='back-to-top-btn' 
            style={{ display: isVisible ? 'flex' : 'none' }}
            onClick={topFunction}
        >
            <ArrowUpwardRoundedIcon style={{color:"var(--blue)"}}/>
        </div>
    )
}

export default BackToTop