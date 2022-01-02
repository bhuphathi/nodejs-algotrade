import { memo } from "react";
import { MainNavigation, ContentLayout, SideDrawer } from "./components";

import withTheme from "./context/withTheme";

const App = (props) => {
  const {theme} = props
  

  console.log('App Renedered...', 'App props:', props)
  return (
    <>
      <main className={`antialiased ${theme.colors.Body.bg} max-h-screen flex`}>
        <MainNavigation />
        <ContentLayout />
        <SideDrawer />
      </main>
    </>
  );
};

export default memo(withTheme(App));
