// SocialIcons.jsx
import React from 'react';
import Twitter from '../icons/twitter.svg'
import Linkedin from '../icons/linkedin.svg'
import Youtube from '../icons/youtube.svg'
import Instagram from '../icons/instagram.svg'

const SocialIcons = () => {
  return (
    <div className="grid grid-cols-4 gap-2 w-40">
      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
        <img src={Linkedin} alt="LinkedIn" />
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
        <img src={Twitter} alt="Twitter" />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <img src={Instagram} alt="Instagram" />
      </a>
      <a href="www.youtube.com">
        <img src={Youtube} className='text-lg' alt="Email" />
      </a>
    </div>
  );
};

export default SocialIcons;
