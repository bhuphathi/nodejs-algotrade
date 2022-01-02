import { useContext } from "react";
import { IconContext } from "react-icons";
import { IoColorPaletteOutline } from "react-icons/io5";

import "./sidedrawer.css";
import { ThemeContext } from "../../context/ThemeContext";
import { themes } from "../../themes/theme-schema";

const SideDrawer = (props) => {
  const themeNames = Object.keys(themes)
  const {changeTheme} = useContext(ThemeContext)

  console.log('SideDrawer rendered...', props)
  return (
    <aside>
        <input type="checkbox" className="toggle__checkbox" id="btntoggle" />

        <label htmlFor="btntoggle" className="togglebtn">
          <IconContext.Provider value={{ size: "24px", color: "#1EB7FF" }}>
            <IoColorPaletteOutline />
          </IconContext.Provider>
        </label>
        <div className="sidedrawer-container ">
          <div className="">
            <h1>Theme Colors</h1> 
            <div>
                <ul>
                  { themeNames.map(themeName => (
                    <li 
                    key={themeName} 
                    className="inline-block rounded-sm mr-2 mt-2 cursor-pointer" 
                    style={{ backgroundColor: themes[themeName].colors.primary, width: '1.25rem', height: '1.25rem' }}
                    onClick={() => changeTheme(themes[themeName])}
                    
                    ></li>
                    )
                  )}
                </ul>
            </div>
          </div>
        </div>

    </aside>
  );
};

export default SideDrawer;
