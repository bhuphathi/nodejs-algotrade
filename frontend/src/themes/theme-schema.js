const mediumGreyText = "#3E3E3E";
const lightGreyText = "#8493A5";

const white = "#fff";
const background = "#F9FAFC";
const mediumGrey = "#ccc";
const darkGrey = "#555";
const dimGrey = "#696969";
const lightGrey = "#d3d3d3";
const gainsboro = "#dcdcdc";
const whiteSmoke = "#F5F5F5";
const black = 'black';

const default_primary = "#1EB7FF";
const default_primaryHover = "#00A8F7";
const default_secondary = "#868E96";
const default_secondaryHover = "#727B84";

/*
Hex Percentages
100% — FF
95% — F2
90% — E6
85% — D9
80% — CC
75% — BF
70% — B3
65% — A6
60% — 99
55% — 8C
50% — 80
45% — 73
40% — 66
35% — 59
30% — 4D
25% — 40
20% — 33
15% — 26
10% — 1A
5% — 0D
0% — 00
*/


export const themes = {
    light: {
        name: "default",
        colors: {
            primary: default_primary,
            secondary: default_secondary,
            Body:{
                bg: 'bg-gray-50',
                text: mediumGreyText
            },
            MainNav: {
                bg: default_primary,
                text: black,
                border: lightGrey
            },
            NotifyNav:{
                bg:  gainsboro
            },
            Content:{
                bg: background
            },
            Footer:{
                bg: gainsboro,
                text: darkGrey
            },
            SideDrawer: {
                bg: white,
                switchBg: "#E85A4F",
                text: white,
                border: mediumGrey
            },
            btnPrimary: {
                background: default_primary,
                hoverBg: default_primaryHover,                
                text: white
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: mediumGreyText,
                background: white,
                hoverBg: "#d5d9de",
                outline: default_secondary
            }
        },
        font: "Open Sans"
    },
    orange: {
        name: "orange",
        colors: {

            primary: default_primary,
            secondary: default_secondary,
            Body:{
                bg: 'bg-gray-50',
                text: mediumGreyText
            },
            MainNav: {
                bg: default_primary,
                text: black,
                border: lightGrey
            },
            NotifyNav:{
                bg:  gainsboro
            },
            Content:{
                bg: background
            },
            Footer:{
                bg: gainsboro,
                text: darkGrey
            },
            SideDrawer: {
                bg: white,
                switchBg: "#E85A4F",
                text: white,
                border: mediumGrey
            },
            btnPrimary: {
                background: default_primary,
                hoverBg: default_primaryHover,                
                text: white
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: mediumGreyText,
                background: white,
                hoverBg: "#d5d9de",
                outline: default_secondary
            },                    
            primary: "#E85A4F",
            secondary: "#E98074",
            bodyBg: "#EAE7DC",
            lightBg: "#D8C3A5",
            sideDrawerBg: "#EAE7DC",
            drawerClose: "#E85A4F",
            textLight: "#8E8D8A",
            textStrong: "black",
            btnPrimary: {
                text: "#EAE7DC",
                background: "#E85A4F"
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: "#3E3E3E",
                background: "#EAE7DC",
                outline: "#8E8D8A"
            },
            link: {
                text: "#3E3E3E",
                opacity: 1
            },
            SideDrawer: {
                bg: white,
                switchBg: "#E85A4F",
                text: white
            }
        },
        font: "Open Sans"
    },
    pink: {
        name: "pink",
        colors: {
            primary: default_primary,
            secondary: default_secondary,
            Body:{
                bg: 'bg-gray-50',
                text: mediumGreyText
            },
            MainNav: {
                bg: default_primary,
                text: black,
                border: lightGrey
            },
            NotifyNav:{
                bg:  gainsboro
            },
            Content:{
                bg: background
            },
            Footer:{
                bg: gainsboro,
                text: darkGrey
            },
            SideDrawer: {
                bg: white,
                switchBg: "#E85A4F",
                text: white,
                border: mediumGrey
            },
            btnPrimary: {
                background: default_primary,
                hoverBg: default_primaryHover,                
                text: white
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: mediumGreyText,
                background: white,
                hoverBg: "#d5d9de",
                outline: default_secondary
            },                    
            primary: "#D88C9A",
            secondary: "#E98074",
            bodyBg: "#F1E3D3",
            lightBg: "#F2D0A9",
            sideDrawerBg: "#55bbc6",
            textLight: "#8E8D8A",
            textStrong: "#3E3E3E",
            btnPrimary: {
                text: "#EAE7DC",
                background: "#D88C9A"
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: "#3E3E3E",
                background: "#EAE7DC",
                outline: "#8E8D8A"
            },
            link: {
                text: "#3E3E3E",
                opacity: 1
            }
        },
        font: "Open Sans"
    },
    blue: {
        name: "blue",
        colors: {

            primary: default_primary,
            secondary: default_secondary,
            Body:{
                bg: 'bg-gray-50',
                text: mediumGreyText
            },
            MainNav: {
                bg: default_primary,
                text: black,
                border: lightGrey
            },
            NotifyNav:{
                bg:  gainsboro
            },
            Content:{
                bg: background
            },
            Footer:{
                bg: gainsboro,
                text: darkGrey
            },
            SideDrawer: {
                bg: white,
                switchBg: "#E85A4F",
                text: white,
                border: mediumGrey
            },
            btnPrimary: {
                background: default_primary,
                hoverBg: default_primaryHover,                
                text: white
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: mediumGreyText,
                background: white,
                hoverBg: "#d5d9de",
                outline: default_secondary
            },        
            primary: "#2E5266",
            secondary: "#6E8898",
            bodyBg: "#D3D0CB",
            lightBg: "#9FB1BC",
            sideDrawerBg: "#55bbc6",
            textLight: "#8E8D8A",
            textStrong: "black",
            btnPrimary: {
                text: "#EAE7DC",
                background: "#2E5266"
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: "#3E3E3E",
                background: "#EAE7DC",
                outline: "#8E8D8A"
            },
            link: {
                text: "#3E3E3E",
                opacity: 1
            }
        },
        font: "Open Sans"
    },
    teal: {
        name: "teal",
        colors: {
            
            primary: default_primary,
            secondary: default_secondary,
            Body:{
                bg: 'bg-gray-50',
                text: mediumGreyText
            },
            MainNav: {
                bg: default_primary,
                text: black,
                border: lightGrey
            },
            NotifyNav:{
                bg:  gainsboro
            },
            Content:{
                bg: background
            },
            Footer:{
                bg: gainsboro,
                text: darkGrey
            },
            SideDrawer: {
                bg: white,
                switchBg: "#E85A4F",
                text: white,
                border: mediumGrey
            },
            btnPrimary: {
                background: default_primary,
                hoverBg: default_primaryHover,                
                text: white
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: mediumGreyText,
                background: white,
                hoverBg: "#d5d9de",
                outline: default_secondary
            },        
            primary: "#006F7C",
            secondary: "#55bbc6",
            bodyBg: "#CCE2E5",
            lightBg: "#9FB1BC",
            sideDrawerBg: "#55bbc6",
            textLight: "#CCE2E5",
            textStrong: "#79797a",
            btnPrimary: {
                text: "#EAE7DC",
                background: "#006F7C"
            },
            btnSecondary: {
                background: default_secondary,
                hoverBg: default_secondaryHover,                
                text: white
            },
            btnOutline: {
                text: "#3E3E3E",
                background: "#EAE7DC",
                outline: "#8E8D8A"
            },
            link: {
                text: "#3E3E3E",
                opacity: 1
            }
        },
        font: "Open Sans"
    }
}