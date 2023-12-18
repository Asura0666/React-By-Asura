import React from "react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <div className="w-full px-4 flex flex-col justify-evenly items-center font-bold border-t-2 py-2 ">
      <p>All rights Are Reserved By &copy; Asura | 2023 | privacy-policy</p>
      <div className="w-full flex justify-between items-center">
        Connect Us:
        <p>
          We are the best crypto trading app in India, we provide our guidance
          at a very cheap price.
        </p>
        <img
          className="w-15 rounded-full"
          src="https://avatars.githubusercontent.com/u/148976833?s=48&v=4"
          alt="Profile"
        />
      </div>
      <SocialIcons />
    </div>
  );
};

export default Footer;

