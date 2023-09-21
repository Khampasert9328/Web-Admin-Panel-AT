import React from "react";

const Avatar = ({ imageSrc, size = 50 }) => {
  return (
    <div
      className="avatar"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img src={imageSrc} />
    </div>
  );
};

export default Avatar;
