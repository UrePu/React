import React from "react";

const Input = ({ label, type, value, placeholder, onChange }) => {
  return (
    <div>
      <div>{label}</div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
