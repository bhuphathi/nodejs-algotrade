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