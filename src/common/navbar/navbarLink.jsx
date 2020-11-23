import React from "react";

export default function NavbarLink(props) {
  let { handleLinkClick, isActive, name, mouseEnter, mouseLeave, ...rest } = props;
  return (
    <li onMouseEnter={() => mouseEnter(name)} onMouseLeave={() => mouseLeave(name)} {...rest} >
      <div onClick={handleLinkClick} className={isActive ? "active" : null}>
        {name}
      </div>
    </li>
  );
}
