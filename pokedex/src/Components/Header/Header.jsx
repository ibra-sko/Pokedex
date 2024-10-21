import React from "react";
import "./header.css";
import Logo from "../../assets/logoPokedex.svg"

function Header() {
  return (
    <header>
        <div>
            <img src={Logo} className="logo"  alt={""}/>
        </div>
    </header>
  );
}

export default Header;