import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const withTheme = (WrappedComponent) => {

  return function (props){
    const { theme } = useContext(ThemeContext);
    return <WrappedComponent {...props} theme={theme} />;
  }

};

export default withTheme;


// const withTheme = (OrgComponent) => {
//   function NewComponent(props) {
//     const { theme } = useContext(ThemeContext);
//     return <OrgComponent {...props} theme={theme} />;
//   }
//   return NewComponent;
// };

// export default withTheme;
