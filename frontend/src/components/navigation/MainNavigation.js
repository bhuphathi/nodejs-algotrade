import { memo, useState, useEffect } from "react";
import { BsDoorOpen, BsBag } from "react-icons/bs";


import "./MainNavigation.css";
import MainNavList from "./MainNavList";
import useWindowSizes from "../../hooks/useWindowSizes";

let compactClass = "__compact";

const MainNavigation = (props) => {
  // const [isNavOpen, setIsNavOpen] = useState(true);
  const { width } = useWindowSizes();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    //compact added to prevent frequent setCompact
    if (width < 768 && !compact) {
      setCompact(true);
    } else if (width > 768 && compact) {
      setCompact(false);
    }
    //compact must not be included in dependency list, it will prevent setting setCompact
  }, [width]);

  const navToggleHandler = () => setCompact((prevState) => !prevState);

  console.log("MainNavigation Rendered...", "props", props);
  return (
          <nav className={ "fade700ms nav-container" + (compact ? compactClass : "")}>
            <input type="checkbox" id="nav-checkbox" onChange={navToggleHandler} />

            <label htmlFor="nav-checkbox" className={"nav-header" + (compact ? compactClass : "")}>
              <span className={"fade700ms nav-header_text" + (compact ? compactClass : "")}>DashBoard</span>
              <span className={"fade300ms nav-header_icon" + (compact ? compactClass : "")}></span>
            </label>
            <ul >
              <MainNavList id="1" listtext="Accounts" compact={compact}><BsDoorOpen /></MainNavList>
              <MainNavList id="2" listtext="Sales" compact={compact}><BsBag /></MainNavList>
            </ul>
          </nav>
  );
};

export default memo(MainNavigation);
