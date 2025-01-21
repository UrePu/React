import React from "react";

function Button({ children, color, onClick, font }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: font,
        width: "100px",
        height: "40px",
        padding: "10px 20px",
        fontSize: "13px",
        fontWeight: "800",
      }}
    >
      {children}
    </button>
  );
}

export default Button;
