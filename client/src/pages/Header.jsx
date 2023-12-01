import React, { useState } from "react";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";
import "./header.css";
import Search from "../components/Search";

function Header({ scroll }) {
  const [navList, setNavList] = useState(navListData);

  const handleNavOnClick = (id) => {
    const newNavList = navList.map((nav) => {
      nav.active = false;
      if (id === 3) {
        const addSeriesSection = document.getElementById("addSeries");
        if (addSeriesSection) {
          addSeriesSection.scrollIntoView({ behavior: "smooth" });
        }
      } else if (nav._id === id) {
        nav.active = true;
      }

      return nav;
    });

    setNavList(newNavList);
  };

  return (
    <header className={`${scroll > 100 ? "scrolled" : undefined}`}>
      <a href="/" className="logo">
        SeriesMania
      </a>
      <ul className="nav">
        {navList.map((nav) => (
          <NavListItem key={nav._id} nav={nav} navOnClick={handleNavOnClick} />
        ))}
      </ul>
      {<Search />}
    </header>
  );
}

export default Header;
