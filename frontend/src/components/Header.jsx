import React from "react";
import Button from "./Button";
import { FaBell } from "react-icons/fa";
import "../styles/Header.scss";
import { Link } from "react-router-dom";
 
const Header = () => { 
  return (

    <header className="header-wrapper flex justify-between p-10 px-20 mx-auto ">
      <Link to="/">
      <div className="logo flex items-center justify-between text-3xl font-semibold">
        <FaBell className="mr-2 logo-icon" />
        block<span className="logo-alert">Alert</span>
      </div>
      </Link>

    
{/*     
    <div className="items-center cursor-pointer font-medium">
        <Button text="Connect Wallet" />
      </div>
    */}
    
    </header>
  );
};

export default Header;
