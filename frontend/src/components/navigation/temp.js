import  { useContext, useState, memo } from "react";
import {
  Body,
  Heading,
  ColorCard,
  SideDrawerSwitch,
} from "../styles/SideDrawer.style";
import { FlexStart } from "../styles/Container.style";
import { MdOutlineClose, MdOutlineSettings } from "react-icons/md";
import { IconContext } from "react-icons";
import { ThemeContext } from "styled-components";
import { themes } from "../../themes/themes-schema";
const allThemesArray = Object.values(themes).map((theme) => theme);

const SideDrawer = (props) => {
  const [allThemes] = useState(allThemesArray);
  const [enableDrawer, setEnableDrawer] = useState(false);
  const theme = useContext(ThemeContext);

  const colorClickHandler = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    props.changeTheme(name);
  };

  console.log('SideDrawer rendered...')
  return (
    <>
      <Body enable={enableDrawer}>
        <FlexStart>
          <ul>
            <Heading>Select theme</Heading>
            {allThemes.map((theme, index) => (
              <ColorCard
                themeColor={theme.colors.primary}
                key={index}
                name={theme.name}
                onClick={colorClickHandler}
              />
            ))}
          </ul>
          <br />
        </FlexStart>

        <FlexStart> 
          {props.children}
        </FlexStart>

        <SideDrawerSwitch onClick={() => setEnableDrawer(!enableDrawer)} enable={enableDrawer}>
          <IconContext.Provider value={{ size: "1.5rem", color: theme.colors.SideDrawer.text }}
          >
            {enableDrawer ? <MdOutlineClose /> : <MdOutlineSettings />}
          </IconContext.Provider>
        </SideDrawerSwitch>
      </Body>
    </>
  );
};

export default memo(SideDrawer)

import styled from 'styled-components'

export const Body = styled.aside`
    width: 200px;
    position: fixed;
    top: 50%;
    right: 0;
    left: auto;
    bottom: auto;
    height: 70%;
    min-height: 200px;
    transform: ${({ enable }) => enable ? 'translateY(-50%)' : 'translateX(200px) translateY(-50%)'};
    transition: transform 0.25s ease;
    z-index: 1500;
    background-color: ${props => props.theme.colors.SideDrawer.bg};
    border-radius: 3px;
    padding: 15px;
    border: 1px ${props => props.theme.colors.SideDrawer.border} solid;
`

export const Heading = styled.h4`

`

export const SideDrawerSwitch = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: calc(40% - 1.1rem);
    width: 2.2rem;
    height: 2.2rem;
    transform: translate(-145%, 0%);
    cursor: pointer;
    background-color: ${(props) => props.enable ? props.theme.colors.SideDrawer.switchBg : props.theme.colors.primary};
`

export const ColorCard = styled.li`
    display: inline-block;
    margin: 0.2rem;
    margin-left: ${props => props.key === 0 ? 0 : '0.2rem'};
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 3px;
    background-color: ${props => props.themeColor};
    cursor: pointer;
`