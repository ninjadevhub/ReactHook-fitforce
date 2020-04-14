import React from "react";

const LaterAvatar = ({ first_name, last_name }) => {
  const colors = ["#2DA771", "#FF9C00", "#0052B4"];
  function random_color(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  return (
    <div className="laterAvatr" style={{ background: random_color(colors) }}>
      {first_name && first_name.charAt(0)}
      {last_name && last_name.charAt(0)}
    </div>
  );
};

export default LaterAvatar;
