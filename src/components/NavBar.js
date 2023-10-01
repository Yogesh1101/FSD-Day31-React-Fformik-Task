import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  // menu is set to show or disable the menu in small screen
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    /* The nav contains all the required details like link names, menu icon and a title */
    <nav>
      <Link to="/" className="title">
        Book Management
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Books List</NavLink>
        </li>
        <li>
          <NavLink to="/add-book">Add Book</NavLink>
        </li>
        <li>
          <NavLink to="/authors-list">Authors List</NavLink>
        </li>
        <li>
          <NavLink to="/add-author">Add Author</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
