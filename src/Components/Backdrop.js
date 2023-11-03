import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onClick }) => {
  const styles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    backgroundColor: "black",
    opacity: "40%",
    zIndex: "5",
  };
  return ReactDOM.createPortal(
    <div style={styles} onClick={onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
