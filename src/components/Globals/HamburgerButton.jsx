import { useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../assets/styles/navbar.css";

const HamburgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <IconButton
      onClick={toggleMenu}
      style={{
        backgroundColor: "#E66301",
        transition: "all 0.3s ease-in-out",
        borderRadius: isOpen ? "50%" : "4px",
      }}
    >
      {isOpen ? <MenuIcon style={{fill: "white"}}/> : <ArrowBackIcon className="spin" style={{fill: "white"}}/>}
    </IconButton>
  );
};

export default HamburgerButton;
